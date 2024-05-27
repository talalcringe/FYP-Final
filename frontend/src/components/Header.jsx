import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Overlay from "./overlays/Overlay";
import Login from "./pop-ups/Login";
import Logo from "../assets/logo-white.png";
import { useSelector } from "react-redux";

const Header = () => {
  // popup opening and closing logic
  const [popup, setPopup] = useState(false);
  const openPopup = () => {
    setPopup(true);
  };
  const closePopup = () => {
    setPopup(false);
  };

  // Dynamically showing items logic
  const isUserLoggedIn = useSelector((store) => store.user.isLoggedIn);

  const content = !isUserLoggedIn ? (
    <>
      <button className="text-sm font-semibold bg-white text-blue text-md uppercase leading-6 mr-4 px-6 py-2 rounded-full ">
        Logout
      </button>
      <Link
        to="/dashboard"
        className="text-md font-semibold leading-6  text-white bg-navyblue px-6 py-2 rounded-full "
      >
        Dashboard
      </Link>
      <button className="w-10 h-10 rounded-full bg-navyblue text-black bg-yellow grid place-items-center text-xl ml-8">
        J
      </button>
    </>
  ) : (
    <>
      <button
        className="px-4 py-2 rounded-full font-semibold bg-white text-blue text-md uppercase cursor-pointer hover:opacity-90"
        onClick={openPopup}
      >
        Login
      </button>
    </>
  );

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <header className="absolute inset-x-0 top-0 px-5 z-50 bg-blue">
        <nav
          className="flex items-center justify-between px-1 py-3 w-[95%] mx-auto lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/" className="mt-2.5 p-1.5">
              <img src={Logo} alt="" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 "></div>
          <div className="hidden lg:flex lg:flex-1 gap-3 lg:justify-end">
            {content}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <h4>Productive Writing</h4>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6"></div>
                <div className="py-6">
                  <div className="grid place-items-center mb-5">
                    <button className="w-10 h-10  rounded-full bg-navyblue text-white grid place-items-center text-xl ">
                      J
                    </button>
                  </div>
                  <Link
                    to="/dashboard"
                    className="text-sm font-semibold block text-center leading-6 text-white bg-navyblue px-6 py-2 rounded-full "
                  >
                    Dashboard
                  </Link>

                  <button className="text-sm block font-semibold w-full leading-6 my-6 text-white bg-purple-400 px-6 py-2 rounded-full">
                    Logout
                  </button>

                  <button className="  px-4 py-2 block rounded-full w-full bg-yellow text-navyblue cursor-pointer hover:opacity-90">
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      {popup && <Overlay onClose={closePopup}>{<Login />}</Overlay>}
    </>
  );
};

export default Header;
