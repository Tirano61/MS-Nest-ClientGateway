import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config/services';
import { PaginationDto } from '../common/dto/pagination.dto';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy 
  ) {}

  @Post()
  createProduct(){
    return 'Crea un productos'
  }
  @Get()
  findAllProducts(@Query()  paginationDto: PaginationDto){
    return this.productClient.send({ cmd: 'find_all_product' },  paginationDto);
  }
  @Get(':id')
  findOneProduct(@Param('id') id:string){
    return 'Retorna un producto por id'
  }
  @Patch()
  updateProduct(@Param('id') id:string, @Body() body: any){
    return 'Actualiza un producto'
  }
  @Delete(':id')
  deleteProduct(@Param('id') id:string){
    return 'Borra un producto'
  }
}
