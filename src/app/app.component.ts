import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {

  shade = 2
  tilt = -45
  
  heating = 35
  inactive = 50
  cooling = 15

  components;
  gradientString;

  error = false;

  getBackground(heating, inactive, cooling) {

    let blocks = [];
    const gestLastEndValue = (arr) => (((arr || []).slice(-1)[0] || {}).end || 0);
    if (heating) {
      blocks.push({
        start: gestLastEndValue(blocks),
        end: gestLastEndValue(blocks) + (heating / 2),
        color: 'red',
      });
    }
    if (inactive) {
      blocks.push({
        start: gestLastEndValue(blocks),
        end: gestLastEndValue(blocks) + (inactive / 2),
        color: 'white',
      });
    }
    if (cooling) {
      blocks.push({
        start: gestLastEndValue(blocks),
        end: gestLastEndValue(blocks) + cooling,
        color: 'blue',
      });
    }
    if (inactive) {
      blocks.push({
        start: gestLastEndValue(blocks),
        end: gestLastEndValue(blocks) + (inactive / 2),
        color: 'white',
      });
    }
    if (heating) {
      blocks.push({
        start: gestLastEndValue(blocks),
        end: gestLastEndValue(blocks) + (heating / 2),
        color: 'red',
      });
    }

    this.components = blocks;

    let gradient = blocks.map(el => `${el.color} ${el.start + this.shade}%, ${el.color} ${el.end - this.shade}%`);
    const firstBlock = (blocks || [])[0] || {};
    const lastBlock = (blocks || []).slice(-1)[0] || {};
    const gradientStart = `${lastBlock.color} ${firstBlock.start}%`;
    const gradientEnd = `${firstBlock.color} ${lastBlock.end}%`;

    gradient = [/* gradientStart, */ ...gradient, /* gradientEnd */];

    this.gradientString = gradient;

    return `conic-gradient(from ${this.tilt}deg, ${gradient.join(', ')}) 50% 50% / 100% 100% no-repeat`;

  }

}
