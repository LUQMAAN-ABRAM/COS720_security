import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Modules from './pages/Modules';


export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/SignUp" element={<SignUp />}/>
      <Route path="/Login" element={<Login />}/>
      <Route element={<PrivateRoute />}>
      <Route path="/About" element={<About />}/>
      <Route path="/Home" element={<Home />}/>
      <Route path="/Modules" element={<Modules />}/>
      <Route path="/Profile" element={<Profile />}/>
      </Route>
    </Routes>
    
    </BrowserRouter>
  )
}
