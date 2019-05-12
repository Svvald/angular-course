import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course } from '../../entities/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  private readonly BASE_URL = 'http://localhost:3004/courses';

  constructor(private http: HttpClient) { }

  getCourses(count: number): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.BASE_URL}?count=${count}`);
  }

  getCourse(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.BASE_URL}/${id}`);
  }

  searchCourses(param: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.BASE_URL}?textFragment=${param}`);
  }

  updateCourse(data: Course): Observable<Course> {
    return this.http.post<Course>(`${this.BASE_URL}/${data.id}`, data);
  }

  createCourse(data: Course): Observable<Course> {
    return this.http.post<Course>(`${this.BASE_URL}/new`, data);
  }

  deleteCourse(id: number): Observable<Course> {
    return this.http.delete<Course>(`${this.BASE_URL}/${id}`);
  }
}
