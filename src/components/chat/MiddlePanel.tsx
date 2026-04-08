import Icon from "@/components/ui/icon";
import { Section, Contact, CONTACTS } from "@/components/chat/types";

interface MiddlePanelProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  activeChat: number | null;
  setActiveChat: (id: number) => void;
  setSidebarOpen: (v: boolean) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  filteredContacts: Contact[];
  notificationsEnabled: boolean;
  setNotificationsEnabled: (v: boolean) => void;
  e2eEnabled: boolean;
  setE2eEnabled: (v: boolean) => void;
  twoFaEnabled: boolean;
  setTwoFaEnabled: (v: boolean) => void;
}

export default function MiddlePanel({
  activeSection,
  setActiveSection,
  activeChat,
  setActiveChat,
  setSidebarOpen,
  searchQuery,
  setSearchQuery,
  filteredContacts,
  notificationsEnabled,
  setNotificationsEnabled,
  e2eEnabled,
  setE2eEnabled,
  twoFaEnabled,
  setTwoFaEnabled,
}: MiddlePanelProps) {
  return (
    <div className="flex flex-col w-full lg:w-80 xl:w-96 border-r border-tg-border bg-tg-panel flex-shrink-0">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-tg-border">
        {(activeSection === "security" || activeSection === "profile") ? (
          <button
            className="p-1.5 rounded-lg text-tg-muted hover:text-tg-text hover:bg-tg-hover transition-colors"
            onClick={() => setActiveSection(activeSection === "security" ? "profile" : "chats")}
          >
            <Icon name="ArrowLeft" size={18} />
          </button>
        ) : (
          <button
            className="lg:hidden p-1.5 rounded-lg text-tg-muted hover:text-tg-text hover:bg-tg-hover transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="Menu" size={18} />
          </button>
        )}
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

      {(activeSection === "chats" || activeSection === "contacts" || activeSection === "groups" || activeSection === "search") && (
        <div className="px-3 pt-2.5 pb-0 border-b border-tg-border">
          <div className="flex items-center gap-2 bg-tg-input rounded-xl px-3 py-2 mb-2.5">
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
          <div className="flex">
            {(["chats", "contacts", "groups"] as Section[]).map((tab) => {
              const labels: Record<string, string> = { chats: "Чаты", contacts: "Контакты", groups: "Группы" };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveSection(tab)}
                  className={`flex-1 py-2 text-[12.5px] font-medium transition-colors border-b-2 ${
                    activeSection === tab
                      ? "text-tg-accent border-tg-accent"
                      : "text-tg-muted border-transparent hover:text-tg-text"
                  }`}
                >
                  {labels[tab]}
                </button>
              );
            })}
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

            <button
              onClick={() => setActiveSection("security")}
              className="w-full py-3 px-4 rounded-xl bg-tg-card text-tg-text text-[13px] font-medium hover:bg-tg-hover transition-colors flex items-center gap-3 mb-3"
            >
              <Icon name="ShieldCheck" size={15} className="text-tg-muted" />
              Безопасность
              <Icon name="ChevronRight" size={14} className="text-tg-muted ml-auto" />
            </button>

            <button className="w-full py-3 px-4 rounded-xl bg-red-500/10 text-red-400 text-[13px] font-medium hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
              <Icon name="LogOut" size={14} />
              Выйти из аккаунта
            </button>
          </div>
        )}
      </div>
    </div>
  );
}