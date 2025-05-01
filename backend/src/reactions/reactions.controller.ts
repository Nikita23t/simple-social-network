import { Controller, Patch, Param, Req, ParseIntPipe } from '@nestjs/common';
import { ReactionType } from '@prisma/client';
import { Auth } from '../auth/decorators/auth.decorator';
import {ReactionsService} from "./reactions.service";


@Controller('/reactions')
export class ReactionsController {
    constructor(private readonly reactionService: ReactionsService) {}

    @Patch('/post/:postId/:type')
    @Auth()
    reactToPost(
        @Req() req,
        @Param('postId', ParseIntPipe) postId: number,
        @Param('type') type: ReactionType
    ) {
        return this.reactionService.reactToPost(req.user.id, postId, type);
    }

    @Patch('/comment/:commentId/:type')
    @Auth()
    reactToComment(
        @Req() req,
        @Param('commentId', ParseIntPipe) commentId: number,
        @Param('type') type: ReactionType
    ) {
        return this.reactionService.reactToComment(req.user.id, commentId, type);
    }
}
