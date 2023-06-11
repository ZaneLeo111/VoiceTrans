import React from "react";
import { useState } from "react";
import { close, menu, logo } from "../assets";
import { navLinks } from "../constants";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    // the whole navbar

    <nav className="w-full flex py-6 justify-between items-center navbar">
      {/* logo */}
      <a href={"/"}>
        <img src={logo} alt="VoiceTrans" className="w-[124px] h-[32px]" />
      </a>

      {/* navbar for large screen: if the screen is more than sx (tailwindcss), show the navbar (set it to flex); otherwise, hidden the navbar */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
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
      </ul>

      {/* for small screen */}
      {/* if large than sm, hidden; less than sm: flex */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        {/* menu icon for small screen, if the screen is less than sm (tailwindcss), show the menu icon; can be clicked switch to close icon */}
        <img
          src={menuOpen ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setMenuOpen((prevMenuOpen) => !prevMenuOpen)}
        />

        {/* if the menu is open, open the navbar (flex-column) */}

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
                    index === navLinks.length - 1 ? "mr-0" : "mb-4"
                  }`}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* navbar for small screen: */}
    </nav>
  );
};

export default Navbar;
