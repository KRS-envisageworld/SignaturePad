import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriviewComponent } from './priview.component';

describe('PriviewComponent', () => {
  let component: PriviewComponent;
  let fixture: ComponentFixture<PriviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
