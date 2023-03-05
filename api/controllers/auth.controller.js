import User from "../models/user.model.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
export const registerUser = async (req, res, next) => {
    try {
        const newUser = new User({
            ...req.body,
            password :
                CryptoJS.AES.encrypt(
                    req.body.password,
                    process.env.PASS_SEC
                ).toString()
        });

        await newUser.save();

        res.status(201).send({message: "User has been created."});
    } catch (err) {
        next(err);
    }
}
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) return next(createError(404, "User not found!"));

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const validPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if (!validPassword) return next(createError(400, "Wrong password or username!!"))

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller,
        }, process.env.JWT);

        const { password, ...others } = user._doc;

        user && res.cookie("access_token", token, {
            httpOnly: true
        })
        .status(200).send(others);

    } catch (e) {
        next(e);
    }
};
export const logout = (req, res) => {
    res.clearCookie("access_token", {
        secure: true,
        sameSite: "none"
    }).status(200).send("User has been logged out.");
}