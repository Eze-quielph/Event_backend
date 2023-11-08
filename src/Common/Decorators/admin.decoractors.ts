import { SetMetadata } from "@nestjs/common";
import { ADMIN_KEY } from "../Constants/key-decorators";
import { ROLES } from "../Constants/roles";

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN)
