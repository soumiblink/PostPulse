import { useEffect, useRef } from "react";

function useWebSocket(onMessage) {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:5000");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = (msg) => {
    if (ws.current.readyState === 1) {
      ws.current.send(JSON.stringify(msg));
    }
  };

  return { sendMessage };
}

export default useWebSocket;