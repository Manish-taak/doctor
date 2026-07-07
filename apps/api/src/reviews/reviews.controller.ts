import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { createZodDto } from "nestjs-zod"
import { createReviewSchema } from "@doctor/validators"

import { ReviewsService } from "./reviews.service"
import { CurrentUser, type RequestUser } from "../common/current-user.decorator"
import { JwtAuthGuard } from "../common/jwt-auth.guard"

class CreateReviewDto extends createZodDto(createReviewSchema) {}

@ApiTags("reviews")
@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findForDoctor(@Query("doctorId") doctorId: string) {
    return this.reviewsService.findForDoctor(doctorId)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@CurrentUser() user: RequestUser, @Body() body: CreateReviewDto) {
    return this.reviewsService.create(user, body)
  }
}
