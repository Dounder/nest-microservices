import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsPositive()
  @Type(() => Number)
  price: number;
}
