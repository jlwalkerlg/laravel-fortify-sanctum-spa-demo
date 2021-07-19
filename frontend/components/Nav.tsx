import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React, { FC, Fragment, useRef, useState } from "react";
import api from "../api";

const NavLink: FC<{ href: string }> = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-700 hover:text-white">
        {children}
      </a>
    </Link>
  );
};

const Nav: FC = () => {
  const [email, setEmail] = useState("walker.jlg@gmail.com");
  const isAuthenticated = !!email;

  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  const onLogout = async () => {
    try {
      mobileMenuButtonRef.current?.click();
      await api.get("/sanctum/csrf-cookie");
      await api.post("/logout");
      setEmail("");
    } catch (e) {
      return;
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-300">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/">
                    <a>
                      <img
                        className="h-10"
                        src="https://a2l.marstair.com/img/logo.svg"
                        alt="Marstair"
                      />
                    </a>
                  </Link>
                </div>
                {isAuthenticated && (
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <Link href="/dashboard">
                        <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-700 hover:text-white">
                          Dashboard
                        </a>
                      </Link>
                      <Link href="/projects">
                        <a className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-red-700 hover:text-white">
                          Projects
                        </a>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {isAuthenticated ? (
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>

                              <span className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-700 hover:text-white flex items-center">
                                walker.jlg@gmail.com
                                <ChevronDownIcon className="w-4 h-4 ml-2 stroke-current" />
                              </span>
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href="/profile">
                                    <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-700 hover:text-white">
                                      Your profile
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {() => (
                                  <button
                                    onClick={onLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-700 hover:text-white"
                                  >
                                    Sign out
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  ) : (
                    <NavLink href="/login">Login</NavLink>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button
                  ref={mobileMenuButtonRef}
                  className="text-red-700 hover:text-red-700 inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-800 focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden bg-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href="/dashboard">
                <a className="text-gray-300 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Dashboard
                </a>
              </Link>
              <Link href="/projects">
                <a className="text-gray-300 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  Projects
                </a>
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-300">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center px-5">
                    <div className="text-base font-medium leading-none text-white">
                      walker.jlg@gmail.com
                    </div>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <Link href="/profile">
                      <a className="text-gray-400 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                        Your profile
                      </a>
                    </Link>
                    <button
                      onClick={onLogout}
                      className="w-full text-left text-gray-400 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="px-2 space-y-1">
                  <Link href="/login">
                    <a className="text-gray-400 hover:bg-gray-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                      Sign in
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Nav;
