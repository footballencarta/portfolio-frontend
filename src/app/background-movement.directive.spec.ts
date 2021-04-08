import { BackgroundMovementDirective } from './background-movement.directive';

describe('BackgroundMovementDirective', () => {
  it('should create an instance', () => {
    const directive = new BackgroundMovementDirective();
    expect(directive).toBeTruthy();
  });

  it('should be zero on center', () => {
    spyOnProperty(window, 'outerWidth').and.returnValue(640);
    spyOnProperty(window, 'outerHeight').and.returnValue(480);

    const directive = new BackgroundMovementDirective();

    expect(directive.backgroundPosition).toEqual('');

    directive.onMouseMove(new MouseEvent('test', {
      screenX: 640,
      screenY: 480,
      clientX: 320,
      clientY: 240
    }));

    expect(directive.backgroundPosition).toEqual('calc( 50% + 0px ) calc( 50% + 0px )');
  });

  it('should be max at extremity', () => {
    /**
     * Max value here is:
     *
     * pageX = 0 - (640 / 2) = -320
     * newX = (-320 / 640) = -0.5
     *        * 15 = -7.5
     *        * -1 = 7.5px
     */
    spyOnProperty(window, 'outerWidth').and.returnValue(640);
    spyOnProperty(window, 'outerHeight').and.returnValue(480);

    const directive = new BackgroundMovementDirective();

    expect(directive.backgroundPosition).toEqual('');

    directive.onMouseMove(new MouseEvent('test', {
      screenX: 640,
      screenY: 480,
      clientX: 0,
      clientY: 0
    }));

    expect(directive.backgroundPosition).toEqual('calc( 50% + 7.5px ) calc( 50% + 7.5px )');
  });
});
