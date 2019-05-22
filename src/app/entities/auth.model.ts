export interface IToken {
    token: string;
}

export interface IAuth {
    login: string;
    password: string;
}

export interface IUser {
    id: number;
    fakeToken: string;
    name: {
        first: string;
        last: string;
    };
    role: string;
}