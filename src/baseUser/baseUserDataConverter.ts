import {User} from 'src/entities/user-entity/user';
import {UserData} from 'src/entities/user-entity/user.type';

export function convertBaseUserEntityToDbData(baseUser: User): UserData {
    return {
        id: baseUser.getId(),
        login: baseUser.getLogin(),
        password: baseUser.getPassword(),
        phone: baseUser.getPhone(),
        email: baseUser.getEmail(),
        name: baseUser.getName(),
    };
}

export function convertBaseUserSchemaToResponse(dbResult: UserData) {
    return {
        id: dbResult.id,
        login: dbResult.login,
        password: dbResult.password,
        phone: dbResult.phone,
        email: dbResult.email,
        name: dbResult.name,
    };
}

export function convertBaseUserSchemaToEntity(dbResult: UserData): User {
    return User.create(dbResult);
}
