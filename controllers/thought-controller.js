const { User, Thought } = require('../models');

const ThoughtController = {
    //add thought to user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                // console.log(_id)
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id }},
                    { new: true }
                );
            })
            .then(dbUserdata => {
                if (!dbUserdata) {
                    res.status(404).json({ message: 'no user with this id found!' });
                    return;
                }
                res.json(dbUserdata);
            })
            .catch(err => res.json(err));
    },

    //remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtsId })
            .then(deleteThought => {
                if (!deleteThought) {
                    return res.status(404).json({ message: 'no thought with this id' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtsId }},
                    { new: true }
                );
            })
            .then(dbUserdata => {
                if (!dbUserdata) {
                    res.status(404).json({ message: 'no user with this id found!' });
                    return;
                }
                res.json(dbUserdata);
            })
            .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;