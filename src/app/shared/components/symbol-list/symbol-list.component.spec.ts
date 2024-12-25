import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SymbolListComponent} from './symbol-list.component';
import {FinanceService} from '../../../core/services/finance/finance.service';
import {FINANCE_PROVIDER} from '../../../core/providers/finance.provider';
import {MockFinanceProvider} from '../../../../mocks/FinanceProvider.mocks';

describe('SymbolListComponent', () => {
  let component: SymbolListComponent;
  let fixture: ComponentFixture<SymbolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymbolListComponent],
      providers: [
        FinanceService, // Registrar el servicio bajo prueba
        { provide: FINANCE_PROVIDER, useClass: MockFinanceProvider } // Registrar el mock para el token
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymbolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
