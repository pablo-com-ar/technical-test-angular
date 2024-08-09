import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDialogData } from '../interface/dialog-data';

@Component({
  selector: 'app-hero-dialog',
  templateUrl: './hero-dialog.component.html',
  styleUrl: './hero-dialog.component.css'
})
export class HeroDialogComponent implements OnInit {
  heroForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<HeroDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IDialogData, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.heroForm = this.fb.group({
      nombre: [{ value: this.data.hero.nombre, disabled: !this.data.editable }, Validators.required],
      poder: [{ value: this.data.hero.poder, disabled: !this.data.editable }, Validators.required],
      descripcion: [{ value: this.data.hero.descripcion, disabled: !this.data.editable }]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.heroForm.valid) {
      this.dialogRef.close(this.heroForm.value);
    }
  }
}
