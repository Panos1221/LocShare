# Deployment & Environment Guide
This guide covers how to run the application locally, test a production build locally, and deploy the full stack to the cloud.
## 🛠️ Environment Setup
### Environment Variables
The application uses the following environment variables. You can set these in a [.env](file:///c:/Users/pstav/source/repos/_personal/repos/group-share/.env) file (local) or your hosting platform's dashboard.
| Variable | Description | Default (if unset) |
|----------|-------------|---------------------|
| `VITE_WS_URL` | URL of the WebSocket backend server | `http://localhost:3000` |
| `VITE_MAPBOX_TOKEN` | (Optional) Mapbox Public Token | `undefined` |
---
## 💻 Local Development
To run the full stack locally (Frontend + Backend):
1.  **Start Backend Server** (Terminal 1)
    ```bash
    npm run start:server
    ```
2.  **Start Frontend** (Terminal 2)
    ```bash
    npm run dev
    ```
3.  Open `http://localhost:5173`.
---
## 🏗️ Local Production Preview
To verify how the app will behave in production before deploying:
1.  **Build the Frontend**
    ```bash
    npm run build
    ```
2.  **Preview the Build**
    ```bash
    npm run preview
    ```
    *This serves the built files on a local port (usually 4173).*
3.  **Ensure Backend is Running**
    ```bash
    npm run start:server
    ```
4.  Open `http://localhost:4173` and verify functionality.
---
## ☁️ Deployment Guide (Single Service)
You can host both the frontend and the backend as a **single "Web Service"** on Render (or similar platforms). This is the simplest way to deploy.
### Hosting on Render
1.  **Push your code** to a GitHub repository.
2.  **Create a New Web Service** on Render.
3.  **Connect your Repo**.
4.  **Configure the Service**:
    *   **Build Command**: `npm install && npm run build`
    *   **Start Command**: `npm run start` (which runs `node server.js`)
5.  **Environment Variables**:
    *   You don't *strictly* need `VITE_WS_URL` if hosting together, as it will default to the same origin, but it's good practice to set it to your Render URL if you want to be explicit.
### Why this works?
The [server.js](file:///c:/Users/pstav/source/repos/_personal/repos/group-share/server.js) has been updated to serve the `dist/` folder (where Vite builds your app). When you visit your Render URL, the Node server will serve your React app and handle the WebSocket connections on the same port.
---
## ✅ Verification & Testing
Once deployed (or running locally), verify the real-time location sharing:
1.  Open the App (e.g., `http://localhost:5173`) in **Incognito Window A**.
2.  Join a session (e.g., "TestRoom").
3.  Open the App in **Incognito Window B**.
4.  Join the **same** session ("TestRoom").
5.  **Allow Location Access** when prompted in both windows.
6.  **Verify**:
    *   You should see markers for both users on the map.
    *   Moving in one window (or mocking location in DevTools) will update the marker in the other window instantly.