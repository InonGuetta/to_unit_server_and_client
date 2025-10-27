import express from 'express';
import {
    createUser,
    getAllUser,
    getOneUser,
    deleteUser,
    updateUser
} from '../controller/controllersUsers.js';
const routerUsers = express.Router();

routerUsers.post('/create-user', createUser);
routerUsers.get('/get-all-user', getAllUser);
routerUsers.get('/get-one-user/:emailUserId', getOneUser);
routerUsers.delete('/delete-user/:id', deleteUser);
routerUsers.patch('/update-user/:id', updateUser);

export default routerUsers;