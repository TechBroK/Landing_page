import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../core/entities/user.entity';
import { LoginResponse } from './dto/login.response.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<[boolean, LoginResponse | string]> {
    const { email, password } = loginDto;

    const user = await this.userService.findUserByFields({ where: { email } }, [
      'email',
      'password',
      'id',
      'isAdmin',
    ]);

    if (!user) {
      return [false, 'Email or password is incorrect.'];
    }

    if (!user.password) {
      return [false, 'Email or password is incorrect.'];
    }

    if (!(await user.checkPassword(password))) {
      return [false, 'Email or password is incorrect.'];
    }

    const payload = { username: user.email, sub: user.id };

    const loginResponse: LoginResponse = {
      id: user.id,
      isAdmin: user.isAdmin,
      access_token: await this.jwtService.signAsync(payload),
    };

    return [true, loginResponse];
  }
}
