import { InMemoryDbService } from 'angular-in-memory-web-api';

export class inMemoryDb implements InMemoryDbService {
  createDb() {
    const owners = [
    {   
        id: 0,
        firstName: 'Алексей',
        lastName: 'Иванов',
        middleName: 'Викторович',
        cars: [
            {
                number: 'АХ2929АХ',
                name: 'Lamborgini',
                model: 'Aventador SVJ',
                year: 2015  
            },
            {
                number: 'АХ2288АХ',
                name: 'McLaren',
                model: 'F1',
                year: 2018
            } 
        ] 
    },
    {   
        id: 1,
        firstName: 'Максим',
        lastName: 'Антошин',
        middleName: 'Максимович',
        cars: [
            {
                number: 'АХ1111АХ',
                name: 'BMW',
                model: 'M8 Competition',
                year: 2021 
            },
            {
                number: 'АХ2222АХ',
                name: 'Range-Rover',
                model: 'Vogue',
                year: 2008 
            },
            {
                number: 'АХ3333АХ',
                name: 'Porsche',
                model: 'Cayman',
                year: 2010
            } 
        ]  
    },
    {   
        id: 2,
        firstName: 'Мария',
        lastName: 'Никифорова',
        middleName: 'Дмитриевна',
        cars: [
            {
                number: 'АХ0000АХ',
                name: 'Bentley',
                model: 'Bentayga',
                year: 2019 
            }  
        ] 
    },
    {   
        id: 3,
        firstName: 'Виктория',
        lastName: 'Андрияш',
        middleName: 'Владимировна',
        cars: [
            {
                number: 'АХ6666АХ',
                name: 'Pagani',
                model: 'Zonda',
                year: 2020 
            },
            {
                number: 'АХ8888АХ',
                name: 'Ferrari',
                model: 'Berlinetta',
                year: 2015 
            } 
        ] 
    },
      
    ];
    return { owners };
  }
}
