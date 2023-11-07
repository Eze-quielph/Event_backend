import { Global, Module, forwardRef } from '@nestjs/common';
import { UserModule } from 'src/Module/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/Module/user/user.service';

@Global()
@Module({
  imports:[UserModule],
  providers: [AuthService, UserService],
  controllers:[AuthController],
  exports: [AuthService],
})
export class AuthModule {}