import { CreateUserDto } from './../user/dto/create-user.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.request.dto';
import { BaseApiResponse } from '../core/interfaces/api-response.interface';
import { User } from '../core/entities/user.entity';
import { LoginResponse } from './dto/login.response.dto';
import { Public } from './guard/public-access.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body() register: CreateUserDto,
  ): Promise<BaseApiResponse<User>> {
    const createuser = await this.userService.createUser(register);
    
    if (!createuser) {
      return {
        statusCode: 400,
        message: ['Email already exists']
      }
    }
    return {
      data: createuser,
      statusCode: 201,
      message: ['User created successfully'],
    };
  }

  @Post('login')
  async login(
    @Body() login: LoginDto,
  ): Promise<BaseApiResponse<LoginResponse>> {
    const [isLogin, response] = await this.authService.login(login);
    if (!isLogin) {
      return {
        data: null,
        statusCode: 401,
        message: ['Invalid email or password'],
      };
    }
    return {
      data: response as LoginResponse,
      statusCode: 200,
      message: ['Login successfully'],
    };
  }
}
