import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import RegistrationPage from "./pages/Registration";
import Navbar from "./components/Navbar";
import QuestionExamPage from "./pages/Questions";
import Footer from "./components/Footer";
import Login from "./pages/Login";

function AppWrapper() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith("/questions") && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/questions" element={<QuestionExamPage />} />
      </Routes>
      <Footer />
    </>
  );
}

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
