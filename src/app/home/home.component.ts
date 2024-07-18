import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, concatMap, delay, from, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  text: string = "";
  dots: string = "";
  spaces: string = "";
  textContent: string = 
`Hi there! 
I'm Anup, a web developer
from Pune, India. 
Welcome to my site`;

  DELAY_CONST: number = 50;
  grid: number[][] = [];
  startSnakeGame: boolean = false;


  constructor() { }

  ngOnInit(): void {
    this.updateText();
    this.fillGrid();
  }

  createObs(someText: string) {
    const contArr = someText.split("");
    const text = from(contArr);
    return text.pipe(
      concatMap(t => of(t).pipe(delay(this.DELAY_CONST)))
    );
  }

  updateText() {

    this.createObs(this.textContent).subscribe({
      next: (t) => {
        this.text += t;
      },
      complete: () => {
        this.addDots();
      },
    });
  }

  addDots() {
    this.createObs("...").subscribe({
      next: (t) => {
        this.dots += t;
      },
      complete: () => {
        this.addSpaces();
      },
    });
  }

  whereToAddR = 13;
  whereToAddC = 0;
  added = 0;
  addSpaces() {
    const moveDots = this.createObs("                                         ");
    moveDots.subscribe({
      next: (t) => {
        this.spaces += t;
        const h1 = document.querySelector("div h1");
        const pre = document.querySelector("div h1 pre");
        if(h1 && pre) {
          const isOverFlowing = pre?.clientWidth > h1?.clientWidth;
          if(isOverFlowing) this.startSnakeGame = true;
          if(isOverFlowing && this.added < 3) {
            this.grid[this.whereToAddR][this.whereToAddC++] = 1;
            this.added++;
          }
          if(this.added > 3) {
            // start snake game
          }
        }
      },
      complete: () => {
      }
    });
  }

  fillGrid() {
    for(let i=0 ; i<20; i++) {
      this.grid.push([]);
      for(let j = 0; j < 20; j++) {
        this.grid[i].push(0);
      }
    }
  }

}
