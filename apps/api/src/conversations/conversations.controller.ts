import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { createConversationSchema, sendMessageSchema } from "@doctor/validators"

import { ConversationsService } from "./conversations.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"

class CreateConversationDto extends createZodDto(createConversationSchema) {}
class SendMessageDto extends createZodDto(sendMessageSchema) {}

@ApiTags("conversations")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("conversations")
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.conversationsService.findAllForUser(user)
  }

  @Post()
  create(@CurrentUser() user: RequestUser, @Body() body: CreateConversationDto) {
    return this.conversationsService.create(user, body)
  }

  @Get(":id/messages")
  findMessages(@CurrentUser() user: RequestUser, @Param("id") id: string) {
    return this.conversationsService.findMessages(user, id)
  }

  @Post(":id/messages")
  sendMessage(
    @CurrentUser() user: RequestUser,
    @Param("id") id: string,
    @Body() body: SendMessageDto
  ) {
    return this.conversationsService.sendMessage(user, id, body)
  }
}
