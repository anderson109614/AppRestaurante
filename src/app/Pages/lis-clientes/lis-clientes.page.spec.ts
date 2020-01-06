import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LisClientesPage } from './lis-clientes.page';

describe('LisClientesPage', () => {
  let component: LisClientesPage;
  let fixture: ComponentFixture<LisClientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LisClientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LisClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
