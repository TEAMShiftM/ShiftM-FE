import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import { useState } from "react";
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
import ViewShift from "./pages/viewShift";
import Objection from "./pages/requestObjection";
import CheckObjection from "./pages/checkObjection";
import CreateCompany from "./pages/admin/companyProfile";
import EmployeeList from "./pages/admin/employeeList";
import EmployeeProfile from "./pages/admin/employeeProfile";
import EditShift from "./pages/admin/editShift";
import AttendanceList from "./pages/admin/attendanceList";
import CreateLeaveType from "./pages/admin/createLeaveType";
import LeaveTypeList from "./pages/admin/leavetypeList";
import EditLeaveType from "./pages/admin/editLeaveType";
import CreateLeave from "./pages/admin/createLeave";
import LeaveList from "./pages/admin/viewLeaveList";
import EditLeave from "./pages/admin/editLeave";
import LeaveRequestList from "./pages/admin/leaveRequestList";
import AObjectionList from "./pages/admin/objectionList";
import AdminMain from "./pages/admin/adminmain";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navbar /> {/* Add Navbar outside of Routes */}
      <Routes>
        <Route path="/" element={<Main />} />{" "}
        <Route path="/request-vaction" element={<LeaveRequest />} />{" "}
        <Route path="/check-vaction" element={<CheckVacation />} />{" "}
        <Route path="/my-page" element={<MyPage />} />{" "}
        <Route path="/on" element={<Onboarding />} />{" "}
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/signup/agreement" element={<SignUpAgree />} />{" "}
        <Route path="/signup/form" element={<SignUpForm />} />{" "}
        <Route path="/signup/success" element={<SignUpSuccess />} />{" "}
        <Route path="/findid/form" element={<FindIDForm />} />{" "}
        <Route path="/findid/success" element={<IDSuccess />} />{" "}
        <Route path="/findpw/form" element={<FindPWForm />} />{" "}
        <Route path="/findpw/success" element={<PWSuccess />} />{" "}
        <Route path="/view-shift" element={<ViewShift />} />{" "}
        <Route path="/objection" element={<Objection />} />{" "}
        <Route path="/check-objection" element={<CheckObjection />} />{" "}
        <Route path="/create-company" element={<CreateCompany />} />{" "}
        <Route path="/employee-list" element={<EmployeeList />} />{" "}
        <Route path="/employee-profile" element={<EmployeeProfile />} />{" "}
        <Route path="/edit-shift" element={<EditShift />} />{" "}
        <Route path="/attendance-list" element={<AttendanceList />} />{" "}
        <Route path="/create-leave-type" element={<CreateLeaveType />} />{" "}
        <Route path="/leave-type-list" element={<LeaveTypeList />} />{" "}
        <Route path="/edit-leave-type/:id" element={<EditLeaveType />} />{" "}
        <Route path="/create-leave" element={<CreateLeave />} />{" "}
        <Route path="/leave-list" element={<LeaveList />} />{" "}
        <Route path="/edit-leave/:id" element={<EditLeave />} />{" "}
        <Route path="/leave-request-list" element={<LeaveRequestList />} />{" "}
        <Route path="/objection-list" element={<AObjectionList />} />{" "}
        <Route path="/admin-main" element={<AdminMain />} />
        {""}
      </Routes>{" "}
    </BrowserRouter>
  );
}
export default App;
