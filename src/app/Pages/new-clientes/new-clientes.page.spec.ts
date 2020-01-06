import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewClientesPage } from './new-clientes.page';

describe('NewClientesPage', () => {
  let component: NewClientesPage;
  let fixture: ComponentFixture<NewClientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
