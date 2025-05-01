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

@Controller("/posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post("/create")
  @Auth()
  create(@Req() req, @Body() dto: CreatePostDto) {
    return this.postsService.create(req.user.id, dto);
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

  @Patch("/update/:id")
  @Auth()
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this.postsService.update(id, dto);
  }

  @Delete("/delete/:id")
  @Auth()
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }

  @Patch("/like/:id")
  @Auth()
  like(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.like(id);
  }

  @Patch("/dislike/:id")
  @Auth()
  dislike(@Param("id", ParseIntPipe) id: number) {
    return this.postsService.dislike(id);
  }
}
