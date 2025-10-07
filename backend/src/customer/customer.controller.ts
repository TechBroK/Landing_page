import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/create-customer.dto';
import { Customer } from '../core/entities/customer.entity';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBody } from '@nestjs/swagger';

// baseurl/customer
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // POST baseurl/customer
  @ApiBody({ type: CustomerDto })
  @Post()
  async create(
    @Body() customer: CustomerDto,
    @Request() req: any,
  ): Promise<string> {
    const createdBy = req.user.userId;
    console.log(createdBy);
    await this.customerService.createCustomer(customer, createdBy);
    return 'Customer created successfully';
  }

  // GET baseurl/customer
  @Get()
  async getCustomer(): Promise<Customer[]> {
    return this.customerService.getCustomer();
  }

  // PUT baseurl/customer/:id
  @Put(':id')
  async updateCustomer(
    @Body() updateInfo: UpdateCustomerDto,
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    const [isUpdated, message] = await this.customerService.updateCustomer(
      id,
      updateInfo,
    );

    if (!isUpdated) {
      throw new BadRequestException(message);
    }

    return { message };
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number): Promise<string> {
    await this.customerService.deleteCustomer(id);
    return 'Customer deleted successfully';
  }
}
