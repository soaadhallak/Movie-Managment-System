import { JwtTokenService } from "../../infrastructure/jwt/jwt.service";
import { LoginDto } from "../dto/login.dto";

import { Injectable } from "@nestjs/common";
import { UserRepository } from '../../../users/domain/repositories/user.repository';
import * as bcrypt from 'bcrypt';

import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private readonly jwtTokenService: JwtTokenService, private readonly userRepository: UserRepository) {}

    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.userRepository.findByUsername(loginDto.username);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtTokenService.generateToken({ id: user.id, username: user.username, role: user.role });

        return {  access_token:token };
            
    }
}