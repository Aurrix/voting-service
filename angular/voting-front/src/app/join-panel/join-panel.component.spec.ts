import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinPanelComponent } from './join-panel.component';

describe('JoinPanelComponent', () => {
  let component: JoinPanelComponent;
  let fixture: ComponentFixture<JoinPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
