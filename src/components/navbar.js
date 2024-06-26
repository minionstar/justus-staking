import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "../assets/styles/Home.css";
import logo from "../assets/images/logo1.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const navigation = [
  { name: "Dashboard", tabIndex: 0 },
  { name: "Staking", tabIndex: 1 },
  { name: "Partners", tabIndex: 2 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavComponent(props) {
  const { setActiveTab, activeTab } = props;

  return (
    <Disclosure
      as="nav"
      className="bg-[#231a4f] shadow-[2.0px_8.0px_8.0px_2.0px_rgba(0,0,0,0.38)] fixed z-50 w-full"
    >
      {({ open }) => (
        <div className="">
          <div className="mx-auto px-2 sm:px-6 lg:px-8 lg:py-1">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden md:flex flex-shrink-0 items-center">
                  <img className="h-12 w-auto" src={logo} alt="Your Company" />
                </div>
                <div className="hidden  md:ml-6 md:flex">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      <button
                        key={item.name}
                        className={classNames(
                          item.tabIndex === activeTab
                            ? "bg-primary text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-1 text-sm font-medium"
                        )}
                        onClick={() => setActiveTab(item.tabIndex)}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <ConnectButton accountStatus="" chainStatus="icon" />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  className={classNames(
                    item.tabIndex === activeTab
                      ? "bg-primary text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  onClick={() => setActiveTab(item.tabIndex)}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
