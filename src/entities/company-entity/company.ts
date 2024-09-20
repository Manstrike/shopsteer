import {CompanyData} from './company.type';

export class Company {
    private id: string;
    private merchantId: string;
    private merchant: string;
    private name: string;
    private isActive: boolean;

    private constructor(data: CompanyData) {
        this.id = data.id;
        this.merchantId = data.merchantId;
        this.merchant = data.merchant;
        this.name = data.name;
        this.isActive = data.isActive;
    }

    getId() {
        return this.id;
    }

    getMerchantId() {
        return this.merchantId;
    }

    getName() {
        return this.name;
    }

    getIsActive() {
        return this.isActive;
    }

    getMerchant() {
        return this.merchant;
    }

    public static create(data: CompanyData) {
        return new Company(data);
    }
}
