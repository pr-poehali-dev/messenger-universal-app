import Icon from "@/components/ui/icon";
import { Section } from "@/components/chat/types";

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

export default function Sidebar({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const navItems: { id: Section; icon: string; label: string }[] = [
    { id: "chats", icon: "MessageCircle", label: "Чаты" },
    { id: "contacts", icon: "Users", label: "Контакты" },
    { id: "groups", icon: "UsersRound", label: "Группы" },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "security", icon: "ShieldCheck", label: "Безопасность" },
    { id: "profile", icon: "User", label: "Профиль" },
  ];

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

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
    </>
  );
}
