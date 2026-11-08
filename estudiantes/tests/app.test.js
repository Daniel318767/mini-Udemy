const request = require('supertest');
const app = require('../src/app');
const pool = require('../src/db');

afterAll(async () => {
    await pool.end();
});

test('E1 - GET /health responde correctamente', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.servicio).toBe('estudiantes');
});

test('E2 - GET /estudiantes devuelve una lista', async () => {
    const response = await request(app).get('/estudiantes');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
});

test('E3 - GET /estudiantes/1 devuelve un estudiante existente', async () => {
    const response = await request(app).get('/estudiantes/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(1);
});

test('E4 - GET /estudiantes/9999 responde 404', async () => {
    const response = await request(app).get('/estudiantes/9999');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Estudiante no encontrado');
});

test('E5 - POST /estudiantes sin email responde 400', async () => {
    const response = await request(app).post('/estudiantes').send({ nombre: 'Sin Email' });
    expect(response.statusCode).toBe(400);
});

test('E6 - POST /estudiantes crea un estudiante válido', async () => {
    let id;
    try {
        const response = await request(app)
            .post('/estudiantes')
            .send({ nombre: 'Prueba Jest', email: `jest-${Date.now()}@correo.com` });
        id = response.body.id;
        expect(response.statusCode).toBe(201);
        expect(id).toBeDefined();
    } finally {
        if (id) await pool.query('DELETE FROM estudiantes WHERE id = $1', [id]);
    }
});

test('E7 - POST /estudiantes con email repetido responde 409', async () => {
    const response = await request(app)
        .post('/estudiantes')
        .send({ nombre: 'Duplicado', email: 'ana@correo.com' });
    expect(response.statusCode).toBe(409);
});
