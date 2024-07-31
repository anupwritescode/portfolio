import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, concatMap, delay, from, of } from 'rxjs';
import * as skills from '../../assets/skills.json';

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
Welcome to my site.`;

  DELAY_CONST: number = 75;
  grid: number[][] = [];
  startSnakeGame: boolean = false;
  skills: any = skills;
  

  constructor() { }

  ngOnInit(): void {
    this.updateText();
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
      }
    });
  }
}
