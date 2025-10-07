import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../core/entities/customer.entity';
import { Repository } from 'typeorm';
import { CustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private readonly userService: UserService,
  ) {}

  async createCustomer(
    customer: CustomerDto,
    createdBy: number,
  ): Promise<Customer> {
    const loggedInUser = await this.userService.findUserByFields(
      { where: { id: createdBy } },
      ['id'],
    );
    const createCustomer = this.customerRepository.create({
      ...customer,
      createdby: loggedInUser,
    });
    return await this.customerRepository.save(createCustomer);
  }

  async getCustomer(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async updateCustomer(
    customerId: number,
    updateInfo: UpdateCustomerDto,
  ): Promise<[boolean, string]> {
    const isCustomerExist = await this.customerRepository.findOne({
      where: { id: customerId },
    });

    if (!isCustomerExist) {
      return [false, 'Customer not found'];
    }

    const result = await this.customerRepository.update(customerId, {
      ...updateInfo,
    });

    if (result.affected > 0) {
      return [true, 'Customer updated successfully'];
    }

    return [false, 'Failed to update customer'];
  }

  async deleteCustomer(customerId: number) {
    return await this.customerRepository.delete({
      id: customerId,
    });
  }
}
