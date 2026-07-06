import { NestFactory } from "@nestjs/core"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { patchNestJsSwagger } from "nestjs-zod"

import { AppModule } from "./app.module"

async function bootstrap() {
  patchNestJsSwagger()

  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle("Vitalis API")
    .setDescription("Doctor appointment platform API")
    .setVersion("0.1.0")
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("docs", app, document)

  const port = process.env.PORT ?? 4000
  await app.listen(port)
  console.log(`API running on http://localhost:${port}`)
  console.log(`Swagger docs at http://localhost:${port}/docs`)
}

bootstrap()
