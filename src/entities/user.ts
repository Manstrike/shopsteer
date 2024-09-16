import {Roles} from 'src/user/userRoles';
import {UserData} from './user.type';

export class User {
    private id: string;
    private login: string;
    private password: string;
    private phone: string;
    private role: Roles;

    private constructor(data: UserData) {
        this.id = data.id;
        this.login = data.login;
        this.password = data.password;
        this.phone = data.phone;
        this.role = data.role;
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

    getRole(): Roles {
        return this.role;
    }

    public static create(data: UserData) {
        return new User(data);
    }
}
