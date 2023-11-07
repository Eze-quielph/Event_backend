import { ROLES } from "../Constants/roles"

export interface AuthTokenResult {
    readonly role: string
    readonly sub : string
    readonly iat: string
    readonly exp: string
}

export interface IUseToken {
    readonly role: string
    readonly sub : string
    readonly isExpire: boolean
}

export interface payloadInterface{
    sub: string;
    role: ROLES
}