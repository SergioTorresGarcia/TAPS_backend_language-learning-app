import bcrypt from "bcrypt";

export const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,14}$/;

    // Check password against the regex
    if (passwordRegex.test(password)) {
        const passwordEncrypted = bcrypt.hashSync(password, 8);
        return passwordEncrypted;
    } else {
        throw new Error('Password must be 8-14 characters long & contain at least 1 uppercase letter, 1 lowercase letter, and 1 digit.');
    }
}