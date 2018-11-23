import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignslistComponent } from './campaignslist.component';

describe('CampaignslistComponent', () => {
  let component: CampaignslistComponent;
  let fixture: ComponentFixture<CampaignslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
