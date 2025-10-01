import { useEffect, useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    // Update this URL to match your server
    const ws = new WebSocket("wss://super-garbanzo-x479v995pxhvxw6-8000.app.github.dev/ws");

    ws.onopen = () => {
      setStatus("Connected");
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onerror = (error) => {
      setStatus("Error");
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      setStatus("Disconnected");
      console.log("WebSocket closed");
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) { //We will close the connection when user navigates away but only if  it's open
        ws.close();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          WebSocket Demo
        </h1>
        
        <div className="mb-6">
          <span className="text-sm font-semibold text-gray-600">Status: </span>
          <span
            className={`text-sm font-semibold ${
              status === "Connected"
                ? "text-green-600"
                : status === "Error"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="space-y-2">
          {messages.length === 0 ? (
            <p className="text-gray-500 italic">Waiting for messages...</p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded"
              >
                {msg}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}