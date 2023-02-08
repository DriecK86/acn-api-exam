import { Given, When, Then } from '@wdio/cucumber-framework';
import supertest from 'supertest';

let baseUrl: string = '';
let apistatusCode: number;
let apiResponse: any;

Given(
  'that I visit the URL for Formula One race {string}',
  async (url: string) => {
    baseUrl = url;
  }
);
When('I search for season {string}', async (season: number) => {
  var endPoint = '/' + season;
  //pass the endpoint to supertest
  const request = supertest(baseUrl);
  //then use the baseUrl to complete the endpoint as response
  const response = await request.get(endPoint);
  //and use it to get api status code and response
  apistatusCode = response.statusCode;
  apiResponse = response.text;
});
Then(
  'there should be {string} circuits in the list returned',
  async (numberOfCircuits: number) => {
    //format number of series to be check against the response
    var series = 'total="' + numberOfCircuits + '"';
    //validate statuscode
    expect(apistatusCode).toEqual(200);
    //validate total series per season
    expect(apiResponse).toContain(series);
  }
);
