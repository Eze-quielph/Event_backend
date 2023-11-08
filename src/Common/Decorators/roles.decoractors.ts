import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "../Constants/key-decorators";
import { ROLES } from "../Constants/roles";

export const RolesAccess = (...roles: Array<keyof typeof ROLES>) => 
    SetMetadata(ROLES_KEY, roles);
