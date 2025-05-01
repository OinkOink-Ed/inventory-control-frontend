import { Archive, Book, Home, PackageCheck, User2 } from "lucide-react";

export const itemsUser = [
  {
    title: "Выдача",
    url: "/",
    icon: Home,
  },
  {
    title: "Отчёты",
    url: "/reports",
    icon: Archive,
  },
];

export const itemsAdmin = [
  {
    title: "Пользователи",
    url: "/users",
    icon: User2,
  },
  {
    title: "Модели картриджей",
    url: "/supplement",
    icon: Book,
  },
  {
    title: "Кабинеты",
    url: "/supplement",
    icon: Book,
  },
];

export const itemsWarehouses = [
  {
    title: "Склад 1",
    url: "/warehouse1",
    icon: PackageCheck,
  },
  {
    title: "Склад 2",
    url: "/warehouse2",
    icon: PackageCheck,
  },
];
