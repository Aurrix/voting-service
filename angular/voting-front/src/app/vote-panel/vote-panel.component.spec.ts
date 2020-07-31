import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotePanelComponent } from './vote-panel.component';

describe('VotePanelComponent', () => {
  let component: VotePanelComponent;
  let fixture: ComponentFixture<VotePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
