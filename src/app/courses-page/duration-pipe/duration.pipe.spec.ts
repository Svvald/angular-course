import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('leaves value below 60 minutes without changes', () => {
    expect(pipe.transform(50)).toBe('50min');
  });

  it('converts values divisible to 60 minutes to hours only', () => {
    expect(pipe.transform(120)).toBe('2h');
  });

  it('converts minutes values non-divisible by 60 to hours and minutes', () => {
    expect(pipe.transform(333)).toBe('5h 33min');
  });
});
