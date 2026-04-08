import Icon from "@/components/ui/icon";
import { Section } from "@/components/chat/types";

interface SidebarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
}

export default function Sidebar({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }: SidebarProps) {
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
        <div
          className="flex items-center gap-3 px-5 py-4 border-b border-tg-border cursor-pointer hover:bg-tg-hover transition-colors"
          onClick={() => { setActiveSection("profile"); setSidebarOpen(false); }}
        >
          <div className="w-9 h-9 rounded-full bg-tg-accent/20 flex items-center justify-center text-tg-accent text-[13px] font-semibold flex-shrink-0">ВИ</div>
          <div className="flex-1 min-w-0">
            <div className="text-tg-text text-[14px] font-semibold truncate">Ваше Имя</div>
            <div className="text-tg-muted text-[11px]">@username</div>
          </div>
          <Icon name="Settings" size={15} className="text-tg-muted" />
        </div>

        <div className="flex-1" />
      </aside>
    </>
  );
}