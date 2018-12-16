export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
}

export class User implements UserInterface {
  id: number;
  firstName: string;
  lastName: string;

  constructor() { }
}
