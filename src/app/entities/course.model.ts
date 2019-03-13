export interface ICourse {
  id: number;
  name: string;
  date: Date;
  length: number;
  description: string;
  isTopRated: boolean;
}

export class Course implements ICourse {
  id: number;
  name: string;
  date: Date;
  length: number;
  description: string;
  isTopRated: boolean;

  constructor(data: ICourse) {
    this.id = data.id;
    this.name = data.name;
    this.date = data.date;
    this.length = data.length;
    this.description = data.description;
    this.isTopRated = data.isTopRated;
  }
}
