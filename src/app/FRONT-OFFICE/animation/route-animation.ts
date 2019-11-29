import {
  trigger,
  state,
  style,
  animate,
  transition, query, group
} from '@angular/animations';

export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(' :enter , :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }),
      ], { optional: true }),
      query(':enter', [
        animate('600ms ease',
          style({opacity: 1 , transform: 'scale(1) translateY(0)'})
        )
      ], { optional: true })
    ])
  ]);



export const bassemAnimation =
  trigger('routeAnimations', [
    state('', style({
      width: 120,
      transform: 'translateX(0)', opacity: 1
    })),
    transition('* => *', [
      style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
      group([
        animate('0.3s 0.1s ease', style({
          transform: 'translateX(0)',
          width: 120
        })),
        animate('0.3s ease', style({
          opacity: 1
        }))
      ])
    ]),
    transition('* => void', [
      group([
        animate('0.3s ease', style({
          transform: 'translateX(50px)',
          width: 10
        })),
        animate('0.3s 0.2s ease', style({
          opacity: 0
        }))
      ])
    ])
  ]);


export const slider =
  trigger('routeAnimations', [
    transition('* => homeAnimation', slideTo('left')),
    transition('* => contactAnimation', slideTo('right')),
    transition('contactAnimation => *', slideTo('left')),
    transition('homeAnimation => *', slideTo('right')),
    transition('homeAnimation => aboutAnimation', slideTo('left')),
    transition('contactAnimation => aboutAnimation', slideTo('right')),

  ]);

function slideTo(direction) {
  const optional = {optional: true};
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        width: '100%',
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100% ' })
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({[direction]: '100%'}))
      ], optional ),
      query(':enter', [
        animate('600ms ease', style({[direction]: '0%'}))
      ]),
    ]),
  ];
}
