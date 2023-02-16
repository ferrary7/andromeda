import { Route, Routes } from "react-router-dom";
import './App.css';
import Home from './Components/Home/Home';
// import Navbar from './Components/NavBar/Navbar';
import SignUp from './Components/SignUp/Signup';

function App() {
  return (
    <Routes>

      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />

    </Routes>
  );
}

export default App;
