import React, { useEffect } from 'react';
// import './App.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './font-awesome-4.7.0/css/font-awesome.min.css'; // Import Font Awesome CSS
import AOS from 'aos'; // Import AOS library
import 'aos/dist/aos.css'; // Import AOS CSS
import logo from './img/logo.png'; // Import your logo image
import bgImage from './img/bg.jpg'; // Import background image
import googleLogo from './img/google_logo.png'; // Import Google logo image
import featureAi from './img/feature-A1.png';
import clock from './img/clock.png';
import multiple from './img/multiple.png';
import contact from './img/contact-bk.jpg';
import hindiDemo from './img/hindi_demo.png';
import aiDemo from './img/ai_demo.png';
import './css/aos.css';
import './css/bootstrap.min.css';
import './css/custom.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';

const Home = () => {
    const useData = JSON.parse(localStorage.getItem('userData'));
    const navigate = useNavigate();
    useEffect(() => {
        AOS.init();
    }, []);

    const handleOnSuccess = (response) => {
        console.log(response);
        const accessToken = response?.access_token;
        if (!accessToken) {
            return;
        }
        console.log(accessToken);
        fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                const email = data?.email;
                const firstName = data?.given_name;
                const lastName = data?.family_name;
                fetch('https://admin.shozim.com/api/login', {
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
                    })
                    .catch((error) => {
                        console.error('Error fetching API data:', error);
                    });
            });
        // if (idToken) {
        //     const email = decodeToken?.email;
        //     const firstName = decodeToken?.given_name;
        //     const lastName = decodeToken?.family_name;
        //     console.log(email, firstName, lastName);
        //     fetch('http://admin.shozim.com/llmware/login', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             email,
        //             firstName,
        //             lastName,
        //         }),
        //     })
        //         .then((response) => response.json())
        //         .then((data) => {
        //             console.log(data);
        //             // const receivedData = JSON.parse(data);
        //             localStorage.setItem('userData', JSON.stringify(data));
        //             console.log(
        //                 JSON.parse(localStorage.getItem('userData'))?.name
        //             );
        //             let fullName = JSON.parse(
        //                 localStorage.getItem('userData')
        //             )?.name;
        //             navigate('/courses');
        //         })
        //         .catch((error) => {
        //             console.error('Error fetching API data:', error);
        //         });
        // } else {
        //     console.log('no');
        // }
    };

    const handleOnFailure = (response) => {
        console.log(response);
        // alert(response);
    };

    const loginClick = useGoogleLogin({
        onSuccess: handleOnSuccess,
        onError: handleOnFailure,
    });

    return (
        <div>
            {/* banner */}
            <div
                className="jumbotron jumbotron-fluid"
                id="banner"
                style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="container text-center text-md-left">
                    <header>
                        <div className="row justify-content-between">
                            <div className="col-2">
                                <img src={logo} alt="logo" />
                            </div>
                        </div>
                    </header>
                    <h1
                        data-aos="fade"
                        data-aos-easing="linear"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        className="display-3 text-white font-weight-bold my-5">
                        Personal AI Tutor
                        <br />
                        For K12 Students
                    </h1>
                    <p
                        data-aos="fade"
                        data-aos-easing="linear"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        className="lead text-white my-4">
                        Interact just like you do with your favourite teacher
                        <br />
                        and ask all your doubts to get instant solutions.
                    </p>
                    <a
                        href="https://youtu.be/Ae8neQvNSXI"
                        target="_blank"
                        data-aos="fade"
                        data-aos-easing="linear"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        className="btn my-4 font-weight-bold atlas-cta cta-green">
                        View Demo
                    </a>

                    {JSON.parse(localStorage.getItem('userData'))?.success ? (
                        <Link
                            to="/courses"
                            data-aos="fade"
                            data-aos-easing="linear"
                            data-aos-duration="1000"
                            data-aos-once="true"
                            className="btn ms-1 my-4 font-weight-bold atlas-cta cta-green">
                            Start Now
                        </Link>
                    ) : (
                        <a
                            // href=""
                            data-aos="fade"
                            data-aos-easing="linear"
                            data-aos-duration="1000"
                            data-aos-once="true"
                            className="btn ms-1 my-4 font-weight-bold atlas-cta cta-green"
                            onClick={() => loginClick()}>
                            <img
                                src={googleLogo}
                                width="20px"
                                display="inline"
                            />
                            {'   '}
                            Start Now
                        </a>
                    )}
                </div>
            </div>
            {/* three-block */}
            {/* Add the rest of your HTML code here */}

            <div className="container my-5 py-2">
                <h2 className="text-center font-weight-bold my-5">
                    Never Stop Your Learning Journey
                </h2>
                <div className="row">
                    <div
                        data-aos="fade-up"
                        data-aos-delay="0"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        className="col-md-4 text-center">
                        <img
                            src={featureAi}
                            alt="Anti-spam"
                            className="mx-auto"
                        />
                        <h4>Ask All You Wish</h4>
                        <p>No hesitation and no shyness.</p>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        className="col-md-4 text-center">
                        <img
                            src={clock}
                            alt="Phishing Detect"
                            className="mx-auto"
                        />
                        <h4>24 Hours</h4>
                        <p>There is no Fixed Time</p>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-delay="400"
                        data-aos-duration="1000"
                        data-aos-once="true"
                        className="col-md-4 text-center">
                        <img
                            src={multiple}
                            alt="Smart Scan"
                            className="mx-auto"
                        />
                        <h4>Unlimited Questions</h4>
                        <p>Keep asking till your doubts are Clear</p>
                    </div>
                </div>
            </div>

            <div
                className="jumbotron jumbotron-fluid feature"
                id="feature-first">
                <div className="container my-5">
                    <div className="row justify-content-between text-center text-md-left">
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-once="true"
                            className="col-md-6">
                            <h2 className="font-weight-bold">
                                Meet your Teacher
                            </h2>
                            <p className="my-4">
                                You will love to interact with them and get a
                                new experience of learning,
                                <br /> where you find no one to judge you for
                                your silly questions.
                            </p>
                            <a
                                onClick={() => {
                                    if (useData) {
                                        navigate('/courses');
                                    } else {
                                        loginClick();
                                    }
                                }}
                                className="btn my-4 font-weight-bold atlas-cta cta-blue text-white">
                                Start Now
                            </a>
                        </div>
                        <div
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            data-aos-once="true"
                            className="col-md-6 align-self-center">
                            <img
                                src={aiDemo}
                                alt="Take a look inside"
                                className="mx-auto d-block"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="jumbotron jumbotron-fluid feature"
                id="feature-first">
                <div className="container">
                    <div className="row justify-content-between text-center text-md-left">
                        <div
                            data-aos="fade-left"
                            data-aos-duration="1000"
                            data-aos-once="true"
                            className="col-md-6 flex-md-last">
                            <h2 className="font-weight-bold">
                                Your Favourite Subjects
                            </h2>
                            <p className="my-4">
                                There is a teacher for all your favourite
                                subjects,
                                <br /> who will help you to attain confidence in
                                them.
                            </p>
                            <a
                                onClick={() => {
                                    if (useData) {
                                        navigate('/courses');
                                    } else {
                                        loginClick();
                                    }
                                }}
                                className="btn my-4 font-weight-bold atlas-cta cta-blue text-white">
                                Join Now
                            </a>
                        </div>
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            data-aos-once="true"
                            className="col-md-6 align-self-center flex-md-first">
                            <img
                                src={hindiDemo}
                                alt="Safe and reliable"
                                className="mx-auto d-block"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="jumbotron jumbotron-fluid"
                id="contact"
                style={{ backgroundImage: `url(${contact})` }}>
                <div className="container my-5">
                    <div className="row justify-content-between">
                        <div className="col-md-6 text-white">
                            <h2 className="font-weight-bold">Contact Us</h2>
                            <p className="my-4">
                                Would love to hear your Thoughts and Ideas.
                            </p>
                            <ul className="list-unstyled">
                                <li>support@shozim.com</li>
                                <li>Bangalore, India</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="jumbotron jumbotron-fluid" id="copyright">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-md-6 text-white align-self-center text-center text-md-left my-2">
                            Copyright © 2024 Shozim.com
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
