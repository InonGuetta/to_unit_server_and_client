import userModel from '../models/usersModel.js';

export async function createUser(req, res) {
    try {
        const createNewUser = req.body;

        if (!createNewUser || Object.keys.length === 0) {
            res.status(400).send({ message: "input invalid" })
        }

        const createUser = new userModel(createNewUser);
        await createUser.save()

        res.status(200).send({ message: "new user created", user: createUser })
        return
    } catch (e) {
        res.status(500).send({ message: "the added not working", error: e.message })
    }
}

export async function getAllUser(req, res) {
    try {
        const allUsersInfo = await userModel.find({})
        res.status(200).send({ message: "get all data succssefuly", user: allUsersInfo })
        return allUsersInfo
    } catch (e) {
        res.status(500).send({ message: 'get all data failed' })
    }
}

export async function getOneUser(req, res) {
    try {
        const { emailUserId } = req.params;

        const oneUserInfo = await userModel.findOne({ emailUserId: emailUserId });
        if (!oneUserInfo) {
            return res.status(404).send({ message: "user not found" });
        }
        return res.status(200).send(oneUserInfo)
    } catch (e) {
        res.status(500).send({ message: 'get one user failed' })
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        if (id.length === 0) {
            return res.status(400).send({ message: "id its empty" })
        }
        const deleteOneUser = await userModel.findOneAndDelete({ _id: id })
        if (!deleteOneUser) {
            return res.status(404).send({ message: "id its not found" })
        }
        res.status(200).send({ message: "the user deleted" })

    } catch (e) {
        console.log("delete");
        res.status(500).send({ message: "deleted failed" })
    }

}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { userFirstName, userLastName, password, emailUserId } = req.body;

        const userInfo = await userModel.findOne({ _id: id });
        if (!userInfo) return res.status(404).send({ message: 'not found' });

        if (userFirstName !== undefined) userInfo.userFirstName = userFirstName;
        if (userLastName !== undefined) userInfo.userLastName = userLastName;
        if (password !== undefined) userInfo.password = password;
        if (emailUserId !== undefined) userInfo.emailUserId = emailUserId;

        await userInfo.save()
        return res.status(200).send({ message: "update success", newUser: userInfo, })

    } catch (e) {
        return res.status(500).send({ message: "update failed", err: e.message })
    }
}