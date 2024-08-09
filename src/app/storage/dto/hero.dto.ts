import { HeroModel } from '../model/hero.model';

export interface HeroDto {
  id: number;
  nombre: string;
  poder: string;
  descripcion?: string;
}

export const HeroDtoToModel = (hero: HeroDto): HeroModel => {
  return {
    id: 0,
    nombre: hero.nombre,
    poder: hero.poder,
    descripcion: hero.descripcion
  }
}