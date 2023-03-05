import User from "../models/user.model.js"
import createError from "../utils/createError.js";
import Gig from "../models/Gig.model.js";
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (req.userId !== user._id.toString()) {
            return next(createError(403, "You can delete only your account!"));
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "User has been deleted." });
    } catch (e) {
        next(e)
    }

}
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        // if (!user) return next(createError(404, 'User not found!'))
        res.status(200).json(user);

    } catch (e) {
        next(e)
    }

}
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        // if (!users) return next(createError(404, 'User not found!'))
        res.status(200).send(users);

    } catch (e) {
        next(e)
    }

}