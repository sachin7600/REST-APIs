const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createAccount = async (req, res) => {
    try {

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(403).json({
                success: false,
                msg: "All fields are required"
            })
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                msg: "email already resgisterd"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        })
        createUser.save();

        return res.status(200).json({
            success: true,
            msg: "Account created successfully",
            createUser
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                msg: "All fields are required"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "email is not resgisterd"
            })
        }

        const dcryptPassword = await bcrypt.compare(password, user.password);

        if (!dcryptPassword) {
            return res.status(400).json({
                success: false,
                msg: "email or password is incorrect"
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: "1d" });

        return res.status(200).cookie("token", token, { httpOnly: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 }).json({
            success: true,
            msg: "Logged in successfully",
            user,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}

exports.logout = async (_, res) => {
    try {

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "User logout successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: error.message
        })
    }
}