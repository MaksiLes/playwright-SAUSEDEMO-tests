import { test, expect, request } from '@playwright/test';

test('API tests GET users (page=2) for Reqres', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users?page=2', {
    headers: {
      Accept: 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
  });
  const responseJson = await response.json();
  console.log(responseJson);
  expect(response.status()).toBe(200);
  expect(responseJson.page).toEqual(2);
  expect(responseJson.data.length).toBe(6);
  expect(responseJson.data[0].id).toBe(7);
});

test('API tests GET single user (id=2) for Reqres', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/2', {
    headers: {
      Accept: 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
  });
  const responseJson = await response.json();
  console.log(responseJson);
  expect(response.status()).toBe(200);
  expect(responseJson.data.id).toEqual(2);
});

test('Api test POST create user for Reqres', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/users', {
    headers: {
      Accept: 'application/json',
      'x-api-key': 'reqres-free-v1',
      'User-Agent': 'PostmanRuntime/7.39.0',
    },
    data: {
      name: 'Olesia',
      job: 'QA Engineer',
    },
  });
  const responseJson = await response.json();
  console.log(responseJson);
  expect(response.status()).toBe(201);
  expect(responseJson.job).toEqual('QA Engineer');
});

test('API tests PUT update user (id=2) for Reqres', async ({ request }) => {
  const response = await request.put('https://reqres.in/api/users/2', {
    headers: {
      Accept: 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
    data: {
      name: 'Olesia',
      job: 'Automation QA',
    },
  });
  const responseJson = await response.json();
  console.log(responseJson);
  expect(response.status()).toBe(200);
  expect(responseJson.job).toEqual('Automation QA');
});

test('API tests DELETE user (id=2) for Reqres', async ({ request }) => {
  const response = await request.delete('https://reqres.in/api/users/2', {
    headers: {
      Accept: 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
  });
  expect(response.status()).toBe(204);
});

test('API tests GET single user (id=23) for Reqres - negative', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users/23', {
    headers: {
      Accept: 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
  });
  const responseJson = await response.json();
  console.log(responseJson);
  expect(response.status()).toBe(404);
  expect(responseJson).toEqual({});
});
