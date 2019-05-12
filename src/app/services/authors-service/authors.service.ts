import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAuthor } from 'src/app/entities/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private readonly BASE_URL = 'http://localhost:3004/authors';

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${this.BASE_URL}`);
  }

  searchAuthors(param: string): Observable<IAuthor[]> {
    return this.http.get<IAuthor[]>(`${this.BASE_URL}?textFragment=${param}`);
  }
}
