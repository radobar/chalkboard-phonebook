import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ControllerActionEnum } from 'src/common/enum/controller.action.enum';
import { JoiValidationPipe } from 'src/common/joi-validation-pipe';

import { AuthGuard } from '../../../common/guards/main-auth-guard';
import { IPayload } from '../../../common/interfaces/request.interface';
import { UpdateContactRequestDto } from './dto/updateContact.dto';
import { updateContactSchema } from './joi/updateContactSchema';
import { ContactService } from './services/contact.service';
import { ContactRecord } from '../../../entity/ContactRecord';
import { CreateContactRequestDto } from './dto/createContact.dto';

@ApiBearerAuth()
@ApiTags(`[/users] - User module`)
@Controller('users')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  @AuthGuard()
  @ApiOperation({ description: ControllerActionEnum.ContactList })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ContactRecord,
  })
  public getContact(@Req() { user }: IPayload): Promise<ContactRecord> {
    return this.contactService.getContactById(user.id);
  }

  @Get(':id')
  @AuthGuard()
  @ApiOperation({ description: ControllerActionEnum.ContactGetById })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ContactRecord,
  })
  public getContactById(@Param('id', new ParseIntPipe()) id: number): Promise<ContactRecord> {
    return this.contactService.getContactById(id);
  }

  @Put()
  @AuthGuard()
  @ApiOperation({ description: ControllerActionEnum.ContactUpdate })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ContactRecord,
  })
  @UsePipes(new JoiValidationPipe(updateContactSchema))
  public async updateContactRecord(
    @Req() { user }: IPayload,
    @Body() body: UpdateContactRequestDto,
  ): Promise<ContactRecord> {
    await this.contactService.updateContact(body);

    return this.contactService.getContactById(user.id);
  }

  @Post()
  @AuthGuard()
  @ApiOperation({ description: ControllerActionEnum.ContactUpdate })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ContactRecord,
  })
  @UsePipes(new JoiValidationPipe(updateContactSchema))
  public async createContactRecord(
    @Req() { user }: IPayload,
    @Body() body: CreateContactRequestDto,
  ): Promise<ContactRecord> {
    await this.contactService.createContact(body);

    return this.contactService.getContactById(user.id);
  }

  @Delete(':id')
  @AuthGuard()
  @ApiOperation({ description: ControllerActionEnum.ContactDeleteById })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Number,
  })
  public async deleteContactRecordById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<HttpStatus> {
    await this.contactService.deleteContactById(id);

    return HttpStatus.OK;
  }
}
