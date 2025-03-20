import request from 'supertest';
import app from '../../app';

describe('Tasks', () => {
    it('Call /api/tasksList route', async () => {
        const response = await request(app).get('/api/tasksList');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('tasks');
    });
});
