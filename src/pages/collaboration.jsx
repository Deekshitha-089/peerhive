import { useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Card, Button } from "@/components/ui/custom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, MoreVertical, Phone, Video, Search } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function Collaboration() {
  const { user } = useAuth();
  const [activeRoom, setActiveRoom] = useState(1);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  const rooms = [
    { id: 1, name: "React Project Group A", members: 4, lastMsg: "Let's meet at 5 PM?", time: "10:30 AM" },
    { id: 2, name: "Database Design Team", members: 3, lastMsg: "Schema updated.", time: "Yesterday" },
    { id: 3, name: "Algorithm Study Group", members: 5, lastMsg: "Can someone explain QuickSort?", time: "Feb 18" },
  ];

  const [messages, setMessages] = useState([
    { id: 1, sender: "Rahul Verma", text: "Hey everyone, have you started on the component structure?", time: "10:00 AM", isMe: false },
    { id: 2, sender: "Sneha P", text: "I'm working on the Navbar and Sidebar.", time: "10:05 AM", isMe: false },
    { id: 3, sender: "You", text: "Great! I'll handle the Dashboard layout and Auth context.", time: "10:10 AM", isMe: true },
    { id: 4, sender: "Rahul Verma", text: "Perfect. Let's sync up later today.", time: "10:12 AM", isMe: false },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: "You",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isMe: true,
    };

    setMessages([...messages, newMsg]);
    setMessage("");

    // Simulated reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "Rahul Verma",
          text: "Got it!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isMe: false,
        },
      ]);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-140px)] gap-6">
        {/* Rooms Sidebar */}
        <Card className="w-80 p-0 flex flex-col overflow-hidden hidden md:flex border-r border-[hsl(288,8%,79%)]">
          <div className="p-4 border-b border-[hsl(288,8%,79%)]">
            <h2 className="font-heading text-xl font-bold text-[hsl(292,27%,36%)] mb-4">
              Messages
            </h2>

            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(288,8%,79%)]"
                size={16}
              />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[hsl(40,27%,94%)] text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(292,27%,36%)]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setActiveRoom(room.id)}
                className={`p-4 border-b border-[hsl(288,8%,79%)]/30 cursor-pointer transition-colors hover:bg-[hsl(40,27%,94%)]/50 ${
                  activeRoom === room.id
                    ? "bg-[hsl(40,27%,94%)] border-l-4 border-l-[hsl(292,27%,36%)]"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className={`font-bold text-sm ${
                      activeRoom === room.id
                        ? "text-[hsl(292,27%,36%)]"
                        : "text-[hsl(240,10%,20%)]"
                    }`}
                  >
                    {room.name}
                  </h3>
                  <span className="text-xs text-[hsl(240,5%,60%)]">
                    {room.time}
                  </span>
                </div>
                <p className="text-xs text-[hsl(240,5%,50%)] truncate pr-2">
                  {room.lastMsg}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 p-0 flex flex-col overflow-hidden shadow-lg border-none">
          {/* Header */}
          <div className="p-4 border-b border-[hsl(288,8%,79%)] flex justify-between items-center bg-white">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-[hsl(292,27%,36%)] text-white font-bold">
                  RP
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-bold text-[hsl(240,10%,20%)]">
                  React Project Group A
                </h3>
                <p className="text-xs text-[hsl(240,5%,50%)]">
                  4 members online
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[hsl(240,5%,50%)]">
              <Button variant="ghost" size="sm">
                <Phone size={18} />
              </Button>
              <Button variant="ghost" size="sm">
                <Video size={18} />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical size={18} />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[hsl(40,27%,94%)]/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.isMe ? "items-end" : "items-start"
                }`}
              >
                {!msg.isMe && (
                  <span className="text-xs text-[hsl(240,5%,50%)] mb-1 ml-1">
                    {msg.sender}
                  </span>
                )}

                <div
                  className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${
                    msg.isMe
                      ? "bg-[hsl(292,27%,36%)] text-white rounded-br-none"
                      : "bg-white border border-[hsl(288,8%,79%)] rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>

                <span className="text-[10px] text-[hsl(240,5%,60%)] mt-1">
                  {msg.time}
                </span>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-[hsl(288,8%,79%)]">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-full border border-[hsl(288,8%,79%)] bg-[hsl(40,27%,94%)]/30 focus:outline-none focus:ring-1 focus:ring-[hsl(292,27%,36%)] text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <Button
                type="submit"
                size="sm"
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
              >
                <Send size={16} />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}