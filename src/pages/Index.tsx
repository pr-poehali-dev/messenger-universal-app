import { useState } from "react";
import Icon from "@/components/ui/icon";

const CONTACTS = [
  { id: 1, name: "Анна Соколова", avatar: "АС", color: "#5B9CF6", lastMsg: "Хорошо, договорились!", time: "14:32", unread: 2, online: true, encrypted: true },
  { id: 2, name: "Рабочая группа", avatar: "РГ", color: "#34D399", lastMsg: "Виктор: презентация готова", time: "13:15", unread: 5, online: false, encrypted: true, isGroup: true },
  { id: 3, name: "Михаил Петров", avatar: "МП", color: "#F59E0B", lastMsg: "Отправил файлы на почту", time: "вчера", unread: 0, online: true, encrypted: true },
  { id: 4, name: "Команда дизайна", avatar: "КД", color: "#A78BFA", lastMsg: "Ирина: новые макеты загружены", time: "вчера", unread: 0, online: false, encrypted: true, isGroup: true },
  { id: 5, name: "Дмитрий Ларин", avatar: "ДЛ", color: "#F87171", lastMsg: "Позвони когда освободишься", time: "пн", unread: 1, online: false, encrypted: true },
  { id: 6, name: "Елена Фёдорова", avatar: "ЕФ", color: "#6EE7B7", lastMsg: "Спасибо за помощь!", time: "пн", unread: 0, online: true, encrypted: true },
  { id: 7, name: "Проект Альфа", avatar: "ПА", color: "#FCA5A5", lastMsg: "Встреча перенесена на пятницу", time: "вс", unread: 0, online: false, encrypted: true, isGroup: true },
];

const MESSAGES: Record<number, { id: number; text: string; time: string; fromMe: boolean; encrypted: boolean }[]> = {
  1: [
    { id: 1, text: "Привет! Как дела с проектом?", time: "14:20", fromMe: false, encrypted: true },
    { id: 2, text: "Всё идёт хорошо, заканчиваю документацию", time: "14:24", fromMe: true, encrypted: true },
    { id: 3, text: "Хорошо, договорились!", time: "14:32", fromMe: false, encrypted: true },
  ],
  2: [
    { id: 1, text: "Всем привет! Обновил задачи в трекере", time: "12:00", fromMe: false, encrypted: true },
    { id: 2, text: "Виктор: презентация готова", time: "13:15", fromMe: false, encrypted: true },
  ],
  3: [
    { id: 1, text: "Нужно обсудить детали контракта", time: "вчера", fromMe: true, encrypted: true },
    { id: 2, text: "Отправил файлы на почту", time: "вчера", fromMe: false, encrypted: true },
  ],
};

