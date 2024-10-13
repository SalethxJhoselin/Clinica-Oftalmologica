export const users = [
    {
        firstName: "John",
        firstLastName: "Doe",
        secondLastName: "Smith",
        birthdate: "1990-01-01",
        email: "johndoe@example.com",
        password: "password123",
        confirmPassword: "password123"
    },
    {
        firstName: "Jane",
        firstLastName: "Roe",
        secondLastName: "Johnson",
        birthdate: "1992-05-15",
        email: "janeroe@example.com",
        password: "password456",
        confirmPassword: "password456"
    },
    {
        firstName: "Alice",
        firstLastName: "Williams",
        secondLastName: "Brown",
        birthdate: "1985-09-10",
        email: "alicewilliams@example.com",
        password: "alice789",
        confirmPassword: "alice789"
    },
    {
        firstName: "Bob",
        firstLastName: "Taylor",
        secondLastName: "Davis",
        birthdate: "1988-03-22",
        email: "bobtaylor@example.com",
        password: "bobpassword",
        confirmPassword: "bobpassword"
    }
];
export const user = [
    {
        id: 1,
        firstName: "John",
        firstLastName: "Doe",
        secondLastName: "Smith",
        CI: "123",  // Número de cédula de identidad
        birthdate: "1990-01-01",
        email: "johndoe@example.com",
        password: "456",
        confirmPassword: "password123",
        avatarUrl: "https://example.com/avatar/johndoe.png" // URL del avatar
    }
];

export const employeeData = [{
    "id": 1,
    "apellido_paterno": "Gonzales",
    "apellido_materno": "Pérez",
    "nombres": "Juan Carlos",
    "CI": "12345678",
    "fecha_nacimiento": "1990-05-15",
    "genero": "Masculino",
    "telefono": "76543210",
    "email": "juancarlos@example.com",
    "profesion": {
        "id": 1,
        "nombre": "Ingeniero"
    },
    "rol": {
        "id": 1,
        "nombre": "recepcionista"
    },
    "estado": "activo"
}, {
    "id": 2,
    "apellido_paterno": "Rodríguez",
    "apellido_materno": "López",
    "nombres": "Maria Isabel",
    "CI": "87654321",
    "fecha_nacimiento": "1992-08-25",
    "genero": "Femenino",
    "telefono": "76509876",
    "email": "mariaisabel@example.com",
    "profesion": {
        "id": 2,
        "nombre": "Doctora"
    },
    "rol": {
        "id": 2,
        "nombre": "administradora"
    },
    "estado": "activo"
}];

const servicios = [
    {
        id: 1,
        titulo: 'Cirugía LASIK',
        descripcion: 'Corrección visual mediante cirugía láser avanzada.',
        imagen: 'https://example.com/img/cirugia-lasik.jpg',
    },
    {
        id: 2,
        titulo: 'Diagnóstico completo',
        descripcion: 'Exámenes de visión precisos y personalizados para ti.',
        imagen: 'https://example.com/img/diagnostico-completo.jpg',
    },
    {
        id: 3,
        titulo: 'Tratamiento de cataratas',
        descripcion: 'Recupera tu visión con nuestras técnicas quirúrgicas.',
        imagen: 'https://example.com/img/tratamiento-cataratas.jpg',
    },
];

export default servicios;

