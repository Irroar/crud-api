import request from 'supertest';
import { server } from '../src/index';
import {it, describe, expect} from 'vitest';

describe('Scenario 1 from the technical requirement', () => {
    it('Get all records with a GET api/users request (an empty array is expected)', async () => {
        const res = await request(server).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([]);
    });
    const objectForPost = {
        "username": "DRNaida",
        "age": 18,
        "hobbies": ["programming", "skating"]
    };
    let idForTesting;
    it('A new object is created by a POST api/users request (a response containing newly created record is expected)', async () => {
        const res = await request(server).post('/api/users').set('Accept', 'application/json').send(objectForPost);
        idForTesting = res.body.id;
        expect(res.statusCode).toBe(201);
        expect(res.body.username).toEqual("DRNaida");
        expect(res.body.age).toEqual(18);
        expect(res.body.hobbies).toEqual(["programming", "skating"]);
    });
    it('With a GET api/users/{userId} request, we try to get the created record by its id (the created record is expected)', async () => {
        const res = await request(server).get(`/api/users/${idForTesting}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.username).toEqual("DRNaida");
        expect(res.body.age).toEqual(18);
        expect(res.body.hobbies).toEqual(["programming", "skating"]);
    });
    const objectForPut = {
        "username": "NewDRNaida",
        "age": 19,
        "hobbies": ["programming", "skating"]
    };
    it('We try to update the created record with a PUT api/users/{userId}request (a response is expected containing an updated object with the same id)', async () => {
        const res = await request(server).put(`/api/users/${idForTesting}`).set('Accept', 'application/json').send(objectForPut);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toEqual(idForTesting);
        expect(res.body.username).toEqual("NewDRNaida");
        expect(res.body.age).toEqual(19);
        expect(res.body.hobbies).toEqual(["programming", "skating"]);
    });
    it('With a DELETE api/users/{userId} request, we delete the created object by id (confirmation of successful deletion is expected)', async () => {
        const res = await request(server).delete(`/api/users/${idForTesting}`);
        expect(res.statusCode).toBe(204);
    });
    it('With a GET api/users/{userId} request, we are trying to get a deleted object by id (expected answer is that there is no such object)', async () => {
        const res = await request(server).get(`/api/users/${idForTesting}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({message: 'User not found'});
    });
});

describe('Scenario 2 check for 400', () => {
    let idForTesting;
    it('GET with not uuid', async () => {
        const res = await request(server).get('/api/users/9b5afc5');
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({message: 'Not an uuid'});
    });
    const incorrectObjectForPost = {
        "username": "DRNaida",
        "hobbies": ["skating"]
    }
    it('POST without the required field age', async () => {
        const res = await request(server).post('/api/users').set('Accept', 'application/json').send(incorrectObjectForPost);;
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({message: 'incorrect data for new user'});
    });
    const objectForPut = {
        "username": "NewDRNaida",
        "age": 19,
        "hobbies": ["programming", "skating"]
    };
    it('PUT with not uuid', async () => {
        const res = await request(server).put('/api/users/43432').set('Accept', 'application/json').send(objectForPut);;
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({message: 'Not an uuid '});
    });
    it('DELETE with not uuid', async () => {
        const res = await request(server).delete('/api/users/9b5afc5');
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({message: 'Not an uuid'});
    });
    it('PUT with not uuid', async () => {
        const res = await request(server).post('/api/users').set('Accept', 'application/json').send(objectForPut);;
        idForTesting = res.body.id;
        const res1 = await request(server).put(`/api/users/${idForTesting}`).set('Accept', 'application/json').send(incorrectObjectForPost);;
        expect(res1.statusCode).toBe(400);
        expect(res1.body).toEqual({message: 'incorrect data to update user'});
    });
    const incorrectObjectForPut2 = {
        "username": "NewDRNaida",
        "age": 19,
        "hobbies": ["programming", 8]
    };
    it('POST without the required field age', async () => {
        const res = await request(server).post('/api/users').set('Accept', 'application/json').send(incorrectObjectForPut2);;
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({message: 'incorrect data for new user'});
    });
});

describe('Scenario 2 check for 404', () => {
    it('GET with uuid that does not exist', async () => {
        const res = await request(server).get('/api/users/78310bf7-3b19-4374-bc32-efd722c55483');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({message: 'User not found'});
    });
    it('PUT with uuid that does not exist', async () => {
        const res = await request(server).put('/api/users/78310bf7-3b19-4374-bc32-efd722c55483');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({message: 'User not found'});
    });
    it('DELETE with uuid that does not exist', async () => {
        const res = await request(server).delete('/api/users/78310bf7-3b19-4374-bc32-efd722c55483');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({message: 'User not found'});
    });
    it('GET to route that does not exist', async () => {
        const res = await request(server).get('/api/players');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({message: 'Route not found'});
    });
    it('POST to route that does not exist', async () => {
        const res = await request(server).post('/api/players');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({message: 'Route not found'});
    });
    it('GET concrete user to the route that does not exist', async () => {
        const res = await request(server).get('/api/players/78310bf7-3b19-4374-bc32-efd722c55483');
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({message: 'Route not found'});
    });
});