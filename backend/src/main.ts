import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function start() {
  const PORT = Number(process.env.PORT);
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("/api");
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({ origin: [], credentials: true });

  const config = new DocumentBuilder()
      .setTitle("Nest API for social networks")
      .setDescription("Nest API description fro social networks")
      .setVersion("1.0.0")
      .setLicense("MIT License", "https://opensource.org/licenses/MIT")
      .addTag("Nikita23/pierrdoon")
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

start();