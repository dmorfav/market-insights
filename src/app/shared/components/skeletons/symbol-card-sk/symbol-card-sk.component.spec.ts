import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolCardSKComponent } from './symbol-card-sk.component';

describe('SymbolCardSKComponent', () => {
  let component: SymbolCardSKComponent;
  let fixture: ComponentFixture<SymbolCardSKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymbolCardSKComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(SymbolCardSKComponent);
    await fixture.whenStable();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
