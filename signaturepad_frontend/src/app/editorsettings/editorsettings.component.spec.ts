import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorsettingsComponent } from './editorsettings.component';

describe('EditorsettingsComponent', () => {
  let component: EditorsettingsComponent;
  let fixture: ComponentFixture<EditorsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorsettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditorsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
