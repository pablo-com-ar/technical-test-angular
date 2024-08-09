import { HeroDto } from '../../storage/dto/hero.dto';

export interface IDialogData {
  hero: HeroDto,
  editable: boolean;
}