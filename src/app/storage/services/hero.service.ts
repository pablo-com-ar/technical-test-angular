import { Injectable } from '@angular/core';
import { HeroDto, HeroDtoToModel } from '../dto/hero.dto';
import { catchError, map, Observable, throwError } from 'rxjs';
import { InmemorystorageService } from './inmemorystorage.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private storage: InmemorystorageService) { }

  newHero(hero: HeroDto): Observable<number> {
    if (!hero.nombre || !hero.poder) throw new Error("Nombre y poder son obligatorios");

    return this.storage.create(HeroDtoToModel(hero)).pipe(
      map(hero => {
        if (!hero) throw new Error('No se pudo agregar el heroe');

        return hero;
      }),
      catchError(error => {
        return throwError(() => new Error('No se pudo obtener el heroe, intente mas tarde'));
      })
    )
  }

  getHeroById(id: number): Observable<HeroDto> {
    return this.storage.getById(id).pipe(
      map(hero => {
        if (!hero) throw new Error('No existe el heroe');
        
        return hero;
      }),
      catchError(error => {
        return throwError(() => new Error('No se pudo obtener el heroe, intente mas tarde'));
      })
    );
  }

  getAll(): Observable<HeroDto[]> {
    return this.storage.getAll().pipe(
      catchError(error => {
        return throwError(() => new Error('No se pudo obtener el heroe, intente mas tarde'));
      })
    )
  }

  filterBy(term: string): Observable<HeroDto[]> {
    return this.storage.filter(term);
  }

  updateHero(id: number, hero: HeroDto): void {
    this.storage.edit(id, hero);
  }

  delete(id: number): void {
    this.storage.deleteById(id);
  }
}
