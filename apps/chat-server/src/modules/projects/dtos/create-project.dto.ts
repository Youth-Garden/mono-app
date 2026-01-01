import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allowedDomains?: string[];
}
