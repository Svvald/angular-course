export interface CourseInterface {
  id: number;
  title: string;
  created: Date;
  duration: number;
  description: string;
  topRated: boolean;
}

export class Course implements CourseInterface {
  id: number;
  title: string;
  created: Date;
  duration: number;
  description: string;
  topRated: boolean;

  constructor() { }
}
