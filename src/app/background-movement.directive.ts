import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appBackgroundMovement]'
})
export class BackgroundMovementDirective {
  @Input() movementStrength = 15;
  @HostBinding('style.background-position') backgroundPosition = '';

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const pageX = e.pageX - (window.outerWidth /2);
    const pageY = e.pageY - (window.outerHeight /2);

    const newX = (pageX / window.outerWidth) * this.movementStrength * -1;
    const newY = (pageY / window.outerHeight) * this.movementStrength * -1;

    this.backgroundPosition = 'calc( 50% + ' + newX + 'px ) calc( 50% + ' + newY + 'px )';
  }
}
