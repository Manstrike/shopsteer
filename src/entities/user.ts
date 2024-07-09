import {UserData} from './user.interface';

export class User {
    private _id: string;
    private _login: string;
    private _password: string;
    private _phone: string;

    constructor(data: UserData) {
        this._id = data.id;
        this._login = data.id;
        this._password = data.password;
        this._phone = data.phone;
    }

    getId(): string {
        return this._id;
    }

    getLogin(): string {
        return this._login;
    }

    getPassword(): string {
        return this._password;
    }

    getPhone(): string {
        return this._phone;
    }
}
