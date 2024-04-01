import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () => {
    const [email, setEmail] = useState('');
    const [descriptors, setDescriptors] = useState([]);
    const [error, setError] = useState(null);
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const navigate = useNavigate();


    const loadModels = async () => {
        try {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
            await faceapi.nets.faceRecognitionNet.loadFromUri('/models')
            await faceapi.nets.faceExpressionNet.loadFromUri('/models')
            // console.log('model loaded')
        } catch (e) {
            console.log('error: ', e);
        }
    };
    useEffect(() => {
        loadModels();
    }, []);

    const detectFaces = async () => {
        const image = webcamRef.current.getScreenshot();
        setImageSrc(image)
        const input = document.getElementById('myImg')
        const detections = await faceapi.detectAllFaces(input, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();

        if (detections.length === 0) {
            setImageSrc(null)
            alert("Please click the picture again")
            setDescriptors([])
        }
        else {
            // console.log(detections[0].descriptor)
            setDescriptors(detections[0].descriptor)
        }
    };

    const submitHandler = async (e) => {
        setError(null)
        e.preventDefault();
        alert('Checking credentials')
        if (descriptors.length === 0) {
            alert('please capture your face');
            return;
        }
        const inputs = {
            email,
            descriptors: Object.values(descriptors)
        }
        try {
            //api call
            const res = await axios.post(`http://localhost:9000/api/user/login`, inputs);
            localStorage.setItem("user", JSON.stringify(res.data));
            navigate('/');
        } catch (e) {
            setError(e.response.data)
        }
    }
    return (
        <div className='register'>
            <div style={{ display: 'flex', flexDirection: "column" }} >
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={300}
                    height={300}
                    className='webcam'
                />
                <button style={{ width: "100%", backgroundColor: "white", color: "blue", marginTop: '10px' }} onClick={detectFaces}>Capture</button>
            </div>
            <div className='container'>
                <form className='form' onSubmit={submitHandler}>
                    <div className='heading'>
                        <span className='span'>Login</span>
                        <div className='text'>Please Enter your details to login.</div>
                    </div>
                    <input className='input1' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <img id="myImg" className='img' src={imageSrc} style={{ display: `${imageSrc ? 'block' : 'none'}` }} alt="" />
                    <button type='submit' style={{ display: `${descriptors.length > 0 ? 'block' : 'none'}` }}>Login</button>
                    {error && <p className='error'>{error} !</p>}
                    <div>Don't have an account ? <Link className='link' to={'/register'}>Sign Up</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Login