import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelComponent } from './admin-panel.component';

describe('AdminPanelComponent', () => {
  let component: AdminPanelComponent;
  let fixture: ComponentFixture<AdminPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// = {
//   name: 'Test name',
//   description: 'Test description',
//   questions: [{
//     title: 'Employee of the Month',
//     description: 'Criteria on performance and targets',
//     responses: ['Andrew', 'Clara', 'John'],
//     active: false
//   },
//     {
//       title: 'Corporate Party Location',
//       description: 'Should we choose between the pub, cafe, restaurant?',
//       responses: ['Pub', 'Cafe', 'Restaurant'],
//       active: true
//     }],
//   participants: [
//     {name: 'George', observer: true},
//     {name: 'Andrew', observer: false},
//     {name: 'Alexi', observer: false},
//     {name: 'Foji', observer: false},
//     {name: 'Cork', observer: false},
//     {name: 'John', observer: false}
//   ]
// }
