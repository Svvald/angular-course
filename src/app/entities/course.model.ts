import { IAuthor } from './author.model';

export interface ICourse {
  id: number;
  name: string;
  date: Date;
  length: number;
  description: string;
  isTopRated: boolean;
  authors: IAuthor[];
}

export class Course implements ICourse {
  id: number;
  name: string;
  date: Date;
  length: number;
  description: string;
  isTopRated: boolean;
  authors: IAuthor[];

  constructor(data: ICourse) {
    this.id = data.id;
    this.name = data.name;
    this.date = data.date;
    this.length = data.length;
    this.description = data.description;
    this.isTopRated = data.isTopRated;
    this.authors = data.authors;
  }
}
