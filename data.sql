-- Inserts para "tbroles"
INSERT INTO "tbroles" ("role")
VALUES
('Administrador'),
('Cliente'),
('Vendedor'),
('Gerente'),
('Analista'),
('Encargado de Inventario'),
('Cajero'),
('Asistente de Ventas'),
('Supervisor'),
('Diseñador de Moda'),
('Personal de Logística'),
('Atención al Cliente'),
('Marketing'),
('Comprador'),
('Recursos Humanos'),
('Auditor');

INSERT INTO "tbusers" ("PK_user", "FK_role", "CI", "firstName", "lastName", "email", "password", "profileImage", "createdAt") VALUES
(1, 1, '9510358', 'Celso', 'Franciscano Choque', 'celso@gmail.com', '$2b$10$t2NqXh7YNAOecW5zvKmIqefEOmfHciZSCNYRMQBmrIDCD4dz26C/q', NULL, '2024-10-30 09:35:23.055');


-- Inserts para "tbusers"
INSERT INTO "tbusers" ("FK_role", "CI", "firstName", "lastName", "email", "password", "profileImage")
VALUES
(1, '12345678', 'Carlos', 'González', 'carlos.gonzalez@tienda.com', 'password123', 'carlos.jpg'),
(2, '87654321', 'Ana', 'Pérez', 'ana.perez@tienda.com', 'password123', 'ana.jpg'),
(3, '11223344', 'Jorge', 'López', 'jorge.lopez@tienda.com', 'password123', 'jorge.jpg'),
(4, '33445566', 'Laura', 'Rodríguez', 'laura.rodriguez@tienda.com', 'password123', 'laura.jpg'),
(5, '55667788', 'José', 'Ramírez', 'jose.ramirez@tienda.com', 'password123', 'jose.jpg'),
(6, '12349876', 'Lucía', 'Martínez', 'lucia.martinez@tienda.com', 'password123', 'lucia.jpg'),
(7, '99887766', 'Pedro', 'Torres', 'pedro.torres@tienda.com', 'password123', 'pedro.jpg'),
(8, '88776655', 'Marta', 'García', 'marta.garcia@tienda.com', 'password123', 'marta.jpg'),
(9, '77665544', 'Sofía', 'Hernández', 'sofia.hernandez@tienda.com', 'password123', 'sofia.jpg'),
(10, '66554433', 'David', 'Castro', 'david.castro@tienda.com', 'password123', 'david.jpg'),
(11, '55443322', 'Rosa', 'Vargas', 'rosa.vargas@tienda.com', 'password123', 'rosa.jpg'),
(12, '44552233', 'Patricio', 'Reyes', 'patricio.reyes@tienda.com', 'password123', 'patricio.jpg'),
(13, '33667788', 'Verónica', 'Luna', 'veronica.luna@tienda.com', 'password123', 'veronica.jpg'),
(14, '22778899', 'Roberto', 'Campos', 'roberto.campos@tienda.com', 'password123', 'roberto.jpg'),
(15, '11886655', 'Elena', 'Mendoza', 'elena.mendoza@tienda.com', 'password123', 'elena.jpg'),
(1, '33447722', 'Ernesto', 'Sosa', 'ernesto.sosa@tienda.com', 'password123', 'ernesto.jpg');

