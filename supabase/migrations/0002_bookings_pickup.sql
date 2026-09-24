-- Local de recolha escolhido no formulário de reserva (opcional).
-- Ex.: "Terminal de cruzeiros", "Hotel: Tivoli Avenida", "Hard Rock Café".
-- Pedido por clientes que chegavam sem saber onde seriam recolhidos.
alter table public.bookings add column if not exists pickup_location text;
