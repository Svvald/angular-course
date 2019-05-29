import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ICourse } from 'src/app/entities/course.model';
import { CoursesService } from './courses.service';

describe('CourseService', () => {
  let httpTestingController: HttpTestingController;
  let service: CoursesService;

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
      const mockResponse: ICourse = {
        id: 0,
        name: '',
        length: 0,
        authors: [],
        date: new Date(0),
        description: '',
        isTopRated: false,
      };

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
  });
});
