import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProfilePage from "./pages/profilePage/ProfilePage";
import HomePage from "./pages/homePage/HomePage";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import UnauthorizePage from "./pages/unauthorizePage/UnauthorizePage";
import RequireUser from "./components/RequireUser";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from "./pages/adminPage/AdminPage";
import VerifyEmailPage from "./pages/verifyEmailPage/VerifyEmailPage";

function App() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />

          {/* Private Routes */}
          <Route element={<RequireUser allowedRoles={['user', 'admin']} />}>
            <Route path='profile' element={<ProfilePage />} />
          </Route>

          <Route element={<RequireUser allowedRoles={['admin']} />}>
            <Route path='admin' element={<AdminPage />} />
          </Route>
          
          <Route path='unauthorized' element={<UnauthorizePage />} />
        </Route>
        <Route path='verifyemail' element={<VerifyEmailPage />}>
          <Route path=':verificationCode' element={<VerifyEmailPage />} />
        </Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />
      </Routes>
    </>
  )
}

export default App
