import Icon from "@/components/ui/icon";
import { Contact, Message } from "@/components/chat/types";

interface ChatAreaProps {
  activeChat: number | null;
  activeChatData: Contact | undefined;
  chatMessages: Message[];
  message: string;
  setMessage: (v: string) => void;
  sendMessage: () => void;
}

export default function ChatArea({ activeChat, activeChatData, chatMessages, message, setMessage, sendMessage }: ChatAreaProps) {
  return (
    <div className="flex-1 flex-col min-w-0 hidden lg:flex">
      {activeChat && activeChatData ? (
        <>
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-tg-border bg-tg-panel">
            <div className="relative">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-semibold"
                style={{ backgroundColor: activeChatData.color }}
              >
                {activeChatData.avatar}
              </div>
              {activeChatData.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-tg-panel rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-tg-text font-semibold text-[14px]">{activeChatData.name}</span>
                <Icon name="Lock" size={11} className="text-tg-accent" />
              </div>
              <div className="text-tg-muted text-[11px]">
                {activeChatData.isGroup
                  ? "Группа · E2E шифрование"
                  : activeChatData.online
                  ? "В сети · E2E шифрование"
                  : "Не в сети · E2E шифрование"}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-lg text-tg-muted hover:text-tg-accent hover:bg-tg-hover transition-colors">
                <Icon name="Phone" size={16} />
              </button>
              <button className="p-2 rounded-lg text-tg-muted hover:text-tg-accent hover:bg-tg-hover transition-colors">
                <Icon name="Video" size={16} />
              </button>
              <button className="p-2 rounded-lg text-tg-muted hover:text-tg-muted/70 hover:bg-tg-hover transition-colors">
                <Icon name="MoreVertical" size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-2.5" style={{ background: "var(--tg-chat-bg)" }}>
            <div className="flex justify-center mb-2">
              <div className="flex items-center gap-1.5 bg-tg-hover/80 text-tg-muted text-[11px] px-3 py-1.5 rounded-full">
                <Icon name="Lock" size={11} className="text-tg-accent" />
                Сообщения защищены сквозным шифрованием
              </div>
            </div>

            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed ${
                    msg.fromMe
                      ? "bg-tg-accent text-white rounded-br-sm"
                      : "bg-tg-card text-tg-text rounded-bl-sm"
                  }`}
                >
                  <div>{msg.text}</div>
                  <div className={`flex items-center gap-1 mt-1 ${msg.fromMe ? "justify-end" : "justify-start"}`}>
                    <span className={`text-[10px] ${msg.fromMe ? "text-white/60" : "text-tg-muted"}`}>{msg.time}</span>
                    {msg.encrypted && <Icon name="Lock" size={8} className={msg.fromMe ? "text-white/60" : "text-tg-accent/60"} />}
                    {msg.fromMe && <Icon name="CheckCheck" size={12} className="text-white/70" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 border-t border-tg-border bg-tg-panel">
            <div className="flex items-center gap-2.5">
              <button className="p-2 rounded-lg text-tg-muted hover:text-tg-accent hover:bg-tg-hover transition-colors flex-shrink-0">
                <Icon name="Paperclip" size={18} />
              </button>
              <div className="flex-1 flex items-center gap-2 bg-tg-input rounded-xl px-3.5 py-2.5">
                <input
                  type="text"
                  placeholder="Написать сообщение..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 bg-transparent text-tg-text text-[13.5px] outline-none placeholder:text-tg-muted"
                />
                <button className="text-tg-muted hover:text-tg-accent transition-colors flex-shrink-0">
                  <Icon name="Smile" size={17} />
                </button>
              </div>
              <button
                onClick={sendMessage}
                className="p-2.5 rounded-xl text-white hover:opacity-90 transition-opacity flex-shrink-0"
                style={{ backgroundColor: "var(--tg-accent)" }}
              >
                <Icon name="Send" size={16} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center" style={{ background: "var(--tg-chat-bg)" }}>
          <div className="w-16 h-16 rounded-full bg-tg-accent/10 flex items-center justify-center mb-4">
            <Icon name="MessageCircle" size={28} className="text-tg-accent" />
          </div>
          <div className="text-tg-text font-semibold text-[17px] mb-1">SecureChat</div>
          <div className="text-tg-muted text-[13px] text-center max-w-xs">
            Выберите чат для начала общения.<br />Все сообщения защищены E2E шифрованием.
          </div>
        </div>
      )}
    </div>
  );
}
