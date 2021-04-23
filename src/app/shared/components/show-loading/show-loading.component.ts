import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-loading',
  templateUrl: './show-loading.component.html',
  styleUrls: ['./show-loading.component.scss'],
})
export class ShowLoadingComponent implements OnInit {
  @Input() class!: string;
  @Input() arrayLength!: number;
  @Input() option!: number;

  array: number[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let index = 0; index < this.arrayLength; index++) {
      const element = index;
      this.array.push(element);
    }
  }
}
