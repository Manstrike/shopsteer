import {UserData} from './user.type';

export class User {
    private id: string;
    private login: string;
    private password: string;
    private phone: string;

    private constructor(data: UserData) {
        this.id = data.id;
        this.login = data.id;
        this.password = data.password;
        this.phone = data.phone;
    }

    getId(): string {
        return this.id;
    }

    getLogin(): string {
        return this.login;
    }

    getPassword(): string {
        return this.password;
    }

    getPhone(): string {
        return this.phone;
    }

    public static create(data: UserData) {
        return new User(data);
    }
}
