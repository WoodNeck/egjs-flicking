import { Directive } from '@angular/core';

@Directive({
  selector: '[egNgxFlickingPanel]'
})
export class NgxFlickingPanelDirective {

  constructor() {
    console.log('### NgxFlickingPanelDirective created.');
  }

}
