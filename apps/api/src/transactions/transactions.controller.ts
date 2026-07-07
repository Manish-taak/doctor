import { Body, Controller, Get, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { createTransactionSchema, updateTransactionSchema } from "@doctor/validators"

import { TransactionsService } from "./transactions.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"
import { Roles } from "../common/roles.decorator"
import { RolesGuard } from "../common/roles.guard"

class CreateTransactionDto extends createZodDto(createTransactionSchema) {}
class UpdateTransactionDto extends createZodDto(updateTransactionSchema) {}

@ApiTags("transactions")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("transactions")
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll(@CurrentUser() user: RequestUser) {
    return this.transactionsService.findAllForUser(user)
  }

  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @Post()
  create(@Body() body: CreateTransactionDto) {
    return this.transactionsService.create(body)
  }

  @UseGuards(RolesGuard)
  @Roles("ADMIN")
  @Patch(":id")
  updateStatus(@Param("id") id: string, @Body() body: UpdateTransactionDto) {
    return this.transactionsService.updateStatus(id, body)
  }
}
