import { useEffect } from "react";

export const useWebSocket = (onMessage) => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => console.log("WS connected");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
    ws.onerror = (err) => console.error("WS error", err);

    return () => ws.close();
  }, []);
};