//-----------------DATOS SIMULADOS 2do spint----------------------------
export const especialistas = [
    {
        "especialista_id": "1",
        "apellido_materno": "Martínez",
        "apellido_paterno": "García",
        "ci": "12345678",
        "direccion": "Av. Siempre Viva 123",
        "email": "martinez.garcia@example.com",
        "especialidades": [
            { "id": 1, "nombre": "Cardiología" },
            { "id": 3, "nombre": "Neurología" }
        ],
        "estado": true,
        "fecha_contratacion": "2023-05-10",
        "fecha_nacimiento": "1985-08-15",
        "genero": "masculino",
        "nombre": "Juan Carlos",
        "profesion": { "id": 1, "nombre": "Oftalmólogo" },
        "rol": { "id": 23, "nombre": "Paciente" },
        "telefono": "789456123"
    },
    {
        "especialista_id": "2",
        "apellido_materno": "Addac",
        "apellido_paterno": "Dad",
        "ci": "ad",
        "direccion": "Dscds",
        "email": "adc@gmail.com",
        "especialidades": [
            { "id": 4, "nombre": "Pediatría" }
        ],
        "estado": true,
        "fecha_contratacion": "2024-10-07",
        "fecha_nacimiento": "2024-10-06",
        "genero": "femenino",
        "nombre": "Wdc",
        "profesion": { "id": 4, "nombre": "Recepcionista" },
        "rol": { "id": 10, "nombre": "Empleado" },
        "telefono": "123"
    }
];
export const getAllEspecialidades = [
    { id: 1, nombre: 'Cardiología', tiempo_estimado: '20' },
    { id: 2, nombre: 'Dermatología', tiempo_estimado: '20' },
    { id: 3, nombre: 'Neurología', tiempo_estimado: '20' },
    { id: 4, nombre: 'Pediatría', tiempo_estimado: '20' }
];
//----------No se si lo estoy ocupando en algun componente----------------------
export const specialistsSchedule = [
    {
        "id": 14,
        "detalle": "ad",
        "horaFinal": {
            "locale": "en",
            "date": "Sat Oct 12 2024 14:00:00 GMT-0600 (hora estándar central)",
            "year": 2024,
            "month": 9,
            "day": 12,
            "hour": 14,
            "minute": 0,
            "second": 0
        },
        "horaInicio": {
            "locale": "en",
            "date": "Sat Oct 12 2024 04:00:00 GMT-0600 (hora estándar central)",
            "year": 2024,
            "month": 9,
            "day": 12,
            "hour": 4,
            "minute": 0,
            "second": 0
        },
        "servicio": "tratamiento",
        "fechas": [
            "Wed Oct 23 2024 00:00:00 GMT-0600 (hora estándar central)",
            "Thu Oct 24 2024 00:00:00 GMT-0600 (hora estándar central)",
            "Fri Oct 25 2024 00:00:00 GMT-0600 (hora estándar central)"
        ]
    },
    {
        "id": 16,
        "detalle": "ad",
        "horaFinal": {
            "locale": "en",
            "date": "Sat Oct 12 2024 18:00:00 GMT-0600 (hora estándar central)",
            "year": 2024,
            "month": 9,
            "day": 12,
            "hour": 14,
            "minute": 0,
            "second": 0
        },
        "horaInicio": {
            "locale": "en",
            "date": "Sat Oct 12 2024 20:00:00 GMT-0600 (hora estándar central)",
            "year": 2024,
            "month": 9,
            "day": 12,
            "hour": 4,
            "minute": 0,
            "second": 0
        },
        "servicio": "dad",
        "fechas": [
            "Thu Oct 24 2024 00:00:00 GMT-0600 (hora estándar central)",
            "Fri Oct 25 2024 00:00:00 GMT-0600 (hora estándar central)"
        ]
    }

]

export const specialistsSchedules = [
    {
      "id": 16,
      "nombre": "Juanito",
      "apellido_paterno": "Castro",
      "apellido_materno": "Vargas",
      "detalle": "adadbvdnhv",
      "horarios": [
        {
          "horaInicio": "04:00:00",
          "horaFinal": "18:00:00",
          "servicio": {
            "id": 1,
            "nombre": "Consulta General",
            "descripcion": "Consulta médica general",
            "especialidad": {
              "id": 4,
              "nombre": "Medicina General",
              "tiempo_estimado": "30"
            }
          },
          "fechas": [
            "2024-10-13",
            "2024-10-14"
          ]
        },
        {
          "horaInicio": "18:00:00",
          "horaFinal": "22:00:00",
          "servicio": {
            "id": 2,
            "nombre": "Medida de Lentes",
            "descripcion": "Evaluación para lentes",
            "especialidad": {
              "id": 5,
              "nombre": "Optometría",
              "tiempo_estimado": "45"
            }
          },
          "fechas": [
            "2024-10-13",
            "2024-10-20"
          ]
        }
      ]
    },
    {
      "id": 17,
      "nombre": "Lucia",
      "apellido_paterno": "Pérez",
      "apellido_materno": "Martínez",
      "detalle": "consulta pediátrica",
      "horarios": [
        {
          "horaInicio": "09:00:00",
          "horaFinal": "12:00:00",
          "servicio": {
            "id": 3,
            "nombre": "Consulta Pediátrica",
            "descripcion": "Consulta médica para niños",
            "especialidad": {
              "id": 6,
              "nombre": "Pediatría",
              "tiempo_estimado": "40"
            }
          },
          "fechas": [
            "2024-10-13"
          ]
        },
        {
          "horaInicio": "14:00:00",
          "horaFinal": "18:00:00",
          "servicio": {
            "id": 4,
            "nombre": "Control de Crecimiento",
            "descripcion": "Control del crecimiento del niño",
            "especialidad": {
              "id": 6,
              "nombre": "Pediatría",
              "tiempo_estimado": "35"
            }
          },
          "fechas": [
            "2024-10-14"
          ]
        }
      ]
    },
    {
      "id": 18,
      "nombre": "Carlos",
      "apellido_paterno": "Rodríguez",
      "apellido_materno": "López",
      "detalle": "consulta odontológica",
      "horarios": [
        {
          "horaInicio": "08:00:00",
          "horaFinal": "11:00:00",
          "servicio": {
            "id": 5,
            "nombre": "Limpieza Dental",
            "descripcion": "Limpieza profunda dental",
            "especialidad": {
              "id": 7,
              "nombre": "Odontología",
              "tiempo_estimado": "60"
            }
          },
          "fechas": [
            "2024-10-15"
          ]
        },
        {
          "horaInicio": "15:00:00",
          "horaFinal": "17:00:00",
          "servicio": {
            "id": 6,
            "nombre": "Extracción Dental",
            "descripcion": "Extracción de piezas dentales",
            "especialidad": {
              "id": 7,
              "nombre": "Odontología",
              "tiempo_estimado": "90"
            }
          },
          "fechas": [
            "2024-10-16"
          ]
        }
      ]
    }
  ];
  