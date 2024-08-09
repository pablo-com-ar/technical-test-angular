import { Observable } from 'rxjs';
import { HeroModel } from '../model/hero.model';

export interface IHeroStorage {
  create(hero: HeroModel): Observable<number>;
  getAll(): Observable<HeroModel[]>;
  getById(id: number): Observable<HeroModel | undefined>;
  filter(part: string): void;
  edit(id: number, hero: HeroModel): void;
  deleteById(id: number): void;
}