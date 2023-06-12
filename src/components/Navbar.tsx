import React from "react";
import { useState } from "react";
import { close, menu, logo } from "../assets";
import { navLinks } from "../constants";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // the whole navbar

    <div className="w-full py-6 flex justify-between items-center">
      {/* logo */}
      <div className="left-0 ml-6 mt-3">
        <a href={"/"}>
          <img src={logo} alt="VoiceTrans" className="w-[235px] h-[65px]" />
        </a>
      </div>
      {/* navbar for large screen: if the screen is more than sx (tailwindcss), show the navbar (set it to flex); otherwise, hidden the navbar */}
      <nav className="sm:flex hidden justify-center items-center flex-1 list-none">
        {/* for each navbar Link */}
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal text-white cursor-pointer text-[16px] ${
              index === navLinks.length - 1 ? "mr-0" : "mr-10"
            }`}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
      </nav>
      <div className="sm:flex hidden justify-center items-center">
        <button className="text-white px-4 py-2 rounded mr-5">Log in</button>
        <button className="bg-blue-500 text-white px-4 py-2">Try free!</button>
      </div>
      {/* /* navbar for small screen: */}
      {/* if the menu is open, open the navbar (flex-column) */}
      <div className="sm:hidden flex flex-1 justify-end items-center mr-5">
        {/* menu icon for small screen, if the screen is less than sm (tailwindcss), show the menu icon; can be clicked switch to close icon */}
        <img
          src={menuOpen ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
        />

        {menuOpen && (
          <div
            // add menu toggle animation
            className={
              "p-6 bg-blue-gradient-2 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar"
            }
          >
            <ul className="list-none flex-col justify-end items-center flex-1">
              {/* for each navbar Link */}
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-normal text-white cursor-pointer text-[16px] ${
                    index === navLinks.length - 1 ? "mb-4" : "mb-4"
                  }`}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}{" "}
              <div>
                <button className="text-white rounded mb-4">Log in</button>
              </div>
              <div>
                <button className="text-white mb-0">Try free!</button>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
