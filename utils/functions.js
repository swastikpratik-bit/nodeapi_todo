import jwt from "jsonwebtoken";
export const sendCookie = (user, res, message, statusCode = 200) => {

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
        .json({
            success: true,
            message
        });
};