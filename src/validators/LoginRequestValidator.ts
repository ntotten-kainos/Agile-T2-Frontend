import { LoginRequest } from './../models/LoginRequest';


export const validateLoginRequest = function (loginReq: LoginRequest): void {

    if (loginReq.email == '' && loginReq.password == '') {
        throw new Error("Please enter email and password")
    }

    if (loginReq.email == '') {
        throw new Error("Please enter email")
    }

    if (loginReq.password == '') {
        throw new Error("Please enter password")
    }

    const passwordValidationResult = validatePassword(loginReq.password);

    if (!passwordValidationResult.isValid || !validateEmail(loginReq.email)) {
        throw new Error("Invalid email or password - hover over input field for more info!");
    }
}

export const validateEmail = function (email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
}

interface PasswordValidationResult {
    isValid: boolean;
}

export const validatePassword = function (password: string): PasswordValidationResult {
    const errors: string[] = [];

    // Check length
    if (password.length < 8) {
        errors.push("Password must be at least 8 characters.");
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter.");
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter.");
    }

    // Check for digit
    if (!/\d/.test(password)) {
        errors.push("Password must contain at least one digit.");
    }

    // Check for special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        errors.push("Password must contain at least one special character.");
    }

    return {
        isValid: errors.length === 0,
    };
}