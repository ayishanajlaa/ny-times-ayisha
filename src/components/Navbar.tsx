import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Navbar = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("AppContex use with an Provider");
  }

  const { darkMode, toggleAppTheme, handleNewsSearch } = context;

  const [query, setQuery] = useState("");

  const onSearchHandler = (e: any) => {
    const search = e.target.value;
    setQuery(search);
    handleNewsSearch(search);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">
          📰 NY Times
        </Link>

        <input
          type="text"
          placeholder="Search articles..."
          className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={query}
          onChange={onSearchHandler}
        />

        <button
          onClick={toggleAppTheme}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className="px-3 py-1 border rounded text-gray-700 dark:text-white"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
