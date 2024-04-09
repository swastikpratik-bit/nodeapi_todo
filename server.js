import {app}  from "./app.js";
import { connectToDB } from "./data/database.js";

connectToDB();

app.listen(process.env.PORT, () => {
    console.log("Server is working ....");
});
