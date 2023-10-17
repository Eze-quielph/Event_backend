import { SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY } from "../Constants/key-decorators";

export const PublicAccess = () => SetMetadata(PUBLIC_KEY,true)
