export class GetCompanyUserResponseBuilder {
    async build(user) {
        return {
            role: user.role,
            baseUserId: user.baseUserId,
            companyId: user.companyId,
        };
    }
}
