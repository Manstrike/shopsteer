import {CompanyData} from './company.type';

export class Company {
    private id: string;
    private name: string;
    private isActive: boolean;

    private constructor(data: CompanyData) {
        this.id = data.id;
        this.name = data.name;
        this.isActive = data.isActive;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getIsActive() {
        return this.isActive;
    }

    public static create(data: CompanyData) {
        return new Company(data);
    }
}