type Section = "chats" | "contacts" | "profile" | "search" | "groups" | "security";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("chats");
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState(MESSAGES);
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

  const navItems: { id: Section; icon: string; label: string }[] = [
    { id: "chats", icon: "MessageCircle", label: "Чаты" },
    { id: "contacts", icon: "Users", label: "Контакты" },
    { id: "groups", icon: "UsersRound", label: "Группы" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "security", icon: "ShieldCheck", label: "Безопасность" },
    { id: "profile", icon: "User", label: "Профиль" },
  ];

  return (
    <div className="flex h-screen bg-tg-bg font-ibm overflow-hidden">

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Left sidebar: navigation */}
      <aside
        className={`fixed lg:relative z-50 lg:z-auto flex flex-col w-64 h-full bg-tg-sidebar border-r border-tg-border transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-tg-border">
          <div className="w-8 h-8 rounded-full bg-tg-accent flex items-center justify-center">
            <Icon name="Lock" size={14} className="text-white" />
          </div>
          <span className="text-tg-text font-semibold text-[15px] tracking-tight">SecureChat</span>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-[14px] transition-all duration-150 ${
                activeSection === item.id
                  ? "bg-tg-accent/15 text-tg-accent font-medium"
                  : "text-tg-muted hover:bg-tg-hover hover:text-tg-text"
              }`}
            >
              <Icon name={item.icon as string} size={17} />
              {item.label}
            </button>
          ))}
        </nav>

        <div
          className="px-5 py-4 border-t border-tg-border flex items-center gap-3 cursor-pointer hover:bg-tg-hover transition-colors"
          onClick={() => { setActiveSection("profile"); setSidebarOpen(false); }}
        >
          <div className="w-8 h-8 rounded-full bg-tg-accent/20 flex items-center justify-center text-tg-accent text-[12px] font-semibold">ВИ</div>
          <div className="flex-1 min-w-0">
            <div className="text-tg-text text-[13px] font-medium truncate">Вы</div>
            <div className="text-tg-muted text-[11px]">@username</div>
          </div>
          <Icon name="Settings" size={15} className="text-tg-muted" />
        </div>
      </aside>

      {/* Middle panel */}
      <div className="flex flex-col w-full lg:w-80 xl:w-96 border-r border-tg-border bg-tg-panel flex-shrink-0">
        <div className="flex items-center gap-3 px-4 py-4 border-b border-tg-border">
          <button
            className="lg:hidden p-1.5 rounded-lg text-tg-muted hover:text-tg-text hover:bg-tg-hover transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="Menu" size={18} />
          </button>
          <div className="flex-1">
            <h1 className="text-tg-text font-semibold text-[15px]">
              {activeSection === "chats" && "Сообщения"}
              {activeSection === "contacts" && "Контакты"}
              {activeSection === "groups" && "Группы"}
              {activeSection === "search" && "Поиск"}
              {activeSection === "security" && "Безопасность"}
              {activeSection === "profile" && "Профиль"}
            </h1>
          </div>
          {(activeSection === "chats" || activeSection === "contacts") && (
            <button className="p-1.5 rounded-lg text-tg-muted hover:text-tg-accent hover:bg-tg-hover transition-colors">
              <Icon name="PenSquare" size={16} />
            </button>
          )}
        </div>

        {(activeSection === "chats" || activeSection === "contacts" || activeSection === "search") && (
          <div className="px-3 py-2.5 border-b border-tg-border">
            <div className="flex items-center gap-2 bg-tg-input rounded-xl px-3 py-2">
              <Icon name="Search" size={14} className="text-tg-muted flex-shrink-0" />
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-tg-text text-[13px] outline-none placeholder:text-tg-muted"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>
                  <Icon name="X" size={13} className="text-tg-muted hover:text-tg-text" />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {/* CHATS */}
          {activeSection === "chats" && (
            <div>
              {filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setActiveChat(contact.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 border-b border-tg-border/40 transition-colors text-left ${
                    activeChat === contact.id ? "bg-tg-accent/10" : "hover:bg-tg-hover"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-[13px] font-semibold"
                      style={{ backgroundColor: contact.color }}
                    >
                      {contact.avatar}
                    </div>
                    {contact.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-tg-panel rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-tg-text text-[13.5px] font-medium truncate">{contact.name}</span>
                        {contact.encrypted && <Icon name="Lock" size={10} className="text-tg-accent flex-shrink-0" />}
                      </div>
                      <span className="text-tg-muted text-[11px] flex-shrink-0 ml-2">{contact.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-tg-muted text-[12px] truncate">{contact.lastMsg}</span>
                      {contact.unread > 0 && (
                        <span className="ml-2 flex-shrink-0 w-5 h-5 bg-tg-accent rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* CONTACTS */}
          {activeSection === "contacts" && (
            <div>
              <div className="px-4 py-3">
                <button className="w-full flex items-center gap-3 py-2.5 px-3 bg-tg-accent/10 text-tg-accent rounded-xl text-[13px] font-medium hover:bg-tg-accent/20 transition-colors">
                  <Icon name="UserPlus" size={16} />
                  Добавить контакт
                </button>
              </div>
              {filteredContacts.filter((c) => !c.isGroup).map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 px-4 py-3 border-b border-tg-border/40 hover:bg-tg-hover transition-colors">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[12px] font-semibold" style={{ backgroundColor: contact.color }}>
                      {contact.avatar}
                    </div>
                    {contact.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-tg-panel rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-tg-text text-[13.5px] font-medium">{contact.name}</div>
                    <div className="text-tg-muted text-[11px]">{contact.online ? "В сети" : "Не в сети"}</div>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg text-tg-muted hover:text-tg-accent hover:bg-tg-hover transition-colors">
                      <Icon name="MessageCircle" size={15} />
                    </button>
                    <button className="p-1.5 rounded-lg text-tg-muted hover:text-tg-muted/70 hover:bg-tg-hover transition-colors">
                      <Icon name="MoreVertical" size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* GROUPS */}
          {activeSection === "groups" && (
            <div>
              <div className="px-4 py-3">
                <button className="w-full flex items-center gap-3 py-2.5 px-3 bg-tg-accent/10 text-tg-accent rounded-xl text-[13px] font-medium hover:bg-tg-accent/20 transition-colors">
                  <Icon name="Plus" size={16} />
                  Создать группу
                </button>
              </div>
              {CONTACTS.filter((c) => c.isGroup).map((group) => (
                <div key={group.id} className="flex items-center gap-3 px-4 py-3 border-b border-tg-border/40 hover:bg-tg-hover transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-[12px] font-semibold" style={{ backgroundColor: group.color }}>
                    {group.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-tg-text text-[13.5px] font-medium">{group.name}</span>
                      <Icon name="Lock" size={10} className="text-tg-accent" />
                    </div>
                    <div className="text-tg-muted text-[11px]">{group.lastMsg}</div>
                  </div>
                  <button className="p-1.5 rounded-lg text-tg-muted hover:text-tg-muted/70 hover:bg-tg-hover transition-colors">
                    <Icon name="Settings" size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* SEARCH */}
          {activeSection === "search" && (
            <div className="p-4">
              {searchQuery === "" ? (
                <div className="text-center py-12">
                  <Icon name="Search" size={32} className="text-tg-muted mx-auto mb-3" />
                  <div className="text-tg-muted text-[13px]">Введите запрос для поиска</div>
                  <div className="text-tg-muted/60 text-[11px] mt-1">Контакты, группы, сообщения</div>
                </div>
              ) : (
                <div>
                  <div className="text-tg-muted text-[11px] uppercase tracking-wider mb-2 px-1">Результаты</div>
                  {filteredContacts.length === 0 ? (
                    <div className="text-tg-muted text-[13px] text-center py-6">Ничего не найдено</div>
                  ) : (
                    filteredContacts.map((c) => (
                      <div key={c.id} className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-tg-hover transition-colors cursor-pointer">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[12px] font-semibold" style={{ backgroundColor: c.color }}>
                          {c.avatar}
                        </div>
                        <div>
                          <div className="text-tg-text text-[13px] font-medium">{c.name}</div>
                          <div className="text-tg-muted text-[11px]">{c.isGroup ? "Группа" : "Контакт"}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* SECURITY */}
          {activeSection === "security" && (
            <div className="p-4 space-y-3">
              <div className="bg-tg-accent/10 border border-tg-accent/20 rounded-xl p-4 mb-1">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="ShieldCheck" size={16} className="text-tg-accent" />
                  <span className="text-tg-accent text-[13px] font-semibold">Защита активна</span>
                </div>
                <div className="text-tg-muted text-[12px]">Все сообщения защищены сквозным шифрованием E2E</div>
              </div>

              {[
                { label: "Сквозное шифрование", desc: "E2E для всех сообщений", value: e2eEnabled, toggle: () => setE2eEnabled(!e2eEnabled), icon: "Lock" },
                { label: "Двухфакторная аутентификация", desc: "Дополнительная защита аккаунта", value: twoFaEnabled, toggle: () => setTwoFaEnabled(!twoFaEnabled), icon: "KeyRound" },
                { label: "Уведомления", desc: "Push-уведомления о сообщениях", value: notificationsEnabled, toggle: () => setNotificationsEnabled(!notificationsEnabled), icon: "Bell" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-tg-card rounded-xl px-4 py-3.5">
                  <div className="w-8 h-8 rounded-lg bg-tg-hover flex items-center justify-center flex-shrink-0">
                    <Icon name={item.icon as string} size={15} className="text-tg-muted" />
                  </div>
                  <div className="flex-1">
                    <div className="text-tg-text text-[13px] font-medium">{item.label}</div>
                    <div className="text-tg-muted text-[11px]">{item.desc}</div>
                  </div>
                  <button
                    onClick={item.toggle}
                    className="relative rounded-full transition-colors duration-200 flex-shrink-0"
                    style={{ height: "22px", width: "40px", backgroundColor: item.value ? "var(--tg-accent)" : "var(--tg-input)" }}
                  >
                    <span
                      className="absolute top-0.5 rounded-full bg-white shadow transition-transform duration-200"
                      style={{
                        width: "18px",
                        height: "18px",
                        transform: item.value ? "translateX(20px)" : "translateX(2px)",
                      }}
                    />
                  </button>
                </div>
              ))}

              <div className="bg-tg-card rounded-xl overflow-hidden">
                {[
                  { label: "Сменить пароль", icon: "Key" },
                  { label: "Активные сессии", icon: "Monitor" },
                  { label: "Заблокированные контакты", icon: "UserX" },
                ].map((item, i, arr) => (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-tg-hover transition-colors text-left ${i < arr.length - 1 ? "border-b border-tg-border/50" : ""}`}
                  >
                    <Icon name={item.icon as string} size={15} className="text-tg-muted" />
                    <span className="text-tg-text text-[13px]">{item.label}</span>
                    <Icon name="ChevronRight" size={14} className="text-tg-muted ml-auto" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PROFILE */}
          {activeSection === "profile" && (
            <div className="p-4">
              <div className="flex flex-col items-center py-6">
                <div className="w-20 h-20 rounded-full bg-tg-accent/20 flex items-center justify-center text-tg-accent text-2xl font-semibold mb-3">
                  ВИ
                </div>
                <div className="text-tg-text font-semibold text-[17px]">Ваше Имя</div>
                <div className="text-tg-muted text-[13px] mt-0.5">@username</div>
                <div className="mt-1 flex items-center gap-1">
                  <Icon name="Lock" size={11} className="text-tg-accent" />
                  <span className="text-tg-accent text-[11px]">E2E активен</span>
                </div>
              </div>

              <div className="bg-tg-card rounded-xl overflow-hidden mb-3">
                {[
                  { label: "Имя", value: "Ваше Имя", icon: "User" },
                  { label: "Телефон", value: "+7 (999) 000-00-00", icon: "Phone" },
                  { label: "Username", value: "@username", icon: "AtSign" },
                  { label: "Статус", value: "В сети", icon: "Circle" },
                ].map((item, i, arr) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-3 px-4 py-3 ${i < arr.length - 1 ? "border-b border-tg-border/50" : ""}`}
                  >
                    <Icon name={item.icon as string} size={14} className="text-tg-muted flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-tg-muted text-[11px]">{item.label}</div>
                      <div className="text-tg-text text-[13px]">{item.value}</div>
                    </div>
                    <Icon name="Pencil" size={13} className="text-tg-muted hover:text-tg-accent cursor-pointer" />
                  </div>
                ))}
              </div>

              <button className="w-full py-3 px-4 rounded-xl bg-red-500/10 text-red-400 text-[13px] font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
                <Icon name="LogOut" size={14} />
                Выйти из аккаунта
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main chat area */}
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
    </div>
  );
}