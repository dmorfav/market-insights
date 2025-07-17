import { input, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolCardComponent } from './symbol-card.component';

describe('SymbolCardComponent', () => {
  let component: SymbolCardComponent;
  let fixture: ComponentFixture<SymbolCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymbolCardComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymbolCardComponent);
    fixture.componentRef.setInput('symbol', { displaySymbol: 'AAPL', description: 'Apple Inc.' });
    fixture.componentRef.setInput('isFavorite', false);
    await fixture.whenStable();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleFavorite when onToggleFavorite is called', () => {
    spyOn(component.toggleFavorite, 'emit');

    component.onToggleFavorite();

    expect(component.toggleFavorite.emit).toHaveBeenCalled();
  });

  it('should emit toggleFavorite when the card is clicked', () => {
    spyOn(component.toggleFavorite, 'emit');
    const cardElement = fixture.nativeElement.querySelector('.symbol-card');

    cardElement.click();

    expect(component.toggleFavorite.emit).toHaveBeenCalled();
  });

  it('should apply "favorite" class if isFavorite is true', () => {
    fixture.componentRef.setInput('isFavorite', true);
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('.symbol-card');
    expect(cardElement.classList).toContain('favorite');
  });

  it('should not apply "favorite" class if isFavorite is false', () => {
    fixture.componentRef.setInput('isFavorite', false);
    fixture.detectChanges();

    const cardElement = fixture.nativeElement.querySelector('.symbol-card');
    expect(cardElement.classList).not.toContain('favorite');
  });
});
