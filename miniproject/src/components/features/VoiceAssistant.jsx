import { Mic, MicOff, Volume2 } from "lucide-react";
import { useState, useRef } from "react";

const VoiceAssistant = () => {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  // 🎤 Start Voice Input
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Change to "ta-IN" for Tamil
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMsg(transcript);
      send(transcript); // auto send after speaking
    };

    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  // 🔊 Text-to-Speech
  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // Change to "ta-IN" for Tamil
    window.speechSynthesis.speak(speech);
  };

  // 📩 Send message to backend
  const send = async (voiceText = null) => {
    const userMessage = voiceText || msg;
    if (!userMessage.trim()) return;

    setChat((prev) => [...prev, { role: "user", text: userMessage }]);
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setChat((prev) => [...prev, { role: "bot", text: data.reply }]);

      // 🔊 Speak bot reply
      speak(data.reply);

    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "Error getting reply" },
      ]);
    }

    setLoading(false);
  };

  return (
    <div style={{ width: "400px", margin: "40px auto", fontFamily: "Arial" }}>
      <h2>🎤Ask your queries</h2>

      {/* Chat Window */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflowY: "auto",
          marginBottom: "10px",
        }}
      >
        {chat.map((c, i) => (
          <div
            key={i}
            style={{
              textAlign: c.role === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "10px",
                background: c.role === "user" ? "#007bff" : "#e5e5e5",
                color: c.role === "user" ? "#fff" : "#000",
                maxWidth: "80%",
              }}
            >
              {c.text}
            </span>
          </div>
        ))}
        {loading && <div>Bot is typing...</div>}
      </div>

      {/* Input + Controls */}
      <div style={{ display: "flex", gap: "5px" }}>
        <input
  style={{ flex: 1, padding: "8px" }}
  value={msg}
  onChange={(e) => setMsg(e.target.value)}
  placeholder="Ask something..."
  onKeyDown={(e) => {
    if (e.key === "Enter" && !loading) {
      send();
    }
  }}
/>
        <button onClick={() => send()} disabled={loading}>
          Send
        </button>
        <button onClick={startListening}>
          {listening ? <MicOff /> : <Mic />}
        </button>
      </div>
    </div>
  );
};

export default VoiceAssistant;