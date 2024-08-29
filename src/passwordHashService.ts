import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 11;

export class PasswordHasService {
    static async hash(password) {
        return bcrypt.hash(password, SALT_ROUNDS);
    }

    static async compare(password, hash) {
        return bcrypt.compare(password, hash);
    }
}
