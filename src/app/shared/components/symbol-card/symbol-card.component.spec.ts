import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolCardComponent } from './symbol-card.component';

describe('SymbolCardComponent', () => {
  let component: SymbolCardComponent;
  let fixture: ComponentFixture<SymbolCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymbolCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymbolCardComponent);
    fixture.componentRef.setInput('symbol', {displaySymbol: 'AAPL', description: 'Apple Inc.'});
    fixture.componentRef.setInput('isFavorite', false);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
