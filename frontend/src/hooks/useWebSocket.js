import { useEffect } from "react";

export const useWebSocket = (onMessage) => {
  useEffect(() => {
    const envUrl = import.meta.env.VITE_WS_URL;
    let wsUrl = envUrl || "ws://localhost:5000";

    // Safety: force wss:// on HTTPS pages even if env var is missing/wrong
    if (window.location.protocol === "https:" && wsUrl.startsWith("ws://")) {
      wsUrl = wsUrl.replace("ws://", "wss://");
    }

    let ws;
    try {
      ws = new WebSocket(wsUrl);
    } catch (err) {
      console.error("WebSocket construction failed:", err);
      return;
    }

    ws.onopen = () => console.log("WS connected ✅", wsUrl);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("WS parse error", err);
      }
    };
    ws.onerror = (err) => console.error("WS error", err);

    return () => ws.close();
  }, []);
};
