import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
// import { AuthGuard } from '../../../'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  getAllOrders() {
    console.log('on est la')
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(Number(id));
  }

  @Post()
  createOrder(@Body() data: { cocktails: any }) {
    return this.ordersService.createOrder(data);
  }

  @Put(':id')
  // @UseGuards(AuthGuard)
  updateOrder(@Param('id') id: string, @Body() data: { cocktails?: any }) {
    return this.ordersService.updateOrder(Number(id), data);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard)
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.deleteOrder(Number(id));
  }
}
