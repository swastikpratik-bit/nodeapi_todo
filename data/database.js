import mongoose from "mongoose";

export const connectToDB = () => {
    mongoose
        .connect(process.env.MONGO)
        .then((it) => console.log(`Database Connected with HOST : ${it.connection.host}`))
        .catch((e) => console.log(e));
};