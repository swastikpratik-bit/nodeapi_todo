import mongoose from "mongoose";

export const connectToDB = () => {
    mongoose
        .connect(process.env.MONGO)
        .then(() => console.log("Database Connected"))
        .catch((e) => console.log(e));
};