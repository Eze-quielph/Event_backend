import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() {Email, Password}:{Email:string,Password:string}){
        const userValide = await this.authService.validateUser(Email,Password);

        if(!userValide){
            throw new UnauthorizedException('Invalid credentials');
        }
        console.info(userValide)

        const jwt = await this.authService.generateJWT(userValide);

        console.info(jwt)
        return {jwt, message: 'Usuario logueado exitosamente'}
    }

}