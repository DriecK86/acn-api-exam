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
When(
  'I search for season {string} and circuits {string}',
  async (season: number, circuits: number) => {
    var endPoint = '/' + season + '/' + circuits;
    //pass the endpoint to supertest
    const request = supertest(baseUrl);
    //then use the baseUrl to complete the endpoint as response
    const response = await request.get(endPoint);
    //and use it to get api status code and response
    apistatusCode = response.statusCode;
    apiResponse = response.text;
  }
);
Then('there should be a list returned from that search', async () => {
  //validate statuscode
  //console.log(await apistatusCode) -- I had just check if I am able to get the status
  expect(apistatusCode).toEqual(200);

  //validate if text contain Locality to check the response - happy path but null for 1950
  //validate if text contain UAE to check the response
  //will fail at 1996 and 1950 since there are no record for UAE on those year
  //console.log(await apiResponse); -- I had just check if I am able to get the response from the body
  expect(apiResponse).toContain('Locality');
});
