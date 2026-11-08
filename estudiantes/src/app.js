const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ estado: 'ok', servicio: 'estudiantes' });
});

app.get('/estudiantes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM estudiantes ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar estudiantes' });
    }
});

app.get('/estudiantes/:id', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM estudiantes WHERE id = $1', [req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al consultar estudiante' });
    }
});

app.post('/estudiantes', async (req, res) => {
    const { nombre, email } = req.body;
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y email son obligatorios' });
    }
    try {
        const result = await pool.query(
            'INSERT INTO estudiantes (nombre, email) VALUES ($1, $2) RETURNING *',
            [nombre, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }
        console.error(error);
        res.status(500).json({ error: 'Error al crear estudiante' });
    }
});

app.put('/estudiantes/:id', async (req, res) => {
    const { nombre, email } = req.body;
    if (!nombre || !email) {
        return res.status(400).json({ error: 'Nombre y email son obligatorios' });
    }
    try {
        const result = await pool.query(
            'UPDATE estudiantes SET nombre = $1, email = $2 WHERE id = $3 RETURNING *',
            [nombre, email, req.params.id]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({ error: 'El email ya está registrado' });
        }
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar estudiante' });
    }
});

app.delete('/estudiantes/:id', async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM estudiantes WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json({ mensaje: 'Estudiante eliminado', estudiante: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar estudiante' });
    }
});

module.exports = app;
