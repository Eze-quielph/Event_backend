import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    register(createUserDto: CreateUserDto): Promise<User>;
}
