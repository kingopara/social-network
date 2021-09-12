const { User, Thought } = require('../models');

const ThoughtController = {
    //add thought to user
    addThought({ params, body }, res) {
        // console.log(body);
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

    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbUserdata => res.json(dbUserdata))
            .catch(err => res.json(err));
    },

    //get single thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
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

    //create a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true }
        )
        .then(dbUserdata => {
            if (!dbUserdata) {
                res.status(404).json({ message: 'no user with this id found!' });
                return;
            }
            res.json(dbUserdata);
        })
        .catch(err => res.json(err));
    },

    //delete a reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionId: params.reactionId }}},
            { new: true }
        )
        .then(dbUserdata => res.json(dbUserdata))
        .catch(err => res.json(err));
    },

    //update thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, { new: true })
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

    //remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deleteThought => {
                if (!deleteThought) {
                    return res.status(404).json({ message: 'no thought with this id' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId }},
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