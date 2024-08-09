import { Component, OnInit, ViewChild } from '@angular/core';
import { HeroDto } from '../../storage/dto/hero.dto';
import { HeroService } from '../../storage/services/hero.service';
import { MatDialog } from '@angular/material/dialog';
import { HeroDialogComponent } from '../hero-dialog/hero-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HeroConfirmDialogComponent } from '../hero-confirm-dialog/hero-confirm-dialog.component';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrl: './hero-list.component.css'
})
export class HeroListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'poder', 'descripcion', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  heroes = new MatTableDataSource();
  searchTerm: string = '';

  constructor(private dialog: MatDialog, private heroService: HeroService) {}

  ngOnInit() {
    this.heroService.getAll().subscribe(heros => {
      this.heroes.data = heros;
      this.heroes.paginator = this.paginator;
    });
  }

  addHero(): void {
    this.openDialog();
  }

  editHero(hero: HeroDto): void {
    this.openDialog(hero, true);
  }

  viewHero(hero: HeroDto): void {
    this.openDialog(hero, false);
  }

  deleteHero(hero: HeroDto): void {
    const dialogRef = this.dialog.open(HeroConfirmDialogComponent, {
      width: '250px',
      data: `¿Estás seguro que deseas eliminar a ${hero.nombre}?`
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.heroService.delete(hero.id);
      }
    });
  }

  openDialog(hero?: HeroDto, editable: boolean = true): void {
    const dialogRef = this.dialog.open(HeroDialogComponent, {
      width: '300px',
      data: { hero: hero ? { ...hero } : { name: '', power: '', description: '' }, editable: editable }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (hero) {
          this.heroService.updateHero(hero.id, result);
        } else {
          this.heroService.newHero(result);
        }
      }
    });
  }

  applyFilter(): void {
    this.heroes.filter = this.searchTerm;
  }
}
