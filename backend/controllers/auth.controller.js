import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "É necessário realizar o preenchimento de todos os campos" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "E-mail já existente" });
        }

        const existingUserName = await User.findOne({ username })
        if (existingUserName) {
            return res.status(400).json({ message: "Nome de usuário já exsitente" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "A senha precisa conter no mínimo 6 caractéres" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassowrd = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hashedPassowrd,
            username
        });

        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expires: "3d" });

        res.cookie("jwt-arrumaai", token, {
            httpOnly: true, // prevent XSS attacks
            maxAge: 3 * 24 * 60 * 1000,
            sameSite: "strict", // prevent CSRF attacks
            secure: process.env.NODE_ENV === 'production', // prevents man-in-the-middle attacks
        })

        res.status(201).json({ message: "Usuário registrado com sucesso!" })

        // postman
        // todo: send welcome email
    } catch (error) {
        console.log("Erro no cadastro ", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = (req, res) => {
    res.send("login");
}

export const logout = (req, res) => {
    res.send("logout");
}