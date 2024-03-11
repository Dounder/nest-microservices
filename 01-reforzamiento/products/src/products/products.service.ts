import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto): Product {
    const { name, description, price } = createProductDto;
    const product = new Product(uuidV4(), name, description, price);

    this.products.push(product);

    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {
    const product = this.products.find((product) => product.id === id);

    if (!product) throw new NotFoundException(`Product with id ${id} not found`);

    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const { id: _, ...values } = updateProductDto;

    const product = this.findOne(id);

    product.updateWith(values);

    return product;
  }

  remove(id: string): string {
    const productIndex = this.products.findIndex((product) => product.id === id);

    if (productIndex === -1) throw new NotFoundException(`Product with id ${id} not found`);

    this.products.splice(productIndex, 1);

    return `Product with id ${id} has been removed`;
  }
}
