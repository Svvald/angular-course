export interface ICourse {
  id: number;
  title: string;
  created: Date;
  duration: number;
  description: string;
  topRated: boolean;
}

export class Course implements ICourse {
  id: number;
  title: string;
  created: Date;
  duration: number;
  description: string;
  topRated: boolean;

  constructor(data: ICourse) {
    this.id = data.id;
    this.title = data.title;
    this.created = data.created;
    this.duration = data.duration;
    this.description = data.description;
    this.topRated = data.topRated;
  }
}
