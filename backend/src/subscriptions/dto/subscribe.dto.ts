import { IsInt } from 'class-validator';

export class SubscribeDto {
  @IsInt()
  targetUserId: number;
}
