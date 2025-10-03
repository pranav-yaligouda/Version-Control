import User from '../models/user.model.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({message: 'User Created Successfully', user});
    }
    catch (error) {
        res.status(500).json({message: 'Internal Server Error', error: error.message});
    }
}