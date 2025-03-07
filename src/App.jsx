import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import "./App.css";
import CheckVacation from "./pages/checkVacation";
import LeaveRequest from "./pages/requestVacation";
import MyPage from "./pages/mypage";
import Navbar from "./components/nav";

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Add Navbar outside of Routes */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/request-vaction" element={<LeaveRequest />} />
        <Route path="/check-vaction" element={<CheckVacation />} />
        <Route path="/my-page" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
