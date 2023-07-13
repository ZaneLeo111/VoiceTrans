import React from "react";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => (
  <header className="w-full bg-blue-500 text-white py-4 px-6">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <h1 className="font-bold text-xl">{title}</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
