import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import './style.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [descriptors, setDescriptors] = useState([]);
    const [error, setError] = useState(null);
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const Navigate = useNavigate();


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
        setError(null)
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
        // console.log(descriptors)
        const inputs = {
            email,
            name,
            descriptors: Object.values(descriptors)
        }
        try {
            await axios.post(`http://localhost:9000/api/user/register`, inputs);
            Navigate('/login');
        } catch (e) {
            console.log(e.response.data)
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
                <button style={{ width: "100%", backgroundColor: "white", color: "blue",marginTop:'10px' }} onClick={detectFaces}>Capture</button>
            </div>
            <div className='container'>
                <form className='form' onSubmit={submitHandler}>
                    <div className='heading'>
                        <span className='span'>Register</span>
                        <div className='text'>Please Enter your details to register.</div>
                    </div>
                    <input className='input1' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required={true} />
                    <input className='input1' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                    <img id="myImg" className='img' src={imageSrc} style={{ display: `${imageSrc ? 'block' : 'none'}` }} alt="" />
                    <button type='submit' style={{ display: `${descriptors.length > 0 ? 'block' : 'none'}` }}>Sign Up</button>
                    {error && <p className='error'>{error} !</p>}
                    <div>Already have an account ? <Link className='link' to={'/login'}>Login</Link></div>
                </form>
            </div>
        </div>
    )
}

export default Login