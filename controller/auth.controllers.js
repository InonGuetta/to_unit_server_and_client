import { validExsitUserService, createOneUserService, getOneUserService } from "../service/usersServices.js";
import { hashPasswordService, signTokenService, compearePassService } from "../service/authServices.js";


export async function register(req, res) {
        try {
        const { emailUserId, password, userFirstName, userLastName } = req.body;

        if (!emailUserId || !password || !userFirstName || !userLastName) {
            return res.status(400).send({ message: "all fields required" });
        }
 
        if (await validExsitUserService(emailUserId)) {
            res.status(409).send({ message: "email already in use" })
        }
        const new_pass = await hashPasswordService(req.body.password);
        req.body.password = new_pass

        const createUser = await createOneUserService(req.body)

        const token = signTokenService(createUser._id);
        res.status(201).send({
            message: "registerd",
            token: token,
            createUser: {
                _id: createUser._id,
                emailUserId: createUser.emailUserId,
                password: createUser.password,
                userFirstName: createUser.userFirstName,
                userLastName: createUser.userLastName
            }
        });
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

        const userInfo = await getOneUserService(emailUserId);
        const validateDetails = await compearePassService(password, userInfo.password)
        if (validateDetails) {
            const token = signTokenService(userInfo._id)
            res.status(200).send({ message: "login successed", token: token })
        } else {
            res.status(401).send({ message: "The username and password are incorrect" })
        }
    } catch (e) {
        res.status(500).send({ message: "login failed", error: e.message })
    }
}