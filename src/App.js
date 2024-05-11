import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState, useRef } from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, {
    useSpeechRecognition,
} from 'react-speech-recognition';
import Speech from 'react-speech';
import { useSpeechSynthesis } from 'react-speech-kit';
import {
    FaMicrophone,
    FaPaperPlane,
    FaMicrophoneAltSlash,
} from 'react-icons/fa';
import Navbar from './Navbar';
import { SERVER_URL, API_KEY } from './utils';
import { useNavigate, useParams } from 'react-router-dom';
import teacher from './substitute_teacher.png';

function App() {
    const navigate = useNavigate();
    const subjectsArray = [
        'english',
        'hindi',
        // 'mathematics',
        // 'science',
        'social_science',
    ];
    const { subject } = useParams();
    if (!subjectsArray.includes(subject)) {
        // console.log(subject);
        navigate('/courses');
    }
    let langCode = '';
    if (subject === 'hindi') {
        langCode = 'hi-IN';
    } else {
        langCode = 'en-GB';
    }

    // const voice = speechSynthesis.getVoices();
    const voice = speechSynthesis
        .getVoices()
        .find((voice) => voice.lang === langCode);

    const [sessionInfo, setSessionInfo] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);
    const [mediaCanPlay, setMediaCanPlay] = useState(false);
    const [renderID, setRenderID] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);
    const [timeoutId, setTimeoutId] = useState(null);

    const textInputRef = useRef(null);
    const messagesRef = useRef(null);
    const inactivityTimeoutRef = useRef(null);
    const userInfo = JSON.parse(localStorage.getItem('userData'))?.success;

    useEffect(() => {
        if (!userInfo) {
            // localStorage.removeItem('userData');
            navigate('/');
        } else {
            scrollToBottom();
        }
    }, []);

    const { speak, speaking } = useSpeechSynthesis();

    const {
        transcript,
        listening,
        start,
        stop,
        resetTranscript,
        finalTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({
        recognitionOptions: { lang: 'hi-IN' }, // Specify the language here
    });

    useEffect(() => {
        const fetchData = async () => {
            scrollToBottom();
        };

        fetchData();
    }, [messages, inputValue]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         scrollToBottom();
    //     };

    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     textInputRef.current.value = transcript;
    // }, [transcript]);

    useEffect(() => {
        console.log(`speaking - ${speaking}`);
        if (speaking) {
            console.log('yes speaking');
            resetTranscript();
            setInputValue('');
            // SpeechRecognition.stopListening();
            return;
        }
        if (finalTranscript && !speaking) {
            console.log('here');

            clearTimeout(timeoutId); // Clear any existing timeouts
            // SpeechRecognition.stopListening();
            // Set a timeout to wait for silence before generating task
            const id = setTimeout(() => {
                // generateTask(transcript);
                appendElement('user', finalTranscript);
                fetchResults(finalTranscript);
                resetTranscript();
                setInputValue('');
            }, 2000); // Wait for 2 seconds of silence

            setTimeoutId(id);
        }
        if (transcript) {
            console.log('there');
            if (!speaking) {
                setInputValue(transcript);
                console.log('not speaking');
            } else {
            }
        }
    }, [transcript, finalTranscript]);

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    function scrollToBottom() {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        console.log(messagesRef.current.scrollHeight);
    }

    function fetchResults(input) {
        if (input.trim() === '' || input.length === 0) {
            return;
        }
        // console.log(speak());
        setInputValue('');
        console.log('hello there sending');
        fetch('https://admin.shozim.com/api/open_ai_chain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: input,
                subject: subject,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const content = data.response;
                console.log(content, 'hi there');
                appendElement('system', content);

                speak({
                    text: content,
                    voice: voice,
                });
                scrollToBottom();
                // SpeechRecognition.startListening();
            })
            .catch((error) => {
                console.error('Error fetching API data:', error);
            });
        // setInputValue('');
    }

    function appendElement(type, content) {
        setMessages((prev) => [...prev, { type, content }]);
        // scrollToBottom();
    }

    return (
        <>
            <style>
                {`
                body {
                    background: url('https://i.etsystatic.com/36627193/r/il/e8bfa9/5159042744/il_fullxfull.5159042744_6gdy.jpg');
                   
                }
                `}
            </style>
            <div className="container-fluid">
                <Navbar />

                <div className="row" style={{ overflow: 'hidden' }}>
                    <div className="col-lg-6 d-lg-block d-none w-50">
                        <div className="videoSectionWrap">
                            <img
                                src={teacher}
                                style={{ objectFit: 'cover' }}></img>
                        </div>
                    </div>
                    <div
                        className="col-lg-6 col-12 bg-image d-block w-50 section2"
                        style={{ position: 'relative' }}>
                        <div
                            className="messages  overflow-scroll "
                            ref={messagesRef}>
                            {messages &&
                                messages.map((x, index) => (
                                    <div
                                        key={index}
                                        className={`message ${x.type}`}>
                                        {x.content}
                                    </div>
                                ))}
                        </div>
                        {/* <div className="d-block mb-2 mb-md-2 mb-lg-2"></div> */}
                        <div
                            className="input-container"
                            style={{
                                backgroundColor: 'white',
                                padding: 0,
                                // position: 'absolute',
                                // right: 0,
                                // left: 0,
                                // bottom: 0,
                            }}>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Type your message..."
                                ref={textInputRef}
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        appendElement('user', inputValue);

                                        fetchResults(inputValue);
                                    }
                                }}
                                // value={transcript}
                            />
                            <div className="inpuut-items">
                                <button
                                    style={{
                                        backgroundColor: 'inherit',
                                        color: 'red',
                                        padding: '5px',
                                    }}
                                    className="record-btn">
                                    {!listening ? (
                                        <FaMicrophoneAltSlash
                                            onClick={() => {
                                                SpeechRecognition.startListening(
                                                    {
                                                        continuous: true,
                                                        language: langCode,
                                                    }
                                                );
                                            }}
                                        />
                                    ) : (
                                        <FaMicrophone
                                            onClick={() => {
                                                SpeechRecognition.stopListening();
                                            }}
                                        />
                                    )}
                                </button>
                                <button
                                    style={{
                                        backgroundColor: 'rgb(69, 141, 244)',
                                        color: 'white',
                                        padding: '10px',
                                        borderRadius: 0,
                                        height: '100%',
                                    }}
                                    onClick={() => {
                                        appendElement('user', inputValue);
                                        scrollToBottom();
                                        fetchResults(inputValue);
                                    }}>
                                    <FaPaperPlane style={{ margin: 0 }} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        // <>
        //     <div className="container-fluid">
        //         <Navbar />
        //         <div className="row">
        //             <div className="col-lg-6">
        //                 <div className="videoSectionWrap">
        //                     <img src={teacher} alt="Teacher" />
        //                 </div>
        //             </div>
        //             <div className="col-lg-6">
        //                 <div className="messages">
        //                     <div className="messages" ref={messagesRef}>
        //                         {messages &&
        //                             messages.map((x, index) => (
        //                                 <div
        //                                     key={index}
        //                                     className={`message ${x.type}`}>
        //                                     {x.content}
        //                                 </div>
        //                             ))}
        //                     </div>
        //                 </div>
        //                 <div className="input-container">
        //                     <input
        //                         type="text"
        //                         className="input-field"
        //                         placeholder="Type your message..."
        //                         ref={textInputRef}
        //                         value={inputValue}
        //                         onChange={(e) => {
        //                             setInputValue(e.target.value);
        //                         }}
        //                         onKeyDown={(e) => {
        //                             if (e.key === 'Enter') {
        //                                 e.preventDefault();
        //                                 appendElement('user', inputValue);
        //                                 fetchResults(inputValue);
        //                             }
        //                         }}
        //                     />
        //                     <div className="input-items">
        //                         <button
        //                             className="record-btn"
        //                             onClick={() => {
        //                                 if (!listening) {
        //                                     SpeechRecognition.startListening({
        //                                         continuous: true,
        //                                         language: langCode,
        //                                     });
        //                                 } else {
        //                                     SpeechRecognition.stopListening();
        //                                 }
        //                             }}>
        //                             {!listening ? (
        //                                 <FaMicrophoneAltSlash />
        //                             ) : (
        //                                 <FaMicrophone />
        //                             )}
        //                         </button>
        //                         <button
        //                             className="send-btn"
        //                             onClick={() => {
        //                                 appendElement('user', inputValue);
        //                                 fetchResults(inputValue);
        //                             }}>
        //                             <FaPaperPlane />
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
    );
}

export default App;
