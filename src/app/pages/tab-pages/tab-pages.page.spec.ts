import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPagesPage } from './tab-pages.page';

describe('TabPagesPage', () => {
  let component: TabPagesPage;
  let fixture: ComponentFixture<TabPagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPagesPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
