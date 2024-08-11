import { Injectable } from '@nestjs/common';
import { SuperModel } from '../model/super.model';

@Injectable()
export class SuperService {
  private supersInMemory: SuperModel[] = [];

  create(s: SuperModel): SuperModel {
    const newId: number = this.supersInMemory.length + 1;
    s.id = newId;

    this.supersInMemory.push(s);

    return s;
  }

  getAll(): SuperModel[] {
    return this.supersInMemory;
  }

  getById(id: number): SuperModel | undefined {
    return this.supersInMemory.find((s) => s.id === id);
  }

  update(
    id: number,
    updatedModel: Partial<SuperModel>,
  ): SuperModel | undefined {
    const s = this.supersInMemory.findIndex((s) => s.id === id);

    if (s !== -1) {
      this.supersInMemory[s] = {
        ...this.supersInMemory[s],
        ...updatedModel,
      };

      return this.supersInMemory[s];
    }

    return undefined;
  }

  delete(id: number): boolean {
    const initialLength = this.supersInMemory.length;
    this.supersInMemory = this.supersInMemory.filter((s) => s.id !== id);
    return this.supersInMemory.length < initialLength;
  }
}
