import { IsString, MinLength, Matches, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsInt()
  @Min(5)
  age: number;
}
