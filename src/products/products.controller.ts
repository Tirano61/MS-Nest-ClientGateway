import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';


@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct(){
    return 'Crea un productos'
  }
  @Get()
  findAllProducts(){
    return 'Retorna todos los productos'
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
