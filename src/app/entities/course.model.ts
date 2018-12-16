export interface CourseInterface {
  id: number;
  title: string;
  created: Date;
  duration: number;
  description: string;
}

export class Course implements CourseInterface {
  id: number;
  title: string;
  created: Date;
  duration: number;
  description: string;

  constructor() { }
}
