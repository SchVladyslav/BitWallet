import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-lang',
  templateUrl: './select-lang.component.html',
  styleUrls: ['./select-lang.component.scss']
})
export class SelectLangComponent implements OnInit {

  languages: string[];

  constructor() { }

  ngOnInit(): void {
    this.languages = ['English', 'Ukrainian'];
  }

}
