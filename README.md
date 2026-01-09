# 📍 LocShare

**Privacy-First Real-Time Location Sharing**

LocShare is a simple, elegant, and privacy-focused application that allows you to share your real-time location with friends and family using a simple passkey. No accounts, no tracking, no footprints.

## 🌐 Live Demo

**This app is hosted and live on Render**: [https://locshare-xj5k.onrender.com/](https://locshare-xj5k.onrender.com/)

## ✨ Key Features

- **🚀 Real-Time Sharing**: Powered by WebSockets (Socket.io) for instant location updates across all devices.
- **🛡️ Privacy First**: 
  - No user accounts or passwords required.
  - No personal data or location history stored.
  - **Stop Sharing** toggle to instantly hide your location while staying in the room.
  - Ephemeral sessions that disappear when you're done.
- **🗺️ Interactive Maps**: High-performance vector maps powered by Mapbox GL JS with support for multiple styles (Streets, Navigation, Dark, Satellite) and a one-click **Compass** to reset bearing to North.
- **🧭 Smart Navigation**: One-tap navigation shortcuts for **Google Maps**, **Apple Maps**, and **Waze**.
- **📏 Distance Tracking**: Real-time distance calculation between you and other group members.
- **🏡 Live Addresses**: Integrated reverse-geocoding displays the nearest street address for all members.
- **🎨 Personalized Pins**: Customize your profile with a range of colors and icons.
- **📊 Server Health Dashboard**: Password-protected real-time monitoring of active users and sessions.
- **🌍 Internationalization**: Multi-language support for **English**, **Spanish**, **French**, **German**, **Italian**, and **Portuguese**.

<img width="1080" height="1080" alt="locshare" src="https://github.com/user-attachments/assets/c86737c3-1bad-4dae-a3c7-00dfa0e09678" />

## 🛠️ Technology Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** for blazing fast builds
- **Tailwind CSS** + **shadcn/ui** for premium aesthetics
- **Framer Motion** for smooth animations
- **Zustand** for lightweight state management
- **Mapbox GL JS** for advanced map rendering
- **i18next** for multi-language support

### Backend
- **Node.js** + **Express**
- **Socket.io** for real-time bidirectional communication
- **Tailwind-styled Health Dashboard** for system monitoring

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or later)
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Panos1221/LocShare.git
   cd group-share
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To run the full stack, you need to start both the frontend and the backend server.

#### 1. Start the Backend Server
```bash
npm run start:server
```
The server will run on `http://localhost:3000`. You can view the health dashboard at `http://localhost:3000/health`.

#### 2. Start the Frontend Development Server
```bash
npm run dev
```
The app will be available at the URL shown in your terminal (usually `http://localhost:8080`).

### 🔑 Configuration

LocShare requires a **Mapbox Access Token** to display maps. 
- You will be prompted to enter your token within the app if it's not detected.
- You can get a free token by creating an account at [mapbox.com](https://www.mapbox.com/).

### 🌍 Environment Variables

Create a `.env` file in the root directory with the following structure:

```env
# Backend Server Configuration
PORT=3000
HEALTH_PASSWORD=your_secure_password_here

# Frontend Configuration (Vite)
# Optional: WebSocket server URL (defaults to localhost:3000 in dev, window.location.origin in prod)
VITE_WS_URL=http://localhost:3000

# Mapbox Access Token (can also be set via localStorage in the app)
VITE_MAPBOX_TOKEN=your_mapbox_token_here
```

## 📁 Project Structure

```text
├── src/
│   ├── components/     # UI components (shadcn + custom)
│   │   ├── color/      # Color picker components
│   │   ├── landing/    # Landing page sections
│   │   ├── layout/     # Layout components (Header, Footer, NavLink)
│   │   ├── map/        # Map-related components
│   │   ├── session/    # Session management components
│   │   └── ui/         # shadcn/ui components
│   ├── lib/            # Utilities, stores, and configuration
│   ├── pages/          # Main application views
│   └── hooks/          # Custom React hooks
├── public/             # Static assets
├── server/             # Backend server
│   └── index.js        # Socket.io backend implementation
└── tailwind.config.ts  # Visual theme configuration
```

## 📜 License

This project is licensed under the MIT License.

---
Built for privacy and real-time connectivity.
