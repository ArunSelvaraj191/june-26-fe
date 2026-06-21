import { useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./modules/Login";
import Navbar from "./modules/Navbar";
import RegisterPage from "./modules/Register";
import { ThemeContext, ThemeProvider } from "./modules/ThemeContext";

const App = () => {
  const [count, setCount] = useState(0);
  const { theme } = useContext(ThemeContext);
  console.log("theme ::", theme);

  console.log("count :::", count);

  // const a = 5;
  // const [a,seta] = useState(5)

  const addCount = () => {
    setCount(count + 1);
  };

  return (
    <BrowserRouter>
        <div className={theme}>
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </div>
    </BrowserRouter>
  );
};

export default App;
