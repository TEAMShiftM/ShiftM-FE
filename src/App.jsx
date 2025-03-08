
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import "./App.css";
import CheckVacation from "./pages/checkVacation";
import LeaveRequest from "./pages/requestVacation";
import MyPage from "./pages/mypage";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import SignUpAgree from "./pages/SignUpAgree";
import SignUpForm from "./pages/SignUpForm";
import SignUpSuccess from "./pages/SignUpSuccess";
import FindIDForm from "./pages/FindIDForm";
import IDSuccess from "./pages/IDSuccess";
import FindPWForm from "./pages/FindPWForm";
import PWSuccess from "./pages/PWSuccess";
import Navbar from "./components/nav";


function App() {
  const [count, setCount] = useState(0)

  return (


    <BrowserRouter>
      <Navbar /> {/* Add Navbar outside of Routes */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/request-vaction" element={<LeaveRequest />} />
        <Route path="/check-vaction" element={<CheckVacation />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/on" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/agreement" element={<SignUpAgree />} />
        <Route path="/signup/form" element={<SignUpForm />} />
        <Route path="/signup/success" element={<SignUpSuccess />} />
        <Route path="/findid/form" element={<FindIDForm />} />
        <Route path="/findid/success" element={<IDSuccess />} />
        <Route path="/findpw/form" element={<FindPWForm />} />
        <Route path="/findpw/success" element={<PWSuccess />} />
      </Routes>
    </BrowserRouter>
  );

}

export default App
