const { User } = require('../models');

const UserController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserdata => res.json(dbUserdata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .then(dbUserdata => {
                if (!dbUserdata) {
                    res.status(404).json({ message: 'no user with this id found!' });
                    return;
                }
                res.json(dbUserdata);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserdata => res.json(dbUserdata))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //update a user
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true })
            .then(dbUserdata => {
                if (!dbUserdata) {
                    res.status(404).json({ message: 'no user with this id found!' });
                    return;
                }
                res.json(dbUserdata);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserdata => {
                if (!dbUserdata) {
                    res.status(404).json({ message: 'no user with this id found!' });
                    return;
                }
                res.json(dbUserdata);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
};

module.exports = UserController;