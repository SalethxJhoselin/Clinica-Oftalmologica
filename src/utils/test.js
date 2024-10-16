
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

///-----estructura de cupos para guardar en la base de datos(aun no la estoy usando)---------------------------------------
export const simulatedSlots = [
    {
        key: "08:00", // Hora de inicio
        numero: 1, // Número del cupo
        paciente: "", // Nombre del paciente (vacío al no haber sido reservado)
        estado: "Disponible", // Estado inicial del cupo
        horaInicio: "08:00", // Hora de inicio del cupo
        horaFinal: "08:30", // Hora final del cupo (depende del tiempo estimado)
        accion: "Reservar", // Texto del botón
        isReserved: false // Indicador de si está reservado
    },
    {
        key: "08:30", // Hora de inicio del segundo cupo
        numero: 2,
        paciente: "",
        estado: "Disponible",
        horaInicio: "08:30",
        horaFinal: "09:00",
        accion: "Reservar",
        isReserved: false
    },
    {
        key: "09:00", // Hora de inicio del tercer cupo
        numero: 3,
        paciente: "",
        estado: "Disponible",
        horaInicio: "09:00",
        horaFinal: "09:30",
        accion: "Reservar",
        isReserved: false
    },
    {
        key: "09:30", // Hora de inicio del cuarto cupo
        numero: 4,
        paciente: "",
        estado: "Disponible",
        horaInicio: "09:30",
        horaFinal: "10:00",
        accion: "Reservar",
        isReserved: false
    }
];