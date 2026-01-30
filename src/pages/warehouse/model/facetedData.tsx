import { Atom } from "lucide-react";

//Возможно нужно получать подразделения и роли и статусы из БД
export const facetedCartridgeData = [
  {
    columnName: "Состояние",
    options: [
      {
        value: "received",
        label: "Received",
        icon: Atom,
      },
      {
        value: "moved",
        label: "Moved",
        icon: Atom,
      },
    ],
  },
];
