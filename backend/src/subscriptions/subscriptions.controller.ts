import {
    Controller,
    Post,
    Delete,
    Get,
    Body,
    Req,
    Param,
    ParseIntPipe,
  } from '@nestjs/common';
  import { SubscriptionsService } from './subscriptions.service';
  import { SubscribeDto } from './dto/subscribe.dto';
  import { Auth } from '../auth/decorators/auth.decorator';
  
  @Controller('/subscriptions')
  export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) {}
  
    @Post()
    @Auth()
    subscribe(@Req() req, @Body() dto: SubscribeDto) {
      return this.subscriptionsService.subscribe(req.user.id, dto);
    }
  
    @Delete(':targetUserId')
    @Auth()
    unsubscribe(@Req() req, @Param('targetUserId', ParseIntPipe) targetUserId: number) {
      return this.subscriptionsService.unsubscribe(req.user.id, targetUserId);
    }
  
    @Get('followers/:userId')
    @Auth()
    getFollowers(@Param('userId', ParseIntPipe) userId: number) {
      return this.subscriptionsService.getFollowers(userId);
    }
  
    @Get('following/:userId')
    @Auth()
    getFollowing(@Param('userId', ParseIntPipe) userId: number) {
      return this.subscriptionsService.getFollowing(userId);
    }
  }
  