const router = require('express').Router();
const { 
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
    } = require('../../controllers/user-controller');

//GET and POST routes 
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

//GET one, PUT and DELETE routes
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//add friend
// router
//     .route('/:userId/friends')
    

//remove friend
router
    .route('/:userId/friends/:friendId')
    .delete(removeFriend)
    .post(addFriend);

module.exports = router;