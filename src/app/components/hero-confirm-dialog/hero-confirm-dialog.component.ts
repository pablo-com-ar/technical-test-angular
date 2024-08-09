import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-confirm-dialog',
  templateUrl: './hero-confirm-dialog.component.html',
  styleUrl: './hero-confirm-dialog.component.css'
})
export class HeroConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<HeroConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
