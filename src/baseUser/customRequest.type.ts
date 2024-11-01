import {Request as ExpressRequest} from 'express';

interface User {
    exp: number;
    iat: number;
    id: string;
}

export interface CustomRequest extends ExpressRequest {
    user?: User;
}
