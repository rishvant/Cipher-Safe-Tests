import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RegistrationPage from "./pages/Registration";
import Navbar from "./components/Navbar";
import QuestionExamPage from "./pages/Questions";
import Footer from "./components/Footer";
import Login from "./pages/Login";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      {!token && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={<QuestionExamPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
