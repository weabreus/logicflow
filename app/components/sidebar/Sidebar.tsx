import React from "react";
import links from "../links/Links";
import { classNames } from "../../helpers/helpers";

const Sidebar = () => {
  return (
    <>
      <nav
        aria-label="Sidebar"
        className="hidden md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-800"
      >
        <div className="relative flex w-20 flex-col space-y-3 p-3">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-400 hover:bg-gray-700",
                "flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
              )}
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
