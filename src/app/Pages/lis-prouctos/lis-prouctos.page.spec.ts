import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LisProuctosPage } from './lis-prouctos.page';

describe('LisProuctosPage', () => {
  let component: LisProuctosPage;
  let fixture: ComponentFixture<LisProuctosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LisProuctosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LisProuctosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
