"use client";
import { UseUser } from "@/contexts/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useClientPathname() {
  const [clientPathname, setClientPathname] = useState<string | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    setClientPathname(pathName);
  }, [pathName]);

  return clientPathname;
}

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const { state } = UseUser();
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const clientPathName = useClientPathname();

  const toggleSidebar = () => setExpanded((prev) => !prev);

  // Adjust this to match your navbar height, e.g., 64px
  const NAVBAR_HEIGHT = "69px";

  const navLinks = [
    { href: "/tasks", label: "Tasks" },
    { href: "/projects", label: "Projects" },
    {
      label: "Account",
      children: [
        { href: "/profile", label: "Profile" },
        { href: "/settings", label: "Settings" },
      ],
    },
  ];
  const toggleSubMenu = (label: string) => {
    setActiveSubMenu((prev) => (prev === label ? null : label));
  };

  return (
    <>
      {state.isAuthenticated && !expanded && (
        <div className="fixed left-4 z-50" style={{ top: NAVBAR_HEIGHT }}>
          <button
            type="button"
            onClick={toggleSidebar}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
      )}

      {state.isAuthenticated && (
        <div
          id="drawer-navigation"
          className={`fixed left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-900 ${
            expanded ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ top: NAVBAR_HEIGHT }}
          aria-labelledby="drawer-navigation-label"
          role="dialog"
          aria-modal="true"
        >
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
          >
            Menu
          </h5>
          <button
            type="button"
            aria-controls="drawer-navigation"
            onClick={toggleSidebar}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div>
            <ul className="flex flex-col p-2 mt-2 space-y-2 font-medium border border-gray-100 rounded-lg bg-gray-50 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navLinks.map((link) => (
                <li key={link.href || link.label} className="relative">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center justify-between">
                      <Link
                        href={link.href || "#"}
                        className={`block py-2 px-3 rounded-md hover:text-blue-700 dark:hover:text-blue-500 ${
                          clientPathName === link.href
                            ? "text-blue-700 dark:text-blue-500"
                            : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <button
                          type="button"
                          className="flex items-center px-2 py-2"
                          onClick={() => toggleSubMenu(link.label)}
                        >
                          <svg
                            className={`w-3 h-3 transition-transform ${
                              activeSubMenu === link.label ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 4 4 4-4"
                            />
                          </svg>
                        </button>
                      )}
                    </div>

                    {link.children && activeSubMenu === link.label && (
                      <ul className="mt-2 flex flex-col space-y-1 rounded-md bg-white dark:bg-gray-800 shadow-md p-2">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                clientPathName === child.href
                                  ? "text-blue-700 dark:text-blue-400"
                                  : ""
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
