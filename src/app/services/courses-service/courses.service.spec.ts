import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICourse } from 'src/app/entities/course.model';
import { CoursesService } from './courses.service';

describe('CourseService', () => {
  let httpTestingController: HttpTestingController;
  let service: CoursesService;

  const mockCourse: ICourse = {
    id: 0,
    name: '',
    length: 0,
    authors: [],
    date: new Date(0),
    description: '',
    isTopRated: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CoursesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('WHILE fetching courses data', () => {
    it('should make a GET request to /courses/id and return single course data', () => {
      const mockResponse = Object.assign(mockCourse, {});

      service.getCourse(0).subscribe(res => {
        expect(res.id).toEqual(0);
        expect(res.name).toEqual('');
        expect(res.length).toEqual(0);
        expect(res.authors).toEqual([]);
        expect(res.date).toEqual(new Date(0));
        expect(res.description).toEqual('');
        expect(res.isTopRated).toEqual(false);
      });

      const req = httpTestingController.expectOne('http://localhost:3004/courses/0');
      expect(req.request.method).toEqual('GET');

      req.flush(mockResponse);
    });

    it('should make a GET request to /courses and return courses array', () => {
      const mockResponse = new Array<ICourse>(5);
      mockResponse.forEach((el, i) => {
        el = Object.assign(mockCourse, {});
        el.id = i;
      });

      service.getCourses(5).subscribe(res => {
        expect(res.length).toEqual(5);
        res.forEach((el, i) => {
          expect(el.id).toEqual(i);
          expect(el.name).toEqual('');
          expect(el.length).toEqual(0);
          expect(el.authors).toEqual([]);
          expect(el.date).toEqual(new Date(0));
          expect(el.description).toEqual('');
          expect(el.isTopRated).toEqual(false);
        });
      });

      const req = httpTestingController.expectOne('http://localhost:3004/courses?count=5');
      expect(req.request.method).toEqual('GET');

      req.flush(mockResponse);
    });

    it('should make a GET request to /courses and return courses array which contain entered text in name or desc', () => {
      const mockResponse = new Array<ICourse>(3);
      mockResponse.forEach((el, i) => {
        el = Object.assign(mockCourse, {});
        el.id = i;
      });

      service.searchCourses('Test').subscribe(res => {
        expect(res.length).toEqual(3);
        res.forEach(el => {
          expect((el.name.includes('Test') || el.description.includes('Test'))).toBeTruthy();
        });
      });

      const req = httpTestingController.expectOne('http://localhost:3004/courses?textFragment=Test');
      expect(req.request.method).toEqual('GET');

      req.flush(mockResponse);
    });
  });

  describe('WHILE editing courses data', () => {
    it('should make a POST request to /courses/:id and return edited course', () => {
      const editedCourse = Object.assign({}, mockCourse);
      mockCourse.name = 'Test';
      const mockResponse = Object.assign({}, editedCourse);

      service.updateCourse(editedCourse).subscribe(res => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne('http://localhost:3004/courses/0');
      expect(req.request.method).toEqual('POST');

      req.flush(mockResponse);
    });

    it('should make a POST request to /courses/new and return created course', () => {
      const mockResponse = Object.assign({}, mockCourse);

      service.createCourse(mockCourse).subscribe(res => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne('http://localhost:3004/courses/new');
      expect(req.request.method).toEqual('POST');

      req.flush(mockResponse);
    });

    it('should make a DELETE request to /courses/:id and return deleted course', () => {
      const mockResponse = Object.assign({}, mockCourse);

      service.deleteCourse(0).subscribe(res => {
        expect(res).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne('http://localhost:3004/courses/0');
      expect(req.request.method).toEqual('DELETE');

      req.flush(mockResponse);
    });
  });
});
