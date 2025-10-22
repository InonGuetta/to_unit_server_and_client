import userModel from '../models/usersModel.js';
import {
    createOneUserService,
    getAllUsersService,
    getOneUserService,
    deleteUserService,
    updateUserService
} from '../service/usersServices.js';


export async function createUser(req, res) {
    try {
        const createNewUser = await createOneUserService(req.body);

        if (!createNewUser) {
            res.status(400).send({ message: "The input does not meet the required conditions / does not exist" })
        }

        res.status(200).send({ user: createNewUser })
        return
    } catch (e) {
        res.status(500).send({ message: "the added not working", error: e.message })
    }
}

export async function getAllUser(req, res) {
    try {
        const allUsersInfo = await getAllUsersService()
        if(!allUsersInfo){
            res.status(404).send({message:"users not found"})
        }

        res.status(200).send({ message: "get all data succssefuly", user: allUsersInfo })
        return
    } catch (e) {
        res.status(500).send({ message: 'get all data failed' })
    }
}

export async function getOneUser(req, res) {
    try {
        const oneUserInfo = await getOneUserService(req)
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
        const deleteOneUser = await deleteUserService(req)
        if (!deleteOneUser) {
            return res.status(404).send({ message: "id its not found" })
        }
        res.status(200).send({ message: "the user deleted" })

    } catch (e) {
        res.status(500).send({ message: "deleted failed" })
    }
}

// export async function updateUser(req, res) {
//     try {
//         const { id } = req.params;
//         const { userFirstName, userLastName, password, emailUserId } = req.body;

//         const userInfo = await userModel.findOne({ _id: id });
//         if (!userInfo) return res.status(404).send({ message: 'not found' });

//         if (userFirstName !== undefined) userInfo.userFirstName = userFirstName;
//         if (userLastName !== undefined) userInfo.userLastName = userLastName;
//         if (password !== undefined) userInfo.password = password;
//         if (emailUserId !== undefined) userInfo.emailUserId = emailUserId;

//         await userInfo.save()
//         return res.status(200).send({ message: "update success", newUser: userInfo, })

//     } catch (e) {
//         return res.status(500).send({ message: "update failed", err: e.message })
//     }
// }

export async function updateUser(req, res) {
    try {
        const updateOneUser = await updateUserService(req);
        if (updateOneUser === null){
            return res.status(404).send({ message: 'user not found' });
        }

        if(updateOneUser === "email already exist"){
            res.status(409).send({message:"this email already exsist please try other"})
            return
        }
        return res.status(200).send({ message: "update success", newUser: updateOneUser, })
    } catch (e) {
        return res.status(500).send({ message: "update failed", err: e.message })
    }
}
































// export async function updateUser(req, res) {
//   try {
//     const { id } = req.params;
//     const updated = await updateUserService(id, req.body);
//     if (updated === null) return res.status(404).send({ message: 'user not found' });
//     return res.status(200).send({ message: 'update success', newUser: updated });
//   } catch (e) {
//     return res.status(500).send({ message: 'update failed', err: e.message });
//   }
// }
