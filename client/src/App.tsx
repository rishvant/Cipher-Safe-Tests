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
import Layout from "./components/Layout/Layout";
import Profile from "./pages/Profile";
import Exams from "./pages/Exams";

function AppWrapper() {
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith("/student") && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<Layout />}>
          <Route path="/student/profile" element={<Profile />} />
          <Route path="/student/exams" element={<Exams />} />
          <Route
            path="/student/exams/questions"
            element={<QuestionExamPage />}
          />
        </Route>
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
