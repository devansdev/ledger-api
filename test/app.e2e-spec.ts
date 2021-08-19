import request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { LedgerModule } from 'src/ledger/ledger.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, LedgerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/filter (GET)  GET FORTNIGHTLY', () => {
    return request(app.getHttpServer())
      .get('/filter?frequency=WEEKLY')
      .expect(200)
      .expect([[{start_date:'2020-03-28T06:06:46.000Z',end_date:'2020-04-03T06:06:46.000Z',line_item:555},{start_date:'2020-04-04T06:06:46.000Z',end_date:'2020-04-10T06:06:46.000Z',line_item:555},{start_date:'2020-04-11T06:06:46.000Z',end_date:'2020-04-17T06:06:46.000Z',line_item:555},{start_date:'2020-04-18T06:06:46.000Z',end_date:'2020-04-24T06:06:46.000Z',line_item:555},{start_date:'2020-04-25T06:06:46.000Z',end_date:'2020-05-01T06:06:46.000Z',line_item:555},{start_date:'2020-05-02T06:06:46.000Z',end_date:'2020-05-08T06:06:46.000Z',line_item:555},{start_date:'2020-05-09T06:06:46.000Z',end_date:'2020-05-15T06:06:46.000Z',line_item:555},{start_date:'2020-05-16T06:06:46.000Z',end_date:'2020-05-22T06:06:46.000Z',line_item:555},{start_date:'2020-05-23T06:06:46.000Z',end_date:'2020-05-27T06:06:46.000Z',line_item:396.43}]]);
  });

  it('/filter (GET)  GET FORTNIGHTLY', () => {
    return request(app.getHttpServer())
      .get('/filter?frequency=FORTNIGHTLY')
      .expect(200)
      .expect([[{"start_date":"2020-03-28T06:06:46.000Z","end_date":"2020-04-10T06:06:46.000Z","line_item":1110},{"start_date":"2020-04-11T06:06:46.000Z","end_date":"2020-04-24T06:06:46.000Z","line_item":1110},{"start_date":"2020-04-25T06:06:46.000Z","end_date":"2020-05-08T06:06:46.000Z","line_item":1110},{"start_date":"2020-05-09T06:06:46.000Z","end_date":"2020-05-22T06:06:46.000Z","line_item":1110},{"start_date":"2020-05-23T06:06:46.000Z","end_date":"2020-05-27T06:06:46.000Z","line_item":396.43}]]);
  });

  it('/filter (GET)  GET MONTHLY', () => {
    return request(app.getHttpServer())
      .get('/filter?start_date=2020-03-28T06%3A06%3A46.000Z&frequency=MONTHLY')
      .expect(200)
      .expect([[{"start_date":"2020-03-28T06:06:46.000Z","end_date":"2020-04-28T06:06:46.000Z","line_item":2411.61},{"start_date":"2020-04-29T06:06:46.000Z","end_date":"2020-05-27T06:06:46.000Z","line_item":2299.29}]]);
  });

  afterAll(async () => {
    await app.close();
  });
});
