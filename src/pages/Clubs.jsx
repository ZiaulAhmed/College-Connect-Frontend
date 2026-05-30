// src/pages/Clubs.jsx
import React, { useState, useEffect, useRef } from "react";

export default function Clubs() {
  const [selectedClub, setSelectedClub] = useState(null);
  const [messages, setMessages] = useState([
    { user: "System", text: "Welcome to the group chat!", time: "10:00 AM" },
    { user: "Rahul", text: "Hey guys, when is the next meeting?", time: "10:05 AM" },
    { user: "Sneha", text: "It's this Friday at 4 PM in Lab 1.", time: "10:06 AM" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedClub) {
      scrollToBottom();
    }
  }, [messages, selectedClub]);

  const clubs = [
    { name: "Robotics Club", members: 45, status: "Active" },
    { name: "Drama & Arts", members: 30, status: "Planning Event" },
    { name: "Coding Ninjas", members: 120, status: "Active" },
    { name: "Music Society", members: 55, status: "Practice Session" },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { user: "Me", text: input, time };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate Reply
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const botReply = { user: "Bot", text: "Got it! Thanks for the update.", time: replyTime };
      setMessages((prev) => [...prev, botReply]);
    }, 1500);
  };

  if (selectedClub) {
    return (
      <div className="page-container chat-view">
        <div className="page-header chat-header">
          <button className="btn-secondary back-btn" onClick={() => setSelectedClub(null)}>← All Clubs</button>
          <div className="header-text">
            <h2>{selectedClub.name} Chat</h2>
            <p>{selectedClub.members} active members</p>
          </div>
        </div>

        <div className="chat-window glass-card">
          <div className="messages-container">
            {messages.map((m, i) => (
              <div key={i} className={`message-bubble ${m.user === "Me" ? "my-message" : ""}`}>
                <span className="msg-user">{m.user}</span>
                <p className="msg-text">{m.text}</p>
                <span className="msg-time">{m.time}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-area" onSubmit={handleSendMessage}>
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn-primary send-btn">Send</button>
          </form>
        </div>

        <style>{`
          .chat-view { max-width: 900px; margin: 0 auto; height: calc(100vh - 120px); display: flex; flex-direction: column; }
          .chat-header { display: flex; align-items: flex-start; gap: 1.5rem; border-bottom: 1px solid rgba(0,0,0,0.05); padding-bottom: 2rem; margin-bottom: 2rem; }
          .chat-window { flex: 1; display: flex; flex-direction: column; background: rgba(255,255,255,0.05); border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); overflow: hidden; }
          .messages-container { flex: 1; padding: 2rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.2rem; }
          .message-bubble { background: rgba(255,255,255,0.1); padding: 1rem 1.4rem; border-radius: 20px 20px 20px 4px; max-width: 60%; align-self: flex-start; border: 1px solid rgba(255,255,255,0.05); box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
          .my-message { align-self: flex-end; background: linear-gradient(135deg, #6366f1, #4f46e5); color: white; border-radius: 20px 20px 4px 20px; border: none; }
          .msg-user { font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; opacity: 0.6; display: block; margin-bottom: 6px; }
          .msg-text { margin: 0; font-size: 1rem; line-height: 1.5; }
          .msg-time { font-size: 0.65rem; opacity: 0.5; display: block; text-align: right; margin-top: 6px; }
          .chat-input-area { padding: 1.5rem 2rem; background: rgba(255,255,255,0.03); display: flex; gap: 1rem; align-items: center; }
          .chat-input-area input { flex: 1; padding: 1.2rem 1.8rem; background: #1e293b; border-radius: 99px; border: 1px solid rgba(148, 163, 184, 0.4); color: #ffffff; outline: none; font-size: 1rem; transition: border-color 0.2s; }
          .chat-input-area input:focus { border-color: #6366f1; background: #0f172a; }
          .back-btn { padding: 0.7rem 1.2rem; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Club Chat Rooms</h1>
        <p>Connect with your peers in specialized interest groups and clubs.</p>
      </div>

      <div className="clubs-grid">
        {clubs.map((club, i) => (
          <div key={i} className="club-card glass-card">
            <h3>{club.name}</h3>
            <p>👥 {club.members} members</p>
            <div className="club-status">
              <span className="dot"></span> {club.status}
            </div>
            <button className="btn-primary join-btn" onClick={() => setSelectedClub(club)}>Enter Chat</button>
          </div>
        ))}
      </div>

      <style>{`
        .clubs-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .club-card { padding: 2rem; background: rgba(255, 255, 255, 0.05); text-align: center; border: 1px solid rgba(255, 255, 255, 0.1); }
        .club-card h3 { margin: 0 0 1rem; color: #4f46e5; }
        .club-status { margin: 1rem 0; font-size: 0.9rem; opacity: 0.8; }
        .dot { height: 10px; width: 10px; background-color: #10b981; border-radius: 50%; display: inline-block; margin-right: 5px; }
        .join-btn { width: 100%; margin-top: 1rem; }
      `}</style>
    </div>
  );
}
