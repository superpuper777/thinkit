"use client";
import { useEffect, useState } from "react";
import { io, Socket  } from "socket.io-client";

type SocketEvents = {
  welcome: (msg: string) => void; 
  message: (msg: string) => void;  
  connect_error: (err: Error) => void;
};

export default function QuizSocket() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
 
    const socket: Socket<SocketEvents> = io("ws://localhost:3001", {
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      setMessages(prev => [...prev, "✅ Connected to server"]);
    });

    socket.on("welcome", (msg: string) => {
      setMessages(prev => [...prev, ` Server: ${msg}`]);
    });

    socket.on("message", (msg: string) => {
      setMessages(prev => [...prev, `Server: ${msg}`]);
    });

    socket.on("connect_error", (err: Error) => {
      setMessages(prev => [...prev, `❌ Error: ${err.message}`]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    const socket = io("ws://localhost:3001");
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>WebSocket-client</h1>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
