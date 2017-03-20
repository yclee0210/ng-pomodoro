/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {ClarityModule} from 'clarity-angular';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture;
  let compiled;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        ClarityModule.forRoot()
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        AppComponent
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', async(() => {
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ng-Pomodoro');
  }));

  it('should render title in a h1 tag', async(() => {
    compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('span.title').textContent).toContain('ng-Pomodoro');
  }));
});
