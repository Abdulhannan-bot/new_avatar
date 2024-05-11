// import React, { forwardRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Login from './Login';
// import './Navbar.css';
// import logo from './shozim.png';

// const Navbar = forwardRef((props, ref) => {
//     const location = useLocation();

//     if (location.pathname === '/login') {
//         return null;
//     }

//     return (
//         <nav className="navbar">
//             <div className="container-fluid d-flex flex-row justify-content-between align-items-center navbar-extras">
//                 {/* Company Logo */}
//                 <Link to="/" className="navbar-brand">
//                     <img
//                         src={logo}
//                         alt="Company Logo"
//                         className="logo-img"
//                         style={{ width: '3.5rem' }}
//                     />
//                 </Link>
//                 {/* Nav Links */}
//                 <ul className="navbar-nav-react d-flex flex-row align-items-center">
//                     <li className="nav-item-react">
//                         <Link to="/courses" className="nav-link-react">
//                             Courses
//                         </Link>
//                     </li>
//                     <li className="nav-item-react">
//                         <Link to="" className="nav-link-react">
//                             Logout
//                         </Link>
//                     </li>
//                 </ul>
//             </div>
//         </nav>
//     );
// });

// export default Navbar;

import React, { forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import './Navbar.css';
import logo from './shozim.png';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = forwardRef((props, ref) => {
    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === '/login') {
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/');
    };

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light">
            <div className="container-fluid">
                {/* Company Logo */}
                <Link to="/" className="navbar-brand">
                    <img
                        src={logo}
                        alt="Company Logo"
                        className="logo-img"
                        style={{ width: '3rem' }}
                    />
                </Link>
                <button
                    className="navbar-toggler align-self-center"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* Nav Links */}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link
                                to="/courses"
                                className="nav-link font-weight-bold">
                                Courses
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a
                                onClick={() => {
                                    handleLogout();
                                }}
                                className="nav-link font-weight-bold">
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
});

export default Navbar;
