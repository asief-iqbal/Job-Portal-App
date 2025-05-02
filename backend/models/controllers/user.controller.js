import { User } from "../user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User registration
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Validate required fields
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ 
                message: "All fields are required.", 
                success: false 
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                message: "Invalid email format.", 
                success: false 
            });
        }

        // Validate role
        if (!["student", "recruiter"].includes(role)) {
            return res.status(400).json({ 
                message: "Invalid role. Must be either 'student' or 'recruiter'.", 
                success: false 
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                message: "User already exists with this email.", 
                success: false 
            });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            fullname, 
            email, 
            phoneNumber, 
            password: hashedPassword, 
            role 
        });

        // Generate token
        const tokenData = { userId: newUser._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(201)
            .cookie("token", token, { 
                maxAge: 24 * 60 * 60 * 1000, 
                httpOnly: true, 
                sameSite: "strict" 
            })
            .json({ 
                message: "Account created successfully.", 
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    role: newUser.role
                },
                success: true 
            });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ 
            message: "Server error during registration.", 
            success: false 
        });
    }
};

// User login
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate required fields
        if (!email || !password || !role) {
            return res.status(400).json({ 
                message: "All fields are required.", 
                success: false 
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                message: "User not found.", 
                success: false 
            });
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ 
                message: "Incorrect password.", 
                success: false 
            });
        }

        // Verify role
        if (role !== user.role) {
            return res.status(400).json({ 
                message: "Role mismatch.", 
                success: false 
            });
        }

        // Generate token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200)
            .cookie("token", token, { 
                maxAge: 24 * 60 * 60 * 1000, 
                httpOnly: true, 
                sameSite: "strict" 
            })
            .json({ 
                message: `Welcome back, ${user.fullname}`, 
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    role: user.role
                },
                success: true 
            });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ 
            message: "Server error during login.", 
            success: false 
        });
    }
};

// User Logout
export const logout = (req, res) => {
    try {
        res.clearCookie("token", { 
            httpOnly: true, 
            sameSite: "strict" 
        });
        return res.status(200).json({
            message: "Logout successful.",
            success: true,
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            message: "Server error during logout.",
            success: false,
        });
    }
};

// Update profile
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ 
                message: "User ID is missing. Authentication required.", 
                success: false 
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                message: "User not found.", 
                success: false 
            });
        }

        // Update fields if provided
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(",");

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                role: user.role,
                profile: user.profile
            },
            success: true
        });
    } catch (error) {
        console.error("Profile update error:", error);
        res.status(500).json({
            message: "Server error during profile update.",
            success: false
        });
    }
};

