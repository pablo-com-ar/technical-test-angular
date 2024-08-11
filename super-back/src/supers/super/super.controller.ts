import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SuperService } from './super.service';
import { SuperModel } from '../model/super.model';

@Controller('super')
export class SuperController {
  constructor(private readonly superService: SuperService) {}

  @Post()
  async create(@Body() s: SuperModel): Promise<SuperModel> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return this.superService.create(s);
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<SuperModel> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return this.superService.getById(id);
  }

  @Get()
  async getAll(): Promise<SuperModel[]> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return this.superService.getAll();
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() s: SuperModel,
  ): Promise<SuperModel> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return this.superService.update(id, s);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.superService.delete(id);
  }
}
