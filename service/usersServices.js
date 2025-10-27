import userModel from "../models/usersModel.js";

export async function validExsitUserService(emailUserId) {
    const exists = await userModel.findOne({ emailUserId });
    if (exists) return true;
    return false;
}

export async function createOneUserService(data) {
    try {
        if (!data || Object.keys(data).length === 0 || await validExsitUserService(data.emailUserId)) {
            return null;
        }

        const insertDbOneUser = new userModel(data);
        return insertDbOneUser.save()
    } catch (e) {
        console.error("Error create user", e.message);
        throw e;
    }
}

export async function getAllUsersService() {
    try {
        const allUsersInfo = await userModel.find({})
        if (!allUsersInfo) {
            return null;
        }
        return allUsersInfo
    } catch (e) {
        console.error("Error fetching user", e.message);
        throw e;
    }
}

export async function getOneUserService(emailUserId) {
    try {
        const oneUserInfo = await userModel.findOne({ emailUserId })
        if (!oneUserInfo) {
            return null
        }
        return oneUserInfo
    } catch (e) {
        console.error("Error fetching user", e.message);
        throw e;
    }
}

export async function deleteUserService(userId) {
    try {
        const deleteOneUser = await userModel.findOneAndDelete({ userId })
        if (!deleteOneUser) {
            return null
        }
        return deleteOneUser
    } catch (e) {
        console.error("Error delete user", e.message);
        throw e;
    }
}

export async function updateUserService(userId, data) {
    try {
        const onePostInfoToUpdate = await userModel.findOne({ userId })
        if (!onePostInfoToUpdate) {
            return null
        }
        const exist = await userModel.findOne({ emailUserId: data.emailUserId })
        if (exist) return "email already exist";

        const toUpdate = {}
        if (data.userFirstName !== undefined) toUpdate.userFirstName = data.userFirstName;
        if (data.userLastName !== undefined) toUpdate.userLastName = data.userLastName;
        if (data.emailUserId !== undefined) toUpdate.emailUserId = data.emailUserId;

        onePostInfoToUpdate.set(toUpdate)
        await onePostInfoToUpdate.save()
        return onePostInfoToUpdate
    } catch (e) {
        console.error("Error update user", e.message);
        throw e;
    }
}