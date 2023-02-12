import React, { Dispatch, SetStateAction } from "react";
import { classNames } from "../../helpers/helpers";

const DriversTabs: React.FC<{
  tabs: { name: ("Disponibles" | "Ocupados" | "Inactivos"); current: boolean }[];
  setActiveTab: Dispatch<SetStateAction<("Disponibles" | "Ocupados" | "Inactivos")>>;
}> = ({
    tabs,
    setActiveTab
}) => {

  return (
    <div className="mt-6 sm:mt-2 2xl:mt-5">
      <div className="border-b border-gray-200">
        <div className=" max-w-full px-2 sm:px-2 lg:px-2">
          <nav
            className="-mb-px flex flex-row justify-evenly"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={classNames(
                  tab.current
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                )}
                aria-current={tab.current ? "page" : undefined}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DriversTabs;