-- Inserts para "tbuserdetails"
INSERT INTO "tbuserdetails" ("FK_user", "phoneNumber", "address", "dateOfBirth", "hireDate", "position", "salary")
VALUES
(1, '5551234567', 'Calle 123, Ciudad', '1985-03-15', '2020-01-01', 'Gerente General', '5000'),
(2, '5552345678', 'Avenida 456, Ciudad', '1990-04-25', '2020-02-15', 'Cliente', '0'),
(3, '5553456789', 'Boulevard 789, Ciudad', '1982-05-30', '2021-03-10', 'Vendedor', '3000'),
(4, '5554567890', 'Carretera 101, Ciudad', '1993-06-10', '2021-04-12', 'Supervisor', '4000'),
(5, '5555678901', 'Callejón 202, Ciudad', '1975-07-20', '2022-05-01', 'Analista', '3500'),
(6, '5556789012', 'Plaza 303, Ciudad', '1988-08-15', '2022-06-10', 'Encargado de Inventario', '2800'),
(7, '5557890123', 'Pasaje 404, Ciudad', '1992-09-22', '2022-07-22', 'Cajero', '2500'),
(8, '5558901234', 'Urbanización 505, Ciudad', '1989-10-30', '2022-08-15', 'Asistente de Ventas', '2200'),
(9, '5559012345', 'Callejón 606, Ciudad', '1970-11-05', '2022-09-10', 'Atención al Cliente', '2100'),
(10, '5550123456', 'Camino 707, Ciudad', '1995-12-12', '2022-10-01', 'Marketing', '3800'),
(11, '5550987654', 'Avenida 808, Ciudad', '1983-01-14', '2022-11-10', 'Comprador', '3200'),
(12, '5558765432', 'Paseo 909, Ciudad', '1980-02-28', '2023-01-02', 'Auditor', '2900'),
(13, '5557654321', 'Autopista 111, Ciudad', '1986-03-19', '2023-02-14', 'Diseñador de Moda', '4200'),
(14, '5556543210', 'Calle 212, Ciudad', '1994-04-22', '2023-03-18', 'Logística', '2600'),
(15, '5555432109', 'Plaza 313, Ciudad', '1985-05-10', '2023-04-24', 'Recursos Humanos', '4500');



INSERT INTO "tbsalaries" ("FK_user", "hoursWorked", "extraHours", "lateHours", "deductions", "netSalary", "paymentDate")
VALUES
(1, 160, 10, 2, 100.00, 2500.00, '2023-10-15 09:00:00'),
(2, 170, 5, 1, 80.00, 2600.00, '2023-10-15 09:00:00'),
(3, 150, 8, 0, 50.00, 2400.00, '2023-10-15 09:00:00'),
(4, 160, 0, 0, 60.00, 2300.00, '2023-10-15 09:00:00'),
(5, 165, 12, 1, 90.00, 2800.00, '2023-10-15 09:00:00'),
(6, 155, 7, 3, 70.00, 2200.00, '2023-10-15 09:00:00'),
(7, 180, 10, 0, 100.00, 3000.00, '2023-10-15 09:00:00'),
(8, 140, 0, 2, 50.00, 2000.00, '2023-10-15 09:00:00'),
(9, 175, 5, 1, 60.00, 2700.00, '2023-10-15 09:00:00'),
(10, 160, 0, 0, 70.00, 2400.00, '2023-10-15 09:00:00');


