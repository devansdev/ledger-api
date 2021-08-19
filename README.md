## Description

Ledger API written with [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app with following commands(please configure your .env file for database and the port)

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Before doing testing added some database entries like this
```
INSERT INTO `` (`id`,`frequency`,`weekly_rent`,`timezone`,`start_date`,`end_date`) VALUES (1,'FORTNIGHTLY',555,'Asia/Colombo','2020-03-28 11:36:46','2020-05-27 11:36:46');
INSERT INTO `` (`id`,`frequency`,`weekly_rent`,`timezone`,`start_date`,`end_date`) VALUES (2,'WEEKLY',555,'Asia/Colombo','2020-03-28 11:36:46','2020-05-27 11:36:46');
INSERT INTO `` (`id`,`frequency`,`weekly_rent`,`timezone`,`start_date`,`end_date`) VALUES (3,'MONTHLY',555,'Asia/Colombo','2020-03-28 11:36:46','2020-05-27 11:36:46');
INSERT INTO `` (`id`,`frequency`,`weekly_rent`,`timezone`,`start_date`,`end_date`) VALUES (4,'MONTHLY',555,'Asia/Colombo','2020-01-31 11:36:46','2020-05-27 11:36:46');
```
## API Documnetation 

<a href="http://localhost:3010/documentation/">http://localhost:3010/documentation/</a>

## Test

```bash

# e2e tests
$ npm run test:e2e
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
