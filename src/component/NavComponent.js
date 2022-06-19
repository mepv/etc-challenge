import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AuthService from '../service/AuthService';
import SignupComponent from './SignupComponent';
import HomeComponent from './HomeComponent';
import LoginComponent from './LoginComponent';
import VehicleComponent from './VehicleComponent';

function NavComponent() {
    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
      const user = AuthService.getCurrentUser();
  
      if (user) {
        setCurrentUser(user);
      }
    }, []);
  
    const logOut = () => {
      AuthService.logout();
    };
  
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Home
              </Link>
            </li>
  
            {currentUser && (
              <li className="nav-item">
                <Link to={"/vehicles"} className="nav-link">
                  Vehicles
                </Link>
              </li>
            )}
          </div>
  
          {currentUser ? (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
  
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </div>
          )}
        </nav>
  
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/vehicles" element={<VehicleComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
          </Routes>
        </div>
      </div>
    );
  }

export default NavComponent;