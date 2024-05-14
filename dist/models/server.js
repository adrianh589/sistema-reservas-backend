"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const administrador_1 = __importDefault(require("../routes/administrador"));
const tipoDocumento_1 = __importDefault(require("../routes/tipoDocumento"));
const auth_1 = __importDefault(require("../routes/auth"));
const reservista_1 = __importDefault(require("../routes/reservista"));
const contactoEmergencia_1 = __importDefault(require("../routes/contactoEmergencia"));
const hotel_1 = __importDefault(require("../routes/hotel"));
const tipoHabitacion_1 = __importDefault(require("../routes/tipoHabitacion"));
const habitacion_1 = __importDefault(require("../routes/habitacion"));
const reserva_1 = __importDefault(require("../routes/reserva"));
const huesped_1 = __importDefault(require("../routes/huesped"));
const ubicacionHabitacion_1 = __importDefault(require("../routes/ubicacionHabitacion"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
/**
 * Clase que representa un servidor Express.
 */
class Server {
    /**
     * Constructor de la clase Server.
     * Inicializa la aplicación Express y configura el puerto.
     * También llama a los métodos para establecer la conexión con la base de datos,
     * los middlewares y las rutas.
     */
    constructor() {
        this.apiPaths = {
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
        };
        this.app = (0, express_1.default)();
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
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos en linea');
            }
            catch (error) {
                throw error;
            }
        });
    }
    /**
     * Configura los middlewares de la aplicación Express.
     * Utiliza CORS para permitir solicitudes desde diferentes dominios,
     * analiza el cuerpo de las solicitudes como JSON y sirve archivos estáticos
     * desde la carpeta 'public'.
     */
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    /**
     * Configura las rutas de la aplicación.
     * Asocia las rutas relacionadas con los administradores a su correspondiente
     * conjunto de rutas definido en 'administradorRoutes'.
     */
    routes() {
        // Rutas administradores
        this.app.use(this.apiPaths.administradores, administrador_1.default);
        // Rutas tipos documento
        this.app.use(this.apiPaths.tiposDocumento, tipoDocumento_1.default);
        // Rutas JWT
        this.app.use(this.apiPaths.jwt, auth_1.default);
        // Rutas reservistas
        this.app.use(this.apiPaths.reservistas, reservista_1.default);
        // Rutas contactos emergencia
        this.app.use(this.apiPaths.contactosEmergencia, contactoEmergencia_1.default);
        // Rutas hoteles
        this.app.use(this.apiPaths.hoteles, hotel_1.default);
        // Rutas tipos habitaciones
        this.app.use(this.apiPaths.tiposHabitaciones, tipoHabitacion_1.default);
        // Rutas habitaciones
        this.app.use(this.apiPaths.habitaciones, habitacion_1.default);
        // Rutas reservas
        this.app.use(this.apiPaths.reservas, reserva_1.default);
        // Rutas huespedes
        this.app.use(this.apiPaths.huespedes, huesped_1.default);
        // Rutas ubicaciones habitacion
        this.app.use(this.apiPaths.habitaciones, ubicacionHabitacion_1.default);
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
exports.default = Server;
//# sourceMappingURL=server.js.map