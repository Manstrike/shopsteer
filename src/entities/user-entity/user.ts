import {UserData} from './user.type';

export class User {
    private id: string;
    private login: string;
    private password: string;
    private phone: string;
    private email: string;
    private name: string;
    private createdAt: Date;
    private updatedAt: Date;

    private constructor(data: UserData) {
        this.id = data.id;
        this.login = data.login;
        this.password = data.password;
        this.phone = data.phone;
        this.email = data.email;
        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
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

    getEmail(): string {
        return this.email;
    }

    getName(): string {
        return this.name;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public static create(data: UserData) {
        return new User(data);
    }
}
