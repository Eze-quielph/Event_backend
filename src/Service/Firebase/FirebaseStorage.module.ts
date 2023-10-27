import {Module} from "@nestjs/common";
import { FirebaseStorageService } from "./FirebaseStorage.service";

@Module({
    providers: [FirebaseStorageService],
    exports: [FirebaseStorageService]
})
export class FirebaseStorageModule{}