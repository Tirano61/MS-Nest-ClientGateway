import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PRODUCT_SERVICE } from 'src/config/services';
import { PaginationDto } from '../common/dto/pagination.dto';
import { firstValueFrom } from 'rxjs';


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
  async findOneProduct(@Param('id') id:string){
    try {
      const product = await firstValueFrom(
        this.productClient.send( { cmd: 'find_one_product' }, {id: id} )
      );

      return product;
      
    } catch (error) {
      throw new RpcException(error);
    }
     

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
