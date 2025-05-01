import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MulterModule } from "@nestjs/platform-express";
import { ServeStaticModule } from "@nestjs/serve-static";
import { UsersModule } from "./users/users.module";
import { PostsModule } from "./posts/posts.module";
import { AuthModule } from "./auth/auth.module";
import { CommentsModule } from './comments/comments.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import {NotificationsModule} from "./notification/notification.module";
import * as path from "node:path";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.register({
      dest: path.resolve(__dirname, "../..", "images"),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, "../..", "images"),
      serveRoot: "/api/uploads",
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    CommentsModule,
    SubscriptionsModule,
    NotificationsModule
  ],
  exports: [],
})
export class AppModule {}
