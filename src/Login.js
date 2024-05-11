import React from 'react';
import {
    GoogleLogin,
    GoogleLogout,
    googleLogout,
    useGoogleLogin,
} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const handleOnSuccess = (response) => {
        const idToken = response?.credential;

        if (idToken) {
            const decodeToken = jwtDecode(idToken);
            const email = decodeToken?.email;
            const firstName = decodeToken?.given_name;
            const lastName = decodeToken?.family_name;
            console.log(email, firstName, lastName);
            fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    firstName,
                    lastName,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    // const receivedData = JSON.parse(data);
                    localStorage.setItem('userData', JSON.stringify(data));
                    console.log(
                        JSON.parse(localStorage.getItem('userData'))?.name
                    );
                    let fullName = JSON.parse(
                        localStorage.getItem('userData')
                    )?.name;
                    navigate('/courses');
                    googleLogout();
                })
                .catch((error) => {
                    console.error('Error fetching API data:', error);
                });
        }
    };

    const handleOnFailure = (response) => {
        console.log(response);
        // alert(response);
    };

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => console.log(tokenResponse),
    });

    return (
        <>
            <Navbar />
            {/* <GoogleOAuthProvider clientId="445275468500-rl506teu7247ijje333f0pclmkpukqj6.apps.googleusercontent.com"> */}
            <div
                className="login-container"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}>
                {/* <GoogleLogin
                    // href=""
                    className="btn ms-1 my-4 font-weight-bold atlas-cta cta-green"
                    onSuccess={handleOnSuccess}
                    onError={handleOnFailure}
                    cookiePolicy="single_host_origin"
                    prompt="select_account"
                /> */}
            </div>
            <button onClick={() => login()} className="text-primary">
                Sign in with Google 🚀
            </button>
            {/* </GoogleOAuthProvider> */}
        </>
    );
};

export default Login;
