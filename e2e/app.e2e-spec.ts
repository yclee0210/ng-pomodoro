import { NgPomodoroPage } from './app.po';

describe('ng-pomodoro App', function() {
  let page: NgPomodoroPage;

  beforeEach(() => {
    page = new NgPomodoroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
