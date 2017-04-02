import { KniejaAppPage } from './app.po';

describe('knieja-app App', () => {
  let page: KniejaAppPage;

  beforeEach(() => {
    page = new KniejaAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
