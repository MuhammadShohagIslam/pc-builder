import { createRouter } from "next-connect";
import bcrypt from "bcrypt";
import db from "@/lib/db/db";
import User from "@/models/User";

const router = createRouter();

router.post(async (req, res) => {
    try {
        await db.connectDb();
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Please fill in all fields." });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ message: "This email already exsits." });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be atleast 6 characters." });
        }
        const cryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email, password: cryptedPassword });
        const addedUser = await newUser.save();
        await db.disconnectDb();
        res.json({
            message: "Register success!",
            user: addedUser?.email,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router.handler({
    onError(err, req, res) {
        res.status(400).json({
            error: err.message,
        });
    },
});
