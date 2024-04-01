const User = require('../Model/userModel')
const faceapi = require('face-api.js');
// const model=require('../models')


const Register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) return res.status(409).json("user already exist !");
        // console.log(first)
        await User.create({
            email: req.body.email,
            name: req.body.name,
            descriptor: req.body.descriptors
        })
        res.status(200).json("Registered Successfully");

    } catch (e) {
        console.log(e)
    }
}
const Login = async (req, res) => {
    try {
        if (!req.body.email) {
            const users = await User.find();
            for (let i = 0; i < users.length; i++) {
                const distanceThreshold = 0.4; // Adjust as needed
                const descriptor1 = users[i].descriptor, descriptor2 = req.body.descriptors;

                const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
                if (distance <= distanceThreshold) {
                    return res.status(200).json({ user: users[i] })
                }
            }
            return res.status(401).json("Authentication failed !");
        }
        else {
            let user = await User.findOne({ email: req.body.email })
            if (!user) return res.status(404).json("No User with this email !");

            const distanceThreshold = 0.4; // Adjust as needed
            const descriptor1 = user.descriptor, descriptor2 = req.body.descriptors;

            const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
            if (distance <= distanceThreshold) {
                res.status(200).json({ user })
            } else {
                return res.status(401).json("Authentication failed !");
            }
        }

    } catch (e) {
        console.log(e)
    }
}
module.exports = { Register, Login }