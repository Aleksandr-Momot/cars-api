export interface IOwner {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    cars: ICar[];
}

export interface ICar {
    number: string;
    name: string;
    model: string;
    year: number;
    id: string;
}