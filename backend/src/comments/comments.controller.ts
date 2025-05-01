import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
    Req,
    ParseIntPipe,
  } from '@nestjs/common';
  import { CommentsService } from './comments.service';
  import { CreateCommentDto } from './dto/create-comment.dto';
  import { UpdateCommentDto } from './dto/update-comment.dto';
  import { Auth } from '../auth/decorators/auth.decorator';
  
  @Controller('/comments')
  export class CommentsController {
    constructor(private commentsService: CommentsService) {}
  
    @Auth()
    @Post()
    create(@Req() req, @Body() dto: CreateCommentDto) {
      return this.commentsService.create(req.user.id, dto);
    }
  
    @Get()
    findAll() {
      return this.commentsService.findAll();
    }
  
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
      return this.commentsService.findById(id);
    }
  
    @Auth()
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCommentDto) {
      return this.commentsService.update(id, dto);
    }
  
    @Auth()
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.commentsService.delete(id);
    }
  }
  