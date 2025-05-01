import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Req,
  ParseIntPipe,
} from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import { Request } from "express";
import {ReactionsService} from "../reactions/reactions.service";

@Controller("/posts")
export class PostsController {
  constructor(
      private postsService: PostsService,
      private reactionsService: ReactionsService
  ) {}

  @Post("/create")
  @Auth()
  create(@Req() req: Request, @Body() dto: CreatePostDto) {
    return this.postsService.create(req, dto);
  }

  @Get("/all")
  @Auth()
  findAll() {
    return this.postsService.findAll();
  }

  @Get("/find/:id")
  @Auth()
  findById(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.findById(id);
  }

  @Patch("/update")
  @Auth()
  update(@Req() req: Request, @Body() dto: UpdatePostDto) {
    return this.postsService.update(req, dto);
  }

  @Delete("/delete/:id")
  @Auth()
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }

  @Patch('/like/:id')
  @Auth()
  like(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.reactionsService.reactToPost(req.user.id, id, 'LIKE');
  }

  @Patch('/dislike/:id')
  @Auth()
  dislike(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.reactionsService.reactToPost(req.user.id, id, 'DISLIKE');
  }

}
