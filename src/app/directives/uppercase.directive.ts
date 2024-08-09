import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective implements OnChanges {
  @Input() appUppercase!: string;
  
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appUppercase']) {
      this.transformToUppercase();
    }
  }

  private transformToUppercase(): void {
    this.el.nativeElement.innerText = this.appUppercase.toUpperCase();
  }

}
