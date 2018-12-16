import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses-controls',
  templateUrl: './courses-controls.component.html',
  styleUrls: ['./courses-controls.component.css']
})
export class CoursesControlsComponent implements OnInit {
  public searchingCourseName: string;

  constructor() { }

  ngOnInit() {
  }

  onSearch(): void {
    console.log(this.searchingCourseName);
  }

}
