import { Atom } from "lucide-react";

export const facetedUsersData = [
  {
    columnName: "Роль",
    options: [
      {
        value: "admin",
        label: "Admin",
        icon: Atom,
      },
      {
        value: "user",
        label: "User",
        icon: Atom,
      },
    ],
  },
  {
    columnName: "Статус",
    options: [
      {
        value: "active",
        label: "Active",
        icon: Atom,
      },
      {
        value: "inactive",
        label: "Inactive",
        icon: Atom,
      },
    ],
  },
  {
    columnName: "Подразделение",
    options: [
      {
        value: "Подразделение № 1",
        label: "Подразделение № 1",
        icon: Atom,
      },
      {
        value: "Подразделение № 2",
        label: "Подразделение № 2",
        icon: Atom,
      },
      {
        value: "Подразделение № 3",
        label: "Подразделение № 3",
        icon: Atom,
      },
      {
        value: "Подразделение № 4",
        label: "Подразделение № 4",
        icon: Atom,
      },
    ],
  },
];
