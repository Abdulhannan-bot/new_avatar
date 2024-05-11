import React, { useState, useEffect } from 'react';
import './Courses.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userData'))?.success;

    useEffect(() => {
        if (!userInfo) {
            // localStorage.removeItem('userData');
            navigate('/');
        }
    }, []);

    const items = [
        {
            image: './English.png',
            title: 'English',
            id: 'english',
        },
        {
            image: './Hindi.png',
            title: 'Hindi',
            id: 'hindi',
        },

        {
            image: './Social.png',
            title: 'Social Science',
            id: 'social_science',
        },
    ];
    return (
        <>
            <style>
                {`
                body {
                    background-color: rgb(235 238 239);
                }
            `}
            </style>

            <div className="container-fluid container1">
                <Navbar />
                <div className="courses-container">
                    <div className="grid-container">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="grid-item"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    navigate(`/teacher/${item.id}`);
                                }}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="grid-image"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                {/* <div className="courses-container">
                <div className="row p-5">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="col-lg-4 col-md-6 col-sm-12 g-4"
                            style={{
                                cursor: 'pointer',
                                height: '30rem',
                                width: '20rem',
                            }}
                            onClick={() => {
                                navigate(`/teacher/${item.id}`);
                            }}>
                            <div className="card h-100">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="card-img-top"
                                    style={{
                                        objectFit: 'cover',
                                        height: '100%',
                                        width: '100%',
                                    }}
                                />
                                <div className="card-body">
                                    <h3 className="card-title text-center">
                                        {item.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            </div>
        </>
    );
};

export default Courses;
