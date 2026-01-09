import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory store for system events
const systemEvents = [
    { timestamp: new Date(), message: 'Server initialized' }
];

const addSystemEvent = (message) => {
    systemEvents.unshift({ timestamp: new Date(), message });
    if (systemEvents.length > 50) systemEvents.pop(); // Keep last 50 events
};

// Auth middleware for health page
const healthAuth = (req, res, next) => {
    const healthCookie = req.cookies.health_access;
    if (healthCookie === process.env.HEALTH_PASSWORD) {
        next();
    } else {
        res.status(401).send(`
<!DOCTYPE html>
<html>
<head>
    <title>Health Dashboard Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="bg-slate-950 text-slate-200 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-slate-900/50 border border-slate-800 p-8 rounded-2xl backdrop-blur-sm">
        <h1 class="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Health Access Restricted</h1>
        <form action="/health/login" method="POST" class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-slate-400 mb-2">Access Password</label>
                <input type="password" name="password" required 
                    class="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all">
            </div>
            <button type="submit" 
                class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20">
                Unlock Dashboard
            </button>
        </form>
        <p class="mt-6 text-center text-xs text-slate-500 uppercase tracking-widest">System Monitoring v1.0</p>
    </div>
</body>
</html>
        `);
    }
};

app.post('/health/login', (req, res) => {
    const { password } = req.body;
    if (password === process.env.HEALTH_PASSWORD) {
        res.cookie('health_access', password, {
            maxAge: 10 * 60 * 1000, // 10 minutes
            httpOnly: true
        });
        res.redirect('/health');
    } else {
        res.redirect('/health');
    }
});

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, '../dist')));

// Health API endpoint (JSON)
app.get('/health/api', healthAuth, (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        server: {
            uptime: process.uptime(),
            pid: process.pid,
            memory: process.memoryUsage(),
        },
        sockets: {
            active_connections: io.engine.clientsCount,
            active_sessions: sessions.size,
        },
        events: systemEvents
    });
});

// Visual Health Dashboard
app.get('/health', healthAuth, (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Server Health Checks</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .status-dot { box-shadow: 0 0 15px currentColor; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.2); }
    </style>
</head>
<body class="bg-slate-950 text-slate-200 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-4xl w-full grid gap-6">
        
        <!-- Header -->
        <div class="glass rounded-2xl p-8 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">System Status</h1>
                <p class="text-slate-400 mt-1">Real-time WebSocket Server Metrics</p>
            </div>
            <div class="flex items-center gap-6">
                <div class="flex items-center gap-3 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 text-emerald-400">
                    <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 status-dot animate-pulse"></span>
                    <span class="font-medium text-sm">OPERATIONAL</span>
                </div>
                <button onclick="document.cookie='health_access=; Max-Age=0; path=/'; location.reload();" class="text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium">LOGOUT</button>
            </div>
        </div>

        <!-- Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Connections -->
            <div class="glass rounded-2xl p-6 relative overflow-hidden group hover:bg-white/5 transition-all">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
                </div>
                <h3 class="text-slate-400 font-medium mb-2">Active Users</h3>
                <div class="text-4xl font-bold text-white flex items-end gap-2">
                    <span id="connections">--</span>
                    <span class="text-sm text-slate-500 font-normal mb-1">sockets</span>
                </div>
            </div>

            <!-- Sessions -->
            <div class="glass rounded-2xl p-6 relative overflow-hidden group hover:bg-white/5 transition-all">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                </div>
                <h3 class="text-slate-400 font-medium mb-2">Active Rooms</h3>
                <div class="text-4xl font-bold text-white flex items-end gap-2">
                    <span id="sessions">--</span>
                    <span class="text-sm text-slate-500 font-normal mb-1">groups</span>
                </div>
            </div>

            <!-- Uptime -->
            <div class="glass rounded-2xl p-6 relative overflow-hidden group hover:bg-white/5 transition-all">
                <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg class="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
                </div>
                <h3 class="text-slate-400 font-medium mb-2">Uptime</h3>
                <div class="text-2xl font-bold text-white font-mono" id="uptime">--:--:--</div>
            </div>
        </div>

        <!-- Log Terminal -->
        <div class="glass rounded-2xl p-6">
            <h3 class="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">System Events</h3>
            <div class="font-mono text-sm space-y-2 h-64 overflow-y-auto pr-2" id="logs">
                <div class="flex gap-3 text-slate-500 italic">Loading events...</div>
            </div>
        </div>
    </div>

    <script>
        const formatTime = (seconds) => {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = Math.floor(seconds % 60);
            return \`\${h}h \${m}m \${s}s\`;
        };

        const updateStats = async () => {
            try {
                const res = await fetch('/health/api');
                if (res.status === 401) {
                    location.reload();
                    return;
                }
                const data = await res.json();
                
                document.getElementById('connections').textContent = data.sockets.active_connections;
                document.getElementById('sessions').textContent = data.sockets.active_sessions;
                document.getElementById('uptime').textContent = formatTime(data.server.uptime);
                
                const logsContainer = document.getElementById('logs');
                logsContainer.innerHTML = data.events.map(event => \`
                    <div class="flex gap-3 text-slate-400 border-b border-white/5 py-1">
                        <span class="text-slate-600 shrink-0">\${new Date(event.timestamp).toLocaleTimeString()}</span>
                        <span class="\${event.message.includes('joined') ? 'text-blue-400' : event.message.includes('created') ? 'text-emerald-400' : event.message.includes('closed') ? 'text-rose-400' : 'text-slate-300'}">\${event.message}</span>
                    </div>
                \`).join('');
                
            } catch (err) {
                console.error('Failed to fetch stats');
            }
        };

        setInterval(updateStats, 2000); // 2s refresh
        updateStats();
    </script>
</body>
</html>
  `);
});

