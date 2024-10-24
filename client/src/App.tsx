import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RegistrationPage from "./pages/Registration";
import Navbar from "./components/Navbar";
import QuestionExamPage from "./pages/Questions";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/questions" element={<QuestionExamPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
