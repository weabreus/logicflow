import {
    UsersIcon,
    FlagIcon,
    MapIcon,
    NoSymbolIcon,
    PencilSquareIcon,
    UserCircleIcon,
  } from "@heroicons/react/24/outline";

const links = [
    { name: "Dashboard", href: "/", icon: MapIcon, current: true },
    { name: "Transportistas", href: "/drivers", icon: UsersIcon, current: false },
    { name: "Clientes", href: "/customers", icon: UserCircleIcon, current: false },
];

export default links;