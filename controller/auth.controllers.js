import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from '../models/usersModel.js';

function signToken(userId) {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES || "1h"
    });
}

export async function register(req, res) {
    try {
        const { emailUserId, password, userFirstName, userLastName } = req.body;

        if (!emailUserId || !password || !userFirstName || !userLastName) {
            return res.status(400).send({ message: "all fields required required" });
        }

        const exists = await userModel.findOne({ emailUserId });
        if (exists) return res.status(409).send({ message: "email already in use" });

        const hashPassword = await bcrypt.hash(password, 12);
        const createUser = await userModel.create({
            emailUserId,
            password: hashPassword,
            userFirstName,
            userLastName
        })
        // this code not equal to prev code 
        // const createUser = createUser(req, res)

        const token = signToken(createUser._id);
        res.status(201).send({
            message: "registerd",
            token,
            createUser: {
                _id: createUser._id,
                emailUserId: createUser.emailUserId,
                password: createUser.password,
                userFirstName: createUser.userFirstName,
                userLastName: createUser.userLastName
            }
        });
        console.log(hashPassword);
        console.log(token);
        return;
    } catch (e) {
        res.status(500).send({ message: "register failed", error: e.message })
    }
}



export async function login(req, res) {
    try {
        const { emailUserId, password } = req.body;
        if (!emailUserId || !password) {
            return res.status(400).send({ message: "all fields required" })
        }
        res.status(200).send({message:"login successed"})
    } catch (e) {
        res.status(500).send({ message: "login failed", error: e.message })
    }
}