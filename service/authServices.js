import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function signTokenService(userId) {
    return jwt.sign({ sub: userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES || "1h"
    });
}

export async function hashPasswordService(password) {
    return await bcrypt.hash(password, 12);
}

export async function compearePassService(password_check, password_target) {
    return await bcrypt.compare(password_check, password_target);
}