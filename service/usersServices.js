import userModel from "../models/usersModel.js";


export async function createOneUserService(data) {
    if (!data || Object.keys(data).length === 0) {
        return null;
    }

    const exist = await userModel.findOne({ emailUserId: data.emailUserId })
    if (exist) {
        return "The email entered already exists, so a different email is needed."
    }
    const insertDbOneUser = new userModel(data);
    return insertDbOneUser.save()
}

export async function getAllUsersService() {
    const allUsersInfo = await userModel.find({})
    if (!allUsersInfo) {
        return null;
    }
    return allUsersInfo
}

export async function getOneUserService(req) {
    const oneUserInfo = await userModel.findOne({ emailUserId: req.params.emailUserId })
    if (!oneUserInfo) {
        return null
    }
    return oneUserInfo
}

export async function deleteUserService(req) {
    const deleteOneUser = await userModel.findOneAndDelete({ id: req.params.id })
    if (!deleteOneUser) {
        return null
    }
    return deleteOneUser
}

export async function updateUserService(req) {
    const onePostInfoToUpdate = await userModel.findOne({ _id: req.params.id })
    if (!onePostInfoToUpdate) {
        return null
    }
    const { userFirstName, userLastName, password, emailUserId } = req.body;

    const exist = await userModel.findOne({emailUserId})
    if(exist) return "email already exist";

    if (userFirstName !== undefined) onePostInfoToUpdate.userFirstName = userFirstName;
    if (userLastName !== undefined) onePostInfoToUpdate.userLastName = userLastName;
    if (emailUserId !== undefined) onePostInfoToUpdate.emailUserId = emailUserId;
    if (password !== undefined) onePostInfoToUpdate.password = password;

    await onePostInfoToUpdate.save()
    return onePostInfoToUpdate
}






















// export async function updateUserService(id, body) {
//   const doc = await userModel.findById(id);
//   if (!doc) return null;

//   const { userFirstName, userLastName, password, emailUserId } = body;

//   if (userFirstName !== undefined) doc.userFirstName = userFirstName;
//   if (userLastName  !== undefined) doc.userLastName  = userLastName;
//   if (password      !== undefined) doc.password      = password;
//   if (emailUserId   !== undefined) doc.emailUserId   = emailUserId;

//   await doc.save();
//   return doc;
// }
