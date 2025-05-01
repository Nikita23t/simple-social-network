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
  } from '@nestjs/common';
  import { PostsService } from './posts.service';
  import { CreatePostDto } from './dto/create-post.dto';
  import { UpdatePostDto } from './dto/update-post.dto';
  import { Auth } from '../auth/decorators/auth.decorator';
  
  @Controller('/posts')
  export class PostsController {
    constructor(private postsService: PostsService) {}
  
    @Auth()
    @Post()
    create(@Req() req, @Body() dto: CreatePostDto) {
      return this.postsService.create(req.user.id, dto);
    }
  
    @Get()
    findAll() {
      return this.postsService.findAll();
    }
  
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
      return this.postsService.findById(id);
    }
  
    @Auth()
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
      return this.postsService.update(id, dto);
    }
  
    @Auth()
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
      return this.postsService.delete(id);
    }
  }
  