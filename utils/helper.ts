import bcrypt from "bcrypt";

export function saltAndHash(password: any) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash ;
}