"use client";
import { UseUser } from "@/contexts/UserContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {};

async function logout() {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "logout" }),
  });
  const data = await res.json();
  return data;
}

function useClientPathname() {
  const [clientPathname, setClientPathname] = useState<string | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    setClientPathname(pathName);
  }, [pathName]);

  return clientPathname;
}

function Navbar({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const { state, dispatch } = UseUser();
  const clientPathName = useClientPathname();

  const navLinks = [
    { href: "/tasks", label: "Tasks" },
    { href: "/projects", label: "Projects" },
    {
      label: "Account",
      children: [
        { href: "/Account/profile", label: "Profile" },
        { href: "/settings", label: "Settings" },
      ],
    },
  ];

  const toggleSubMenu = (label: string) => {
    setActiveSubMenu((prev) => (prev === label ? null : label));
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Home
          </span>
        </Link>
        {state.isAuthenticated ? (
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                logout(), dispatch({ type: "Logout" });
              }}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link href={"/Auth/Login"}>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log In
              </button>{" "}
            </Link>
          </div>
        )}
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
        {state.isAuthenticated ? (
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              isMenuOpen ? "" : "hidden"
            }`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {navLinks.map((link) => (
                <li key={link.href || link.label} className="relative">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center relative md:relative">
                      <Link
                        href={link.href || "#"}
                        className={`block py-2 px-3 rounded-sm md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:text-white 
                      ${clientPathName === link.href ? "text-blue-700 dark:text-blue-500" : ""}`}
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
                            className={`w-2.5 h-2.5 ms-1 transition-transform ${
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
                      <ul
                        className={`
                      z-50 mt-2 w-full md:absolute md:left-0 md:top-full md:mt-2 md:w-40 
                      rounded-md bg-white dark:bg-gray-800 md:shadow-md
                      `}
                      >
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                clientPathName === child.href
                                  ? "text-blue-700 dark:text-blue-400"
                                  : ""
                              }`}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveSubMenu(null);
                              }}
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
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}

export default Navbar;
