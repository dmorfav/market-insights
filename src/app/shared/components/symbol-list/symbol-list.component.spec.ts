import {ComponentFixture, TestBed} from '@angular/core/testing';
import {SymbolListComponent} from './symbol-list.component';
import {FinanceService} from '../../../core/services/finance/finance.service';
import {LocalService} from '../../../core/services/storage/local.service';
import {ExSymbol} from '../../models/Interface/symbol';
import {signal} from '@angular/core';

describe('SymbolListComponent', () => {
  let component: SymbolListComponent;
  let fixture: ComponentFixture<SymbolListComponent>;
  let financeService: jasmine.SpyObj<FinanceService>;
  let mockSymbol: ExSymbol = {symbol: 'AAPL', description: 'Apple Inc.', displaySymbol: 'AAPL'};

  beforeEach(async () => {
    const financeServiceSpy = jasmine.createSpyObj('FinanceService', ['getSymbolList']);

    await TestBed.configureTestingModule({
      imports: [SymbolListComponent],
      providers: [
        {provide: FinanceService, useValue: financeServiceSpy},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SymbolListComponent);
    component = fixture.componentInstance;
    financeService = TestBed.inject(FinanceService) as jasmine.SpyObj<FinanceService>;

    // Mock the symbol list
    financeService.getSymbolList.and.returnValue(signal<ExSymbol[]>([mockSymbol]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the symbol list on init', () => {
    component.ngOnInit();
    expect(financeService.getSymbolList).toHaveBeenCalled();
    expect(component['symbolList']()).toEqual([mockSymbol]);
  });

  it('should load favorites from LocalStorage on init', () => {
    spyOn(LocalService, 'getItem').and.returnValue(JSON.stringify(['AAPL']));

    component.ngOnInit();

    expect(LocalService.getItem).toHaveBeenCalledWith('favorites');
    expect(component.isFavorite(mockSymbol)).toBeTrue();
  });

  it('should toggle favorite status and save to LocalStorage', () => {
    spyOn(LocalService, 'setItem');
    component.toggleFavorite(mockSymbol);

    expect(component.isFavorite(mockSymbol)).toBeTrue();

    component.toggleFavorite(mockSymbol);

    expect(component.isFavorite(mockSymbol)).toBeFalse();
    expect(LocalService.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([])
    );
  });

  it('should handle empty or invalid favorites in LocalStorage gracefully', () => {
   spyOn(LocalService, 'getItem').and.returnValue(null);
    component.ngOnInit();

    expect(component.isFavorite(mockSymbol)).toBeFalse();
    expect(() => component.ngOnInit()).not.toThrow();
  });
});
