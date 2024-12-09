import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./DashboardNavbar.tsx";
import { useEffect } from "react";

const userData = localStorage.getItem("userData");
const user = userData ? JSON.parse(userData) : "";
console.log(user);

export default function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {location.pathname !== "/student/exams/questions" && (
        <Navbar studentName={user.candidateName} studentImage={user.imageURL} />
      )}
      <main className="py-6">
        <Outlet />
      </main>
    </div>
  );
}
