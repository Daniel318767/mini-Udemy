# 🎓 mini-Udemy — Plataforma de cursos con microservicios

**Curso:** Cloud Computing — Universidad Continental
**Producto académico N.º 3** — Actividad grupal

## 👥 Integrantes

| Integrante | Rol | Microservicio |
|------------|-----|---------------|
| @JhimyMc | Líder | Estudiantes |
| @Luis Cristian Rafaele Huaman | Desarrollador | Cursos |
| @Daniel Benjamin Quispirroca Benitez | Desarrollador | Inscripciones |
| @Edwards Andree Ochoa Cutipa | Desarrollador | Progreso |
| @Urpi Radhakrina Pilco Del Alamo | Desarrollador | Certificados |

## 📖 Introducción

En las provincias de la región **Cusco**, muchos jóvenes quieren capacitarse para conseguir mejores oportunidades de trabajo, pero la oferta de cursos se concentra en la ciudad, la conexión a Internet suele ser limitada y, al terminar un curso, no tienen una constancia que puedan mostrar a un empleador.

**mini-Udemy** es una plataforma de cursos en línea, ligera y pensada para usarse desde el celular, donde el estudiante:

1. Se registra.
2. Elige un curso y se inscribe.
3. Avanza lección por lección.
4. Al completar el 100 %, obtiene un **certificado** con un código único.

El sistema está construido con una **arquitectura de microservicios**: cada servicio es independiente, tiene su propia base de datos y se comunica con los demás por HTTP. Se ejecuta con **Docker Compose** y se valida automáticamente con **GitHub Actions**.

## 🧩 Microservicios

| Microservicio | Puerto | Responsabilidad | Se comunica con |
|---------------|--------|-----------------|-----------------|
| **Estudiantes** | 3001 | Registrar y consultar estudiantes | — |
| **Cursos** | 3002 | Catálogo de cursos y número de lecciones | — |
| **Inscripciones** | 3003 | Inscribir a un estudiante en un curso | Estudiantes, Cursos |
| **Progreso** | 3004 | Registrar lecciones completadas y calcular el % de avance | Inscripciones, Cursos |
| **Certificados** | 3005 | Emitir el certificado cuando el progreso llega al 100 % | Inscripciones, Progreso |

```mermaid
flowchart LR
    E[Estudiantes :3001]
    C[Cursos :3002]
    I[Inscripciones :3003]
    P[Progreso :3004]
    X[Certificados :3005]

    I -- valida estudiante --> E
    I -- valida curso --> C
    P -- valida inscripción --> I
    P -- total de lecciones --> C
    X -- valida inscripción --> I
    X -- verifica 100 % --> P
```

**Tecnologías:** Node.js + Express · PostgreSQL · Docker · Docker Compose · Jest + Supertest · GitHub Actions

**Evidencias**
**Jhimy Mc**
Protección de Roles para el PR 
<img width="940" height="668" alt="image" src="https://github.com/user-attachments/assets/e42d538b-8089-49b0-8993-8b13eff8799b" />

Colaboradores Equipo
<img width="940" height="678" alt="image" src="https://github.com/user-attachments/assets/bdd7523a-6465-466d-b281-8b21aa1f6c70" />
<img width="940" height="1200" alt="image" src="https://github.com/user-attachments/assets/ce400a8e-b8f2-45a7-a36b-3db0f39e93bb" />

Pruebas del primer Test de Estudiantes 
<img width="940" height="466" alt="image" src="https://github.com/user-attachments/assets/8af6dbca-2915-4270-a564-db5263d5d544" />

PR2
<img width="940" height="925" alt="image" src="https://github.com/user-attachments/assets/b0190880-7c8c-4f01-9903-875d8b013716" />

Automatizado con CI para la autoverificación con Action
<img width="940" height="923" alt="image" src="https://github.com/user-attachments/assets/6b6dd1d7-a49c-49b9-b92d-c370dbe48351" />
<img width="940" height="510" alt="image" src="https://github.com/user-attachments/assets/6a547707-0a60-415e-9b1a-e1dde6423677" />
<img width="940" height="446" alt="image" src="https://github.com/user-attachments/assets/a72b6e4c-94a7-497c-b939-9addf1af6e69" />
<img width="940" height="510" alt="image" src="https://github.com/user-attachments/assets/3a17cef2-2553-48b9-9f94-4c2231dbc990" />













 
 
 

