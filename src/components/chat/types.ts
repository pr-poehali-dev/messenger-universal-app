export type Section = "chats" | "contacts" | "profile" | "search" | "groups" | "security";

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  color: string;
  lastMsg: string;
  time: string;
  unread: number;
  online: boolean;
  encrypted: boolean;
  isGroup?: boolean;
}

export interface Message {
  id: number;
  text: string;
  time: string;
  fromMe: boolean;
  encrypted: boolean;
}

export const CONTACTS: Contact[] = [
  { id: 1, name: "Анна Соколова", avatar: "АС", color: "#5B9CF6", lastMsg: "Хорошо, договорились!", time: "14:32", unread: 2, online: true, encrypted: true },
  { id: 2, name: "Рабочая группа", avatar: "РГ", color: "#34D399", lastMsg: "Виктор: презентация готова", time: "13:15", unread: 5, online: false, encrypted: true, isGroup: true },
  { id: 3, name: "Михаил Петров", avatar: "МП", color: "#F59E0B", lastMsg: "Отправил файлы на почту", time: "вчера", unread: 0, online: true, encrypted: true },
  { id: 4, name: "Команда дизайна", avatar: "КД", color: "#A78BFA", lastMsg: "Ирина: новые макеты загружены", time: "вчера", unread: 0, online: false, encrypted: true, isGroup: true },
  { id: 5, name: "Дмитрий Ларин", avatar: "ДЛ", color: "#F87171", lastMsg: "Позвони когда освободишься", time: "пн", unread: 1, online: false, encrypted: true },
  { id: 6, name: "Елена Фёдорова", avatar: "ЕФ", color: "#6EE7B7", lastMsg: "Спасибо за помощь!", time: "пн", unread: 0, online: true, encrypted: true },
  { id: 7, name: "Проект Альфа", avatar: "ПА", color: "#FCA5A5", lastMsg: "Встреча перенесена на пятницу", time: "вс", unread: 0, online: false, encrypted: true, isGroup: true },
];

export const INITIAL_MESSAGES: Record<number, Message[]> = {
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
