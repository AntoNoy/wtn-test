import { Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller, Post } from '@nestjs/common';
import { Session } from 'src/decorators/session.decorator';
import { SessionEntity } from 'src/entities/session.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoginDTO } from 'src/models/dto/login.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginData: LoginDTO): Promise<SessionEntity> {
    return this.authService.login(loginData.username, loginData.password);
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@Session() session: SessionEntity): Promise<any> {
    return this.authService.logOut(session.id);
  }
}
