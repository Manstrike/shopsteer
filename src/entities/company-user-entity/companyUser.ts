import {CompanyUserData} from './companyUser.type';
import {Role} from 'src/companyUser/userRoles';

export class CompanyUser {
    private id: string;
    private role: Role;
    private baseUserId: string;
    private companyId: string;
    private createdAt: Date;
    private updatedAt: Date;

    private constructor(data: CompanyUserData) {
        this.id = data.id;
        this.role = data.role;
        this.baseUserId = data.baseUserId;
        this.companyId = data.companyId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }

    getId(): string {
        return this.id;
    }

    getRole(): Role {
        return this.role;
    }

    getBaseUserId(): string {
        return this.baseUserId;
    }

    getCompanyId(): string {
        return this.companyId;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public static create(data: CompanyUserData) {
        return new CompanyUser(data);
    }
}
