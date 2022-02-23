import { Body, Controller, Get, HttpStatus, Post, Req, UseGuards, UsePipes, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ControllerActionEnum } from 'src/common/enum/controller.action.enum';
import { JoiValidationPipe } from 'src/common/joi-validation-pipe';
import { AuthGuard } from '@nestjs/passport';

import { IPayload } from '../../../common/interfaces/request.interface';
import { SigninRequestDto } from './dto/request/signin.dto';
import { SignupRequestDto } from './dto/request/signup.dto';
import { SigninResponseDto } from './dto/response/signin.dto';
import { SignupResponseDto } from './dto/response/signup.dto';
import { signinSchema } from './joi/signin.schema';
import { signupSchema } from './joi/signup.schema';
import { CommonAuthService } from './services/common/common.auth.service';
import { SigninService } from './services/signin.service';
import { SignupService } from './services/signup.service';
import { AuthService } from './auth.service';

@ApiBearerAuth()
@ApiTags(`[/auth] - Authorization module`)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinService: SigninService,
    private readonly signupService: SignupService,
    private readonly commonAuthService: CommonAuthService,
  ) {}

  @Get('ip')
  @ApiOperation({ description: ControllerActionEnum.AUTH_GET_IP })
  @ApiResponse({
    status: HttpStatus.OK,
    type: String,
  })
  public getIp(@Req() request: IPayload): string {
    return this.commonAuthService.getIp(request);
  }

  @Post('signin')
  @ApiOperation({ description: ControllerActionEnum.AUTH_SIGNIN })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SigninResponseDto,
  })
  @UsePipes(new JoiValidationPipe(signinSchema))
  public signin(@Body() body: SigninRequestDto): Promise<SigninResponseDto> {
    return this.signinService.singin(body);
  }

  @Post('signup')
  @ApiOperation({ description: ControllerActionEnum.AUTH_SIGNUP })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Boolean,
  })
  @UsePipes(new JoiValidationPipe(signupSchema))
  public signup(@Body() body: SignupRequestDto): Promise<SignupResponseDto> {
    return this.signupService.signup(body);
  }

  @Post('passport/signin')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ description: ControllerActionEnum.AUTH_SIGNIN })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SigninResponseDto,
  })
  @UsePipes(new JoiValidationPipe(signinSchema))
  public passportSignin(@Request() req) {
    return req.user;
  }
}
