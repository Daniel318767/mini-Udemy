CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);

INSERT INTO estudiantes (nombre, email) VALUES
('Ana Torres', 'ana@correo.com'),
('Luis Pérez', 'luis@correo.com'),
('Carlos Mendoza', 'carlos@correo.com');
