import { useState } from "react";
import { CONTACTS, INITIAL_MESSAGES, type Section } from "@/components/chat/types";
import Sidebar from "@/components/chat/Sidebar";
import MiddlePanel from "@/components/chat/MiddlePanel";
import ChatArea from "@/components/chat/ChatArea";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("chats");
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [e2eEnabled, setE2eEnabled] = useState(true);
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);

  const activeChatData = CONTACTS.find((c) => c.id === activeChat);
  const chatMessages = activeChat ? messages[activeChat] || [] : [];

  const filteredContacts = CONTACTS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!message.trim() || !activeChat) return;
    const newMsg = {
      id: Date.now(),
      text: message.trim(),
      time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }),
      fromMe: true,
      encrypted: true,
    };
    setMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMsg],
    }));
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-tg-bg font-ibm overflow-hidden">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <MiddlePanel
        activeSection={activeSection}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        setSidebarOpen={setSidebarOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredContacts={filteredContacts}
        notificationsEnabled={notificationsEnabled}
        setNotificationsEnabled={setNotificationsEnabled}
        e2eEnabled={e2eEnabled}
        setE2eEnabled={setE2eEnabled}
        twoFaEnabled={twoFaEnabled}
        setTwoFaEnabled={setTwoFaEnabled}
      />
      <ChatArea
        activeChat={activeChat}
        activeChatData={activeChatData}
        chatMessages={chatMessages}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
}
