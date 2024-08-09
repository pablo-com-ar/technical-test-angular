import { Injectable } from '@angular/core';
import { IHeroStorage } from '../interface/hero.storage';
import { BehaviorSubject, filter, map, Observable, of } from 'rxjs';
import { HeroModel } from '../model/hero.model';

@Injectable({
  providedIn: 'root'
})
export class InmemorystorageService implements IHeroStorage {
  private memoryStorage = new BehaviorSubject<HeroModel[]>([{
    id: 1,
    nombre: 'Spiderman',
    poder: 'telarañas'
  }, {
    id: 2,
    nombre: 'Superman',
    poder: 'vuela' 
  }]);
  storage$ = this.memoryStorage.asObservable();

  create(hero: HeroModel): Observable<number> {
    hero.id = this.memoryStorage.value.length + 1;
    this.memoryStorage.next([...this.memoryStorage.value, hero]);

    return of(hero.id);
  }

  getAll(): Observable<HeroModel[]> {
    return this.storage$;
  }

  getById(id: number): Observable<HeroModel | undefined> {
    const result = this.memoryStorage.value.find(hero => hero.id === id);

    return of(result);
  }

  filter(part: string): Observable<HeroModel[]> {
    return this.storage$.pipe(
      map(heroes => heroes.filter(hero => hero.nombre.includes(part)))
    );
  }

  edit(id: number, hero: HeroModel): void {
    const itemUpdated = this.memoryStorage.value.map(item => {
      if (item.id === id) {
        return { ...item, ...hero };
      }

      return item;
    });

    return this.memoryStorage.next(itemUpdated);
  }  

  deleteById(id: number): void {
    this.memoryStorage.next(this.memoryStorage.value.filter(hero => hero.id !== id));
  }
}
