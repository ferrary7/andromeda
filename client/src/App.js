import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import LaunchSchedule from "./Components/LaunchSchedule/LaunchSchedule";
import Loader from "./Components/Loader/Loader";
import Login from "./Components/LogIn/Login";
import MoreInfo from "./Components/MoreInfo/MoreInfo";
import SignUp from "./Components/SignUp/Signup";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/about" element={<About />} />
      <Route path="/users/signup" element={<SignUp />} />
      <Route path="/users/login" element={<Login />} />
      <Route path="/upcomingLaunches" element={<LaunchSchedule />} />
      <Route path="/launches/:launchId" element={<MoreInfo />} />
      <Route path="/loader" element={<Loader />} />
    </Routes>
  );
}

export default App;