// Catch-all route for SPA - serves index.html for any unknown routes
// This MUST be the last route defined
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // Allow all origins for simplicity in this demo
        methods: ["GET", "POST"]
    }
});

// In-memory store: sessionId -> { userId -> UserLocation }
const sessions = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-session', ({ sessionId, user }) => {
        socket.join(sessionId);

        // Initialize session if not exists
        if (!sessions.has(sessionId)) {
            sessions.set(sessionId, new Map());
            addSystemEvent(`New room created: ${sessionId}`);
        }

        const sessionUsers = sessions.get(sessionId);
        const updatedUser = { ...user, socketId: socket.id, lastUpdated: new Date() };

        // Add/Update user
        sessionUsers.set(user.id, updatedUser);
        addSystemEvent(`User ${user.id} joined session ${sessionId}`);

        // Broadcast updated membership list to all in room
        const membersList = Array.from(sessionUsers.values());
        io.to(sessionId).emit('session-update', membersList);

        console.log(`User ${user.id} joined session ${sessionId}`);

        // Handle disconnect specific to this user/session context
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            if (sessions.has(sessionId)) {
                const currentSession = sessions.get(sessionId);
                currentSession.delete(user.id);
                addSystemEvent(`User ${user.id} left session ${sessionId}`);

                // If session empty, maybe cleanup? For now keep it simple.
                if (currentSession.size === 0) {
                    sessions.delete(sessionId);
                    addSystemEvent(`Room ${sessionId} closed (empty)`);
                } else {
                    // Broadcast update
                    io.to(sessionId).emit('session-update', Array.from(currentSession.values()));
                }
            }
        });
    });

    socket.on('update-location', ({ sessionId, user }) => {
        if (sessions.has(sessionId)) {
            const sessionUsers = sessions.get(sessionId);
            // Update the specific user
            if (sessionUsers.has(user.id)) {
                // console.log(`Location update from ${user.id} in ${sessionId}`); // Optional: noisy log
                const existingInfo = sessionUsers.get(user.id);
                sessionUsers.set(user.id, {
                    ...existingInfo,
                    ...user,
                    lastUpdated: new Date()
                });

                // Broadcast immediately? Or throttle?
                // For real-time: broadcast immediately.
                io.to(sessionId).emit('session-update', Array.from(sessionUsers.values()));
            } else {
                console.log(`User ${user.id} not found in session ${sessionId} during update`);
                // Optional: Re-add them?
                sessionUsers.set(user.id, { ...user, socketId: socket.id, lastUpdated: new Date() });
                io.to(sessionId).emit('session-update', Array.from(sessionUsers.values()));
            }
        } else {
            console.log(`Session ${sessionId} not found during update from ${user.id}`);
        }
    });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Socket.io server running on http://localhost:${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
});
