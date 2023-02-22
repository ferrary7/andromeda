import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './Components/Home/Home';
import LaunchSchedule from "./Components/LaunchSchedule/LaunchSchedule";
import Loader from "./Components/Loader/Loader";
import Login from "./Components/LogIn/Login";
import SignUp from './Components/SignUp/Signup';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/users/signup' element={<SignUp />} />
      <Route path='/users/login' element={<Login />} />
      <Route path='/launch' element={<LaunchSchedule />} />
      <Route path='/loader' element={<Loader />} />
    </Routes>
  );
}

export default App;
