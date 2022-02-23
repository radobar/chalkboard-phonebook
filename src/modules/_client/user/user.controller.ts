import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Req,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ControllerActionEnum } from 'src/common/enum/controller.action.enum';
import { JoiValidationPipe } from 'src/common/joi-validation-pipe';

import { UserAuthGuard } from '../../../common/guards/user-auth-guard';
import { IPayload } from '../../../common/interfaces/request.interface';
import { User } from '../../../entity/User';
import { UpdateUserRequestDto } from './dto/request/updateUser.dto';
import { updateUserSchema } from './joi/updateUser.schema';
import { UserService } from './services/user.service';

@ApiBearerAuth()
@ApiTags(`[/users] - User module`)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UserAuthGuard()
  @ApiOperation({ description: ControllerActionEnum.USER_GET })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  public getUser(@Req() { user }: IPayload): Promise<User> {
    return this.userService.getUserById(user.id);
  }

  @Get(':id')
  @UserAuthGuard()
  @ApiOperation({ description: ControllerActionEnum.USER_GET_BY_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  public getUserById(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put()
  @UserAuthGuard()
  @ApiOperation({ description: ControllerActionEnum.USER_UPDATE })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  @UsePipes(new JoiValidationPipe(updateUserSchema))
  public async updateUser(
    @Req() { user }: IPayload,
    @Body() body: UpdateUserRequestDto,
  ): Promise<User> {
    await this.userService.updateUser(user.id, body);

    return this.userService.getUserById(user.id);
  }

  @Delete(':id')
  @UserAuthGuard()
  @ApiOperation({ description: ControllerActionEnum.USER_DELETE_BY_ID })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Number,
  })
  public async deleteUserById(@Param('id', new ParseIntPipe()) id: number): Promise<HttpStatus> {
    await this.userService.deleteUserById(id);

    return HttpStatus.OK;
  }
}
