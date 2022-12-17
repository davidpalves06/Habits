import { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes,BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useAuthValue } from './context/AuthContext';
import About from './pages/About/About';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Register/Signup';

function App() {
  const {user,setUser} = useAuthValue()
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    function loadUserFromStorage(){
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        const foundUser = JSON.parse(loggedInUser)
        setUser(foundUser)
      }
    }
    setLoading(true)
    loadUserFromStorage()
    setLoading(false)
  },[setUser])

  if (loading) return <></>

  return (
    <div className='App'>
        <BrowserRouter>
          <Navbar/>
          <div className='pageContainer'>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/signup' element={!user ? <Signup/> : <Navigate to={"/"}/>}></Route>
            <Route path='/login' element={!user ? <Login/> : <Navigate to={"/"}/>}></Route>
            <Route path='/dashboard' element={user ? <Dashboard/> : <Navigate to={"/"}/>}></Route>
            <Route path='/password' element={user ? <ChangePassword/> : <Navigate to={"/"}/>}></Route>
          </Routes>
          </div>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
