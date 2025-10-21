// import postModel from '../DAL/postModel.js';
// import userModel from '../DAL/usersModel.js';

// // challengs 
// // how combaine bettwen Email User to Post  
// export function addLike(req, res) {
//     const postToAddLike = postModel.findOne({ _id: req.params._id });
//     if (!postToAddLike) {
//         res.status(404).send({ message: "post not exist/find" })
//     }

//     const emailAddresUser = userModel.findOne({ emailUserId: req. })
//     // out property likes from postObj to add emailAddresUser
//     const arrayLikesToAdd = postToAddLike.likes;
//     arrayLikesToAdd.push(emailAddresUser)
//     // need use update method
//     const addLikeByEmailUser = req.body;
// }