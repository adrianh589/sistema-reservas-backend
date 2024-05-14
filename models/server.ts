import express, { Application } from 'express';
import administradorRoutes from '../routes/administrador';
import tiposDocumentoRoutes from '../routes/tipoDocumento';
import authRoutes from '../routes/auth';
import reservistaRoutes from '../routes/reservista';
import contactoEmergenciaRoutes from '../routes/contactoEmergencia';
import hotelRoutes from '../routes/hotel';
import tipoHabitacionRoutes from '../routes/tipoHabitacion';
import habitacionesRoutes from '../routes/habitacion';
import reservasRoutes from '../routes/reserva';
import huespedRoutes from '../routes/huesped';
import ubicacionHabitacionRoutes from '../routes/ubicacionHabitacion';
import cors from 'cors';
import db from "../db/connection";
import ubicacionHabitacion from "./ubicacionHabitacion";

/**
 * Clase que representa un servidor Express.
 */
class Server {
    private app: Application;
    private readonly port: string;
    private apiPaths = {
        administradores: '/api/administradores',
        tiposDocumento: '/api/tipos-documento',
        jwt: '/api/auth',
        reservistas: '/api/reservistas',
        contactosEmergencia: '/api/contactos-emergencia',
        hoteles: '/api/hoteles',
        tiposHabitaciones: '/api/tipos-habitaciones',
        habitaciones: '/api/habitaciones',
        reservas: '/api/reservas',
        huespedes: '/api/huespedes',
        ubicacionHabitacion: '/api/ubicacion-habitacion',
    }

    /**
     * Constructor de la clase Server.
     * Inicializa la aplicación Express y configura el puerto.
     * También llama a los métodos para establecer la conexión con la base de datos,
     * los middlewares y las rutas.
     */
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    /**
     * Método asincrónico para establecer la conexión con la base de datos.
     * Imprime un mensaje en la consola si la conexión es exitosa.
     * Lanza un error si hay algún problema con la conexión.
     */
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Base de datos en linea');
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Configura los middlewares de la aplicación Express.
     * Utiliza CORS para permitir solicitudes desde diferentes dominios,
     * analiza el cuerpo de las solicitudes como JSON y sirve archivos estáticos
     * desde la carpeta 'public'.
     */
    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta pública
        this.app.use(express.static('public'));
    }

    /**
     * Configura las rutas de la aplicación.
     * Asocia las rutas relacionadas con los administradores a su correspondiente
     * conjunto de rutas definido en 'administradorRoutes'.
     */
    routes() {
        // Rutas administradores
        this.app.use(this.apiPaths.administradores, administradorRoutes);
        // Rutas tipos documento
        this.app.use(this.apiPaths.tiposDocumento, tiposDocumentoRoutes);
        // Rutas JWT
        this.app.use(this.apiPaths.jwt, authRoutes);
        // Rutas reservistas
        this.app.use(this.apiPaths.reservistas, reservistaRoutes);
        // Rutas contactos emergencia
        this.app.use(this.apiPaths.contactosEmergencia, contactoEmergenciaRoutes);
        // Rutas hoteles
        this.app.use(this.apiPaths.hoteles, hotelRoutes);
        // Rutas tipos habitaciones
        this.app.use(this.apiPaths.tiposHabitaciones, tipoHabitacionRoutes);
        // Rutas habitaciones
        this.app.use(this.apiPaths.habitaciones, habitacionesRoutes);
        // Rutas reservas
        this.app.use(this.apiPaths.reservas, reservasRoutes);
        // Rutas huespedes
        this.app.use(this.apiPaths.huespedes, huespedRoutes);
        // Rutas ubicaciones habitacion
        this.app.use(this.apiPaths.habitaciones, ubicacionHabitacionRoutes);
    }

    /**
     * Inicia el servidor Express y lo hace escuchar en el puerto especificado.
     * Imprime un mensaje en la consola cuando el servidor está corriendo.
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}

export default Server;
