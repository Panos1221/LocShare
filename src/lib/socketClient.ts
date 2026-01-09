import { io, Socket } from 'socket.io-client';

// Determine URL:
// 1. Env var (if set)
// 2. Window origin (if serving the app from the same host as the socket server, e.g. Render/Production)
// 3. Fallback to localhost:3000 (Local Dev where frontend is 5173 and backend is 3000)

let socketUrl = import.meta.env.VITE_WS_URL;

if (!socketUrl) {
    if (import.meta.env.PROD) {
        // In production build, assume serving from the same host (relative path)
        // or explicitly use window.location.origin
        socketUrl = window.location.origin;
    } else {
        // In dev, defaults to separate backend port
        socketUrl = 'http://localhost:3000';
    }
}

export const socket: Socket = io(socketUrl, {
    autoConnect: false, // We will connect manually when session starts
    transports: ['websocket'], // Prefer WebSocket
});
