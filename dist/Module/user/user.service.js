"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    async register(createUserDto) {
        try {
            const existingUser = await user_entity_1.User.findOne({
                where: { Email: createUserDto.Email },
            });
            if (existingUser) {
                throw new Error('User already exists');
            }
            const dataUser = {
                FirstName: createUserDto.FirstName,
                LastName: createUserDto.LastName,
                Username: createUserDto.Username,
                Adress: createUserDto.Adress,
                Birthdate: createUserDto.Birthdate,
                Email: createUserDto.Email,
                Password: createUserDto.Password,
                Image: createUserDto.Image,
                Qr: createUserDto.Qr,
                Tickets: createUserDto.Tickets,
                Role: createUserDto.Role,
            };
            const user = await user_entity_1.User.create(dataUser);
            return user;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map