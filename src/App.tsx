import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import ArticleList from "./components/ArticleList";
import ArticleDetail from "./components/ArticleDetail";
import Navbar from "./components/Navbar";

type AppContextType = {
  darkMode: boolean;
  toggleAppTheme: () => void;
  searchKey: string;
  handleNewsSearch: (query: string) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? true : false;
  });

  const [searchKey, setSearchKey] = useState("");

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleAppTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleNewsSearch = (query: any) => {
    setSearchKey(query);
  };

  return (
    <AppContext.Provider value={{ darkMode, toggleAppTheme, searchKey, handleNewsSearch }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
};

export default App;
