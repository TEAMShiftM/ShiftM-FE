import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import SignUp1 from './pages/SignUpAgree';
import SignUp2 from './pages/SignUpForm';
import SignUp3 from './pages/SignUpSuccess';
import FindIDForm from './pages/FindIDForm';
import FindPWForm from './pages/FindPWForm';
import CreateLeaveType from './pages/CreateLeaveType';
import "bootstrap/dist/css/bootstrap.min.css";
import IDSuccess from './pages/IDSuccess';
import PWSuccess from './pages/PWSuccess';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Onboarding />} />
        <Route path="/signup1" element={<SignUp1 />} />
        <Route path="/signup2" element={<SignUp2 />} />
        <Route path="/signup3" element={<SignUp3 />} />
        <Route path="/login/findid/form" element={<FindIDForm />} />
        <Route path="/login/findid/success" element={<IDSuccess />} />
        <Route path="/login/findpw/form" element={<FindPWForm />} />
        <Route path="/login/findpw/success" element={<PWSuccess />} />
        <Route path="/create-leave-type" element={<CreateLeaveType />} />
      </Routes>
    </Router>
  );
};

export default App;
