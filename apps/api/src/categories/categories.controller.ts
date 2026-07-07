import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { createCategorySchema } from "@doctor/validators"

import { CategoriesService } from "./categories.service"
import { JwtAuthGuard } from "../common/jwt-auth.guard"
import { Roles } from "../common/roles.decorator"
import { RolesGuard } from "../common/roles.guard"

class CreateCategoryDto extends createZodDto(createCategorySchema) {}

@ApiTags("categories")
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("ADMIN")
  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body)
  }
}
