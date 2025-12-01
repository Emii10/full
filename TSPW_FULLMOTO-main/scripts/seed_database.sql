-- Seed data for Motofull database
-- Insert categories
INSERT INTO categories (name, description, icon) VALUES
('Frenos', 'Sistemas de frenado y componentes', '🛑'),
('Escapes', 'Sistemas de escape y silenciadores', '🔥'),
('Filtros', 'Filtros de aire, aceite y combustible', '🌪️'),
('Transmisión', 'Cadenas, piñones y componentes de transmisión', '⚙️'),
('Suspensión', 'Amortiguadores y componentes de suspensión', '🏍️'),
('Llantas', 'Llantas y rines para motocicletas', '⭕'),
('Lubricantes', 'Aceites y lubricantes especializados', '🛢️'),
('Encendido', 'Bujías y sistemas de encendido', '⚡');

-- Insert brands
INSERT INTO brands (name, description) VALUES
('Brembo', 'Líder mundial en sistemas de frenado'),
('Akrapovic', 'Especialista en sistemas de escape premium'),
('K&N', 'Filtros de alto rendimiento'),
('DID', 'Cadenas de transmisión de calidad'),
('Öhlins', 'Suspensiones de competición'),
('Marchesini', 'Llantas forjadas de alta gama'),
('EBC', 'Pastillas de freno de rendimiento'),
('Motul', 'Lubricantes de competición'),
('NGK', 'Bujías y sistemas de encendido');

-- Insert products
INSERT INTO products (name, description, price, original_price, category_id, brand_id, image_url, stock_quantity, rating, review_count, tags) VALUES
('Kit de Frenos Brembo Racing', 'Kit completo de frenos Brembo para competición con calipers de 4 pistones', 299.99, 349.99, 1, 1, '/placeholder.svg?height=300&width=300', 15, 4.8, 124, ARRAY['racing', 'frenos', 'brembo', 'kit']),
('Escape Akrapovic Titanio', 'Escape deportivo de titanio con fibra de carbono, reduce peso y mejora rendimiento', 899.99, 1099.99, 2, 2, '/placeholder.svg?height=300&width=300', 8, 4.9, 89, ARRAY['escape', 'titanio', 'akrapovic', 'deportivo']),
('Filtro de Aire K&N Performance', 'Filtro de aire de alto rendimiento lavable y reutilizable', 79.99, 99.99, 3, 3, '/placeholder.svg?height=300&width=300&N+air+filter+motorcycle+performance+red+cotton=', 0, 4.7, 203, ARRAY['filtro', 'aire', 'k&n', 'performance']),
('Cadena DID 520 O-Ring', 'Cadena de transmisión con sellos O-Ring para mayor durabilidad', 149.99, 179.99, 4, 4, '/placeholder.svg?height=300&width=300', 25, 4.6, 156, ARRAY['cadena', 'transmision', 'did', 'o-ring']),
('Amortiguador Öhlins TTX', 'Amortiguador trasero de competición con ajuste completo', 1299.99, 1499.99, 5, 5, '/placeholder.svg?height=300&width=300', 5, 4.9, 67, ARRAY['amortiguador', 'suspension', 'ohlins', 'ttx']),
('Llantas Marchesini Forged', 'Llantas forjadas de magnesio ultraligeras para competición', 2199.99, 2499.99, 6, 6, '/placeholder.svg?height=300&width=300', 3, 4.8, 45, ARRAY['llantas', 'forjadas', 'marchesini', 'magnesio']),
('Pastillas de Freno EBC HH', 'Pastillas de freno sinterizadas de alto rendimiento', 89.99, 109.99, 1, 7, '/placeholder.svg?height=300&width=300', 30, 4.5, 89, ARRAY['pastillas', 'frenos', 'ebc', 'sinterizadas']),
('Aceite Motul 300V 10W40', 'Aceite sintético de competición para motores de alto rendimiento', 45.99, 55.99, 7, 8, '/placeholder.svg?height=300&width=300', 50, 4.7, 234, ARRAY['aceite', 'motul', '300v', 'sintetico']),
('Bujías NGK Iridium', 'Bujías de iridio de larga duración y mejor encendido', 24.99, 29.99, 8, 9, '/placeholder.svg?height=300&width=300', 40, 4.6, 156, ARRAY['bujias', 'ngk', 'iridium', 'encendido']);

-- Insert sample coupons
INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, max_uses, expires_at, is_active) VALUES
('BIENVENIDO10', 'Descuento de bienvenida del 10%', 'percentage', 10.00, 100.00, 100, '2024-12-31 23:59:59', true),
('ENVIOGRATIS', 'Envío gratis en compras mayores a $200', 'fixed', 15.00, 200.00, 50, '2024-12-31 23:59:59', true),
('RACING20', 'Descuento especial en productos de competición', 'percentage', 20.00, 500.00, 25, '2024-12-31 23:59:59', true);

-- Insert sample admin user
INSERT INTO users (email, password_hash, first_name, last_name, role, email_verified) VALUES
('admin@motofull.com', '$2b$10$example_hash', 'Admin', 'Motofull', 'admin', true);

-- Insert sample customer
INSERT INTO users (email, password_hash, first_name, last_name, phone, email_verified) VALUES
('cliente@example.com', '$2b$10$example_hash', 'Juan', 'Pérez', '+57 300 123 4567', true);
