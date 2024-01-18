import { dashboard, expenses, transactions, trend } from "../utils/Icons";

export const menuItems = [
  {
    id: 1,
    title: "Inicio",
    icon: dashboard,
    link: "/dashboard",
  },
  // {
  //     id: 2,
  //     title: "View Transactions",
  //     icon: transactions,
  //     link: "/dashboard",
  // },
  {
    id: 3,
    title: "Ingresos",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "Egresos",
    icon: expenses,
    link: "/dashboard",
  },
];
