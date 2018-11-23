import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesigncampaignComponent } from './designcampaign.component';

describe('DesigncampaignComponent', () => {
  let component: DesigncampaignComponent;
  let fixture: ComponentFixture<DesigncampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesigncampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesigncampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
