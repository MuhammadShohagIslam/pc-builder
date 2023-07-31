import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import db from "@/lib/db/db";
import User from "@/models/User";

const router = createRouter();

router.post(async (req, res) => {
    try {
        await db.connectDb();
        const { password, email } = req.body;

        // check user already exit, if exit return error
        const isUserExit = await User.findOne({ email: email });

        if (!isUserExit) {
            throw new ApiError(404, "User does not exit!");
        }
        //compare the password
        const isPasswordMatch = await bcrypt.compare(
            password,
            isUserExit.password
        );

        if (!isPasswordMatch && password) {
            throw new ApiError(401, "Password is not match!");
        }
        res.json({
            message: "Login success!",
            user: isUserExit?.email,
        });
    } catch (error) {}
});

export default router.handler({
    onError(err, req, res) {
        res.status(400).json({
            error: err.message,
        });
    },
});
