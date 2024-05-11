import React from 'react';
import {
    BrowserRouter,
    RouterProvider,
    Route,
    Link,
    Routes,
} from 'react-router-dom';
import Courses from './Courses';
import App from './App';
import Login from './Login';
import Navbar from './Navbar';
import Home from './Home';

export default function UrlRoutes() {
    return (
        <BrowserRouter>
            {/* <Navbar /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/teacher/:subject" element={<App />} />
            </Routes>
        </BrowserRouter>
    );
}