INSERT INTO "tbschedules" ("FK_user", "day", "checkIn", "checkOut")
VALUES
(1, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(2, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(3, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(4, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(5, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(6, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(7, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(8, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(9, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(10, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00');


INSERT INTO "tbassists" ("FK_user", "day", "checkIn", "checkOut")
VALUES
(1, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(2, '2023-10-01', '2023-10-01 09:05:00', '2023-10-01 17:00:00'),
(3, '2023-10-01', '2023-10-01 09:15:00', '2023-10-01 17:00:00'),
(4, '2023-10-01', '2023-10-01 09:10:00', '2023-10-01 17:00:00'),
(5, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(6, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(7, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(8, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(9, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00'),
(10, '2023-10-01', '2023-10-01 09:00:00', '2023-10-01 17:00:00');


-- Inserts para "tbcustomers"
INSERT INTO "tbcustomers" ("CI", "firstName", "lastName", "email", "password", "profileImage")
VALUES
('98765432', 'Mario', 'Gómez', 'mario.gomez@cliente.com', 'cliente123', 'mario.jpg'),
('87654321', 'Juliana', 'Díaz', 'juliana.diaz@cliente.com', 'cliente123', 'juliana.jpg'),
('76543210', 'Diego', 'Fernández', 'diego.fernandez@cliente.com', 'cliente123', 'diego.jpg'),
('65432109', 'Gabriela', 'Silva', 'gabriela.silva@cliente.com', 'cliente123', 'gabriela.jpg'),
('54321098', 'Luis', 'Figueroa', 'luis.figueroa@cliente.com', 'cliente123', 'luis.jpg'),
('43210987', 'Alejandra', 'Muñoz', 'alejandra.munoz@cliente.com', 'cliente123', 'alejandra.jpg'),
('32109876', 'Manuel', 'Ortiz', 'manuel.ortiz@cliente.com', 'cliente123', 'manuel.jpg'),
('21098765', 'Patricia', 'Ríos', 'patricia.rios@cliente.com', 'cliente123', 'patricia.jpg'),
('10987654', 'Raúl', 'Morales', 'raul.morales@cliente.com', 'cliente123', 'raul.jpg'),
('01928374', 'Camila', 'Peña', 'camila.pena@cliente.com', 'cliente123', 'camila.jpg'),
('92837465', 'Adrián', 'Vega', 'adrian.vega@cliente.com', 'cliente123', 'adrian.jpg'),
('83746512', 'Valeria', 'Pardo', 'valeria.pardo@cliente.com', 'cliente123', 'valeria.jpg'),
('74651283', 'Gustavo', 'Bravo', 'gustavo.bravo@cliente.com', 'cliente123', 'gustavo.jpg'),
('65432198', 'Natalia', 'Herrera', 'natalia.herrera@cliente.com', 'cliente123', 'natalia.jpg'),
('54321987', 'César', 'Cruz', 'cesar.cruz@cliente.com', 'cliente123', 'cesar.jpg');

-- Inserts para "tbcategories"
INSERT INTO "tbcategories" ("name", "urlCategory", "description")
VALUES
('Camisas', 'camisas', 'Categoría para camisas formales y casuales'),
('Pantalones', 'pantalones', 'Categoría para pantalones de vestir y casuales'),
('Chaquetas', 'chaquetas', 'Chaquetas para todo tipo de clima y ocasión'),
('Zapatos', 'zapatos', 'Calzado de vestir y casual'),
('Accesorios', 'accesorios', 'Accesorios de moda para hombres y mujeres'),
('Vestidos', 'vestidos', 'Vestidos elegantes y casuales para mujer'),
('Blusas', 'blusas', 'Blusas para diferentes estilos y ocasiones'),
('Faldas', 'faldas', 'Faldas de diversos diseños y tamaños'),
('Trajes', 'trajes', 'Trajes para eventos y trabajo formal'),
('Deportivo', 'deportivo', 'Ropa deportiva para hombres y mujeres'),
('Sombreros', 'sombreros', 'Sombreros de moda y funcionales'),
('Carteras', 'carteras', 'Carteras de mano y para uso diario'),
('Relojes', 'relojes', 'Relojes elegantes y casuales'),
('Gafas', 'gafas', 'Gafas de sol y de lectura'),
('Bufandas', 'bufandas', 'Bufandas para diferentes estaciones y estilos');




-- Inserts para "tbsubcategories"
INSERT INTO "tbsubcategories" ("FK_category", "name", "urlSubcategory", "description")
VALUES
(1, 'Camisas Formales', 'camisas-formales', 'Camisas de vestir para eventos formales'),
(1, 'Camisas Casual', 'camisas-casual', 'Camisas para uso diario y casual'),
(2, 'Jeans', 'jeans', 'Pantalones de mezclilla para uso diario'),
(2, 'Pantalones de Vestir', 'pantalones-de-vestir', 'Pantalones formales para oficina y eventos'),
(3, 'Chaquetas de Invierno', 'chaquetas-invierno', 'Chaquetas para clima frío'),
(3, 'Chaquetas de Verano', 'chaquetas-verano', 'Chaquetas ligeras para clima cálido'),
(4, 'Zapatos de Vestir', 'zapatos-de-vestir', 'Zapatos formales para trabajo y eventos'),
(4, 'Zapatos Casual', 'zapatos-casual', 'Zapatos cómodos para uso diario'),
(5, 'Sombreros', 'sombreros', 'Sombreros para diferentes estaciones y estilos'),
(5, 'Cinturones', 'cinturones', 'Cinturones para hombres y mujeres'),
(6, 'Vestidos de Fiesta', 'vestidos-de-fiesta', 'Vestidos elegantes para eventos especiales'),
(6, 'Vestidos Casual', 'vestidos-casual', 'Vestidos cómodos para uso diario'),
(7, 'Blusas Formales', 'blusas-formales', 'Blusas para eventos y trabajo'),
(7, 'Blusas Casual', 'blusas-casual', 'Blusas para uso diario'),
(8, 'Faldas Cortas', 'faldas-cortas', 'Faldas de diferentes diseños y estilos'),
(8, 'Faldas Largas', 'faldas-largas', 'Faldas largas para ocasiones especiales y uso casual');

-- Inserts para "tbsizes"
INSERT INTO "tbsizes" ("name")
VALUES
('XS'),
('S'),
('M'),
('L'),
('XL'),
('XXL'),
('28'),
('30'),
('32'),
('34'),
('36'),
('38'),
('40'),
('42'),
('44');


INSERT INTO "tbproducts" ("FK_subcategory", "FK_size", "SKU", "name", "urlProduct", "regularPrice", "offerPrice", "stock", "description", "images", "urlQR")
VALUES
(1, 1, 'SKU001', 'Product 1', 'urlProduct1.com', 100.00, 90.00, 50, 'Description for product 1', ARRAY['image1a.jpg', 'image1b.jpg'], 'qr1.png'),
(1, 2, 'SKU002', 'Product 2', 'urlProduct2.com', 150.00, 120.00, 30, 'Description for product 2', ARRAY['image2a.jpg', 'image2b.jpg'], 'qr2.png'),
(2, 3, 'SKU003', 'Product 3', 'urlProduct3.com', 200.00, NULL, 100, 'Description for product 3', ARRAY['image3a.jpg', 'image3b.jpg'], 'qr3.png'),
(2, 4, 'SKU004', 'Product 4', 'urlProduct4.com', 250.00, 230.00, 80, 'Description for product 4', ARRAY['image4a.jpg', 'image4b.jpg'], 'qr4.png'),
(3, 1, 'SKU005', 'Product 5', 'urlProduct5.com', 300.00, NULL, 20, 'Description for product 5', ARRAY['image5a.jpg', 'image5b.jpg'], 'qr5.png'),
(3, 2, 'SKU006', 'Product 6', 'urlProduct6.com', 350.00, 320.00, 40, 'Description for product 6', ARRAY['image6a.jpg', 'image6b.jpg'], 'qr6.png'),
(4, 3, 'SKU007', 'Product 7', 'urlProduct7.com', 400.00, 380.00, 10, 'Description for product 7', ARRAY['image7a.jpg', 'image7b.jpg'], 'qr7.png'),
(4, 4, 'SKU008', 'Product 8', 'urlProduct8.com', 450.00, NULL, 60, 'Description for product 8', ARRAY['image8a.jpg', 'image8b.jpg'], 'qr8.png'),
(5, 1, 'SKU009', 'Product 9', 'urlProduct9.com', 500.00, 470.00, 70, 'Description for product 9', ARRAY['image9a.jpg', 'image9b.jpg'], 'qr9.png'),
(5, 2, 'SKU010', 'Product 10', 'urlProduct10.com', 550.00, NULL, 55, 'Description for product 10', ARRAY['image10a.jpg', 'image10b.jpg'], 'qr10.png'),
(6, 3, 'SKU011', 'Product 11', 'urlProduct11.com', 600.00, 570.00, 35, 'Description for product 11', ARRAY['image11a.jpg', 'image11b.jpg'], 'qr11.png'),
(6, 4, 'SKU012', 'Product 12', 'urlProduct12.com', 650.00, 630.00, 25, 'Description for product 12', ARRAY['image12a.jpg', 'image12b.jpg'], 'qr12.png'),
(7, 1, 'SKU013', 'Product 13', 'urlProduct13.com', 700.00, NULL, 15, 'Description for product 13', ARRAY['image13a.jpg', 'image13b.jpg'], 'qr13.png'),
(7, 2, 'SKU014', 'Product 14', 'urlProduct14.com', 750.00, 720.00, 85, 'Description for product 14', ARRAY['image14a.jpg', 'image14b.jpg'], 'qr14.png'),
(8, 3, 'SKU015', 'Product 15', 'urlProduct15.com', 800.00, 780.00, 95, 'Description for product 15', ARRAY['image15a.jpg', 'image15b.jpg'], 'qr15.png');


INSERT INTO "tbsalesstatuses" ("name", "description")
VALUES
('Pending', 'Sale is pending payment'),
('Paid', 'Sale has been paid'),
('Shipped', 'Sale has been shipped'),
('Delivered', 'Sale has been delivered to customer'),
('Cancelled', 'Sale has been cancelled'),
('Refunded', 'Sale has been refunded'),
('Processing', 'Sale is currently being processed'),
('Failed', 'Payment for the sale failed'),
('Partially Refunded', 'Sale has been partially refunded'),
('On Hold', 'Sale is on hold'),
('Completed', 'Sale has been completed successfully'),
('Returned', 'Product has been returned by customer'),
('Awaiting Payment', 'Awaiting payment from customer'),
('Dispatched', 'Order has been dispatched'),
('Out for Delivery', 'Product is out for delivery');


INSERT INTO "tbsales" ("FK_customer", "FK_salestatus", "totalAmount")
VALUES
(1, 1, 150.00),
(2, 2, 250.00),
(3, 3, 350.00),
(4, 4, 450.00),
(5, 5, 550.00),
(6, 6, 650.00),
(7, 7, 750.00),
(8, 8, 850.00),
(9, 9, 950.00),
(10, 10, 1050.00),
(11, 11, 1150.00),
(12, 12, 1250.00),
(13, 13, 1350.00),
(14, 14, 1450.00),
(15, 15, 1550.00);


INSERT INTO "tbsaledetails" ("FK_sale", "FK_product", "quantity", "unitPrice", "subtotal")
VALUES
(1, 1, 2, 100.00, 200.00),
(2, 2, 1, 150.00, 150.00),
(3, 3, 3, 200.00, 600.00),
(4, 4, 2, 250.00, 500.00),
(5, 5, 1, 300.00, 300.00),
(6, 6, 4, 350.00, 1400.00),
(7, 7, 1, 400.00, 400.00),
(8, 8, 3, 450.00, 1350.00),
(9, 9, 2, 500.00, 1000.00),
(10, 10, 1, 550.00, 550.00),
(11, 11, 5, 600.00, 3000.00),
(12, 12, 2, 650.00, 1300.00),
(13, 13, 1, 700.00, 700.00),
(14, 14, 3, 750.00, 2250.00),
(15, 15, 2, 800.00, 1600.00);


INSERT INTO "tbincome" ("date", "description", "total")
VALUES
('2023-10-01 10:00:00', 'Venta de camisas de hombre', 1200.00),
('2023-10-02 11:30:00', 'Venta de vestidos de mujer', 850.00),
('2023-10-03 12:45:00', 'Venta de jeans', 1700.00),
('2023-10-04 09:20:00', 'Venta de chaquetas de cuero', 2300.00),
('2023-10-05 14:00:00', 'Venta de zapatos deportivos', 1500.00),
('2023-10-06 16:15:00', 'Venta de accesorios', 700.00),
('2023-10-07 17:30:00', 'Venta de trajes formales', 3200.00),
('2023-10-08 10:00:00', 'Venta de ropa interior', 500.00),
('2023-10-09 11:45:00', 'Devolución - chaqueta', -200.00),
('2023-10-10 13:00:00', 'Venta de camisas y pantalones', 1850.00),
('2023-10-11 14:30:00', 'Venta de suéteres', 1350.00),
('2023-10-12 16:00:00', 'Venta de bufandas y gorros', 400.00),
('2023-10-13 17:45:00', 'Venta de abrigos de invierno', 2100.00),
('2023-10-14 18:30:00', 'Venta de vestidos de noche', 2600.00),
('2023-10-15 09:00:00', 'Venta de zapatillas de mujer', 950.00);


INSERT INTO "tbexpenses" ("date", "description", "total")
VALUES
('2023-10-01 08:00:00', 'Compra de inventario - camisas', 500.00),
('2023-10-02 09:30:00', 'Pago de alquiler de tienda física', 1200.00),
('2023-10-03 11:00:00', 'Campaña publicitaria en redes sociales', 800.00),
('2023-10-04 12:15:00', 'Compra de inventario - zapatos', 950.00),
('2023-10-05 13:30:00', 'Costo de envío de productos a clientes', 300.00),
('2023-10-06 14:45:00', 'Compra de perchas y bolsas para tienda', 150.00),
('2023-10-07 15:00:00', 'Gastos de electricidad y agua del local', 200.00),
('2023-10-08 16:30:00', 'Pago de sueldos de empleados', 4000.00),
('2023-10-09 17:00:00', 'Compra de inventario - accesorios', 600.00),
('2023-10-10 18:15:00', 'Costo de logística y almacenamiento', 1200.00),
('2023-10-11 19:00:00', 'Diseño gráfico para campaña navideña', 400.00),
('2023-10-12 20:30:00', 'Servicio de mantenimiento del local', 300.00),
('2023-10-13 21:00:00', 'Compra de cajas y empaques para envíos', 250.00),
('2023-10-14 08:45:00', 'Servicio de limpieza de tienda', 150.00),
('2023-10-15 09:15:00', 'Compra de inventario - vestidos', 1800.00);
