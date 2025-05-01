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
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Auth } from "../auth/decorators/auth.decorator";
import {ReactionsService} from "../reactions/reactions.service";

@Controller("/comments")
export class CommentsController {
  constructor(
      private commentsService: CommentsService,
      private reactionsService: ReactionsService
  ) {}

  @Post("/create")
  @Auth()
  create(@Req() req, @Body() dto: CreateCommentDto) {
    return this.commentsService.create(req.user.id, dto);
  }

  @Get("/all")
  @Auth()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get("/find/:id")
  @Auth()
  findById(@Param("id", ParseIntPipe) id: number) {
    return this.commentsService.findById(id);
  }

  @Patch("/update/:id")
  @Auth()
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateCommentDto) {
    return this.commentsService.update(id, dto);
  }

  @Delete("/delete/:id")
  @Auth()
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.commentsService.delete(id);
  }

  @Patch('/like/:id')
  @Auth()
  like(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.reactionsService.reactToComment(req.user.id, id, 'LIKE');
  }

  @Patch('/dislike/:id')
  @Auth()
  dislike(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.reactionsService.reactToComment(req.user.id, id, 'DISLIKE');
  }
}
