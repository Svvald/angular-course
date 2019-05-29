/* tslint:disable:no-identical-functions */

import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should leave values below 60 minutes without changes', () => {
    expect(pipe.transform(12)).toBe('12min');
    expect(pipe.transform(30)).toBe('30min');
    expect(pipe.transform(57)).toBe('57min');
  });

  it('should convert values divisible to 60 minutes to hours only', () => {
    expect(pipe.transform(60)).toBe('1h');
    expect(pipe.transform(120)).toBe('2h');
    expect(pipe.transform(240)).toBe('4h');
  });

  it('should convert minutes values non-divisible by 60 to hours and minutes', () => {
    expect(pipe.transform(114)).toBe('1h 54min');
    expect(pipe.transform(333)).toBe('5h 33min');
    expect(pipe.transform(615)).toBe('10h 15min');
  });
});
