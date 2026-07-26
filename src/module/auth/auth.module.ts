import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { AuthController } from "./presentation/auth.controller";
import { AuthService } from "./application/services/auth.service";
import { JwtTokenService } from "./infrastructure/jwt/jwt.service";
import { UserRepository } from "../users/domain/repositories/user.repository";
import { UsersModule } from "../users/users.module";

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtTokenService],
    exports: [AuthService],
})
export class AuthModule {}