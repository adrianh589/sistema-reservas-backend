

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS sistema_reservas;
USE sistema_reservas;

-- Tabla Tipos_Documento
CREATE TABLE Tipos_Documento (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO Tipos_Documento (tipo) VALUES ('C.C.');
INSERT INTO Tipos_Documento (tipo) VALUES ('Pasaporte');
INSERT INTO Tipos_Documento (tipo) VALUES ('T.I.');
INSERT INTO Tipos_Documento (tipo) VALUES ('C.E.');
INSERT INTO Tipos_Documento (tipo) VALUES ('Registro Civil');
INSERT INTO Tipos_Documento (tipo) VALUES ('Tarjeta de Identidad');
INSERT INTO Tipos_Documento (tipo) VALUES ('NIT');
INSERT INTO Tipos_Documento (tipo) VALUES ('Otro');

-- Tabla Administradores
CREATE TABLE Administradores (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO Administradores (username, password, correo)
VALUES ('admin', '$2b$10$IjGj9YbWD9f5.NpchpU01.noD3w30jJUpG1WY2J3T52MdLy4Vs7cu', 'admin@example.com');

-- Tabla Reservistas
CREATE TABLE Reservistas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('M', 'F') NOT NULL,
    tipo_documento_id INT UNSIGNED NOT NULL,
    numero_documento VARCHAR(20) NOT NULL UNIQUE,
    telefono_contacto VARCHAR(20) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tipo_documento_id) REFERENCES Tipos_Documento(id)
);

-- Tabla Contacto_Emergencia
CREATE TABLE Contacto_Emergencia (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombres VARCHAR(100) NOT NULL,
    telefono_contacto VARCHAR(20) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla Hoteles
CREATE TABLE Hoteles (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    habilitado TINYINT(1) NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla Tipos_Habitaciones
CREATE TABLE Tipos_Habitaciones (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla Ubicaciones_Habitaciones
CREATE TABLE Ubicaciones_Habitaciones (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    ciudad VARCHAR(100) NOT NULL UNIQUE ,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Direcciones Ubicaciones
CREATE TABLE Direcciones_Ubicaciones(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_ubicacion_habitacion INT UNSIGNED NOT NULL,
    direccion VARCHAR(100) NOT NULL UNIQUE ,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_ubicacion_habitacion) REFERENCES Ubicaciones_Habitaciones(id)
);


-- Tabla Habitaciones
CREATE TABLE Habitaciones (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_hotel INT UNSIGNED NOT NULL,
    id_tipo_habitacion INT UNSIGNED NOT NULL,
    id_ubicacion_habitacion INT UNSIGNED,
    valor DECIMAL(10,2) NOT NULL,
    habilitado TINYINT(1) NOT NULL DEFAULT 1,
    impuestos DECIMAL(5,2) NOT NULL,
    numero_habitacion INT NOT NULL UNIQUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_hotel) REFERENCES Hoteles(id),
    FOREIGN KEY (id_tipo_habitacion) REFERENCES Tipos_Habitaciones(id),
    FOREIGN KEY (id_ubicacion_habitacion) REFERENCES Ubicaciones_Habitaciones(id)
);

-- Tabla Reservas
CREATE TABLE Reservas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_reservista INT UNSIGNED NOT NULL,
    id_habitacion INT UNSIGNED NOT NULL,
    id_contacto_emergencia INT UNSIGNED NOT NULL,
    fecha_inicio_reserva DATE NOT NULL,
    fecha_fin_reserva DATE NOT NULL,
    cantidad_personas INT NOT NULL,
    total_pagado DECIMAL(10,2),
    habilitado TINYINT(1) NOT NULL DEFAULT 1,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_reservista) REFERENCES Reservistas(id),
    FOREIGN KEY (id_habitacion) REFERENCES Habitaciones(id),
    FOREIGN KEY (id_contacto_emergencia) REFERENCES Contacto_Emergencia(id)
);

-- Tabla Huespedes
CREATE TABLE Huespedes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT UNSIGNED NOT NULL,
    id_reservista INT UNSIGNED NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero ENUM('M', 'F') NOT NULL,
    tipo_documento_id INT UNSIGNED,
    numero_documento VARCHAR(20),
    correo VARCHAR(100),
    telefono_contacto VARCHAR(20),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_reservista) REFERENCES Reservistas(id),
    FOREIGN KEY (tipo_documento_id) REFERENCES Tipos_Documento(id)
);
