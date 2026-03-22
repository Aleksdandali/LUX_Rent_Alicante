-- ═══════════════════════════════════════════════════
-- ALICANTE LUXE DRIVE — Database Schema
-- ═══════════════════════════════════════════════════

-- 1. CARS — Собственный автопарк
create table public.cars (
  id uuid primary key default gen_random_uuid(),
  name text not null,                          -- 'Lamborghini Urus'
  slug text unique not null,                   -- 'lamborghini-urus'
  category text not null check (category in ('SUV', 'Sport', 'Cabrio', 'Business')),
  badge text,                                  -- 'Luxury SUV', 'Grand Tourer'

  -- Характеристики
  engine text,                                 -- '4.0 V8 Twin-Turbo'
  power text,                                  -- '650 л.с.'
  acceleration text,                           -- '3.6s'
  transmission text default 'Автомат',
  drive text,                                  -- 'Полный'
  seats int not null default 5,
  interior text,                               -- 'Кожа Nappa, панорамная крыша'

  -- Цены
  price_per_day int not null,                  -- в EUR, целое число
  deposit int not null,                        -- в EUR

  -- Медиа
  image_main text,                             -- URL основного фото
  images text[] default '{}',                  -- массив URL фотогалереи

  -- Статус
  is_available boolean default true,
  is_featured boolean default false,           -- показывать на главной
  sort_order int default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. ROUTES — Маршруты и направления
create table public.routes (
  id uuid primary key default gen_random_uuid(),
  name text not null,                          -- 'Гуадалест'
  slug text unique not null,                   -- 'guadalest'
  region text not null check (region in ('costa-blanca', 'spain')),

  -- Детали
  description text,
  drive_time text,                             -- '45 мин'
  distance_km int,                             -- 120
  best_car_type text,                          -- 'SUV'

  -- Медиа
  image text,

  -- Таймлайн маршрута (JSON)
  timeline jsonb default '[]',                 -- [{time: "10:00", place: "Выезд", description: "..."}]

  -- Фильтры
  duration_type text check (duration_type in ('day', 'weekend', 'week')),
  tags text[] default '{}',                    -- ['пляжи', 'горы', 'гастро', 'города']

  is_published boolean default true,
  sort_order int default 0,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. BOOKINGS — Бронирования
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_number text unique not null,         -- 'ALD-2026-0001'

  -- Автомобиль
  car_id uuid references public.cars(id),
  car_name text not null,                      -- денормализация для истории

  -- Даты
  pickup_date date not null,
  pickup_time time not null,
  return_date date not null,
  return_time time not null,
  days int generated always as (return_date - pickup_date) stored,

  -- Место
  pickup_location text not null,
  return_location text,

  -- Опции
  full_insurance boolean default false,
  extra_driver boolean default false,
  child_seat boolean default false,
  gps boolean default false,
  airport_delivery boolean default true,

  -- Стоимость
  price_per_day int not null,
  options_total int default 0,
  total_price int not null,
  deposit int not null,

  -- Клиент
  client_name text not null,
  client_phone text not null,
  client_email text,
  license_number text,
  contact_method text default 'whatsapp' check (contact_method in ('whatsapp', 'email', 'telegram', 'phone')),

  -- Статус
  status text default 'pending' check (status in (
    'pending',      -- новая заявка
    'confirmed',    -- подтверждена менеджером
    'paid',         -- оплачена / депозит получен
    'active',       -- авто выдано
    'completed',    -- аренда завершена
    'cancelled'     -- отменена
  )),

  notes text,                                  -- заметки менеджера

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 4. REVIEWS — Отзывы клиентов
create table public.reviews (
  id uuid primary key default gen_random_uuid(),

  client_name text not null,                   -- 'Александр П.'
  client_initials text not null,               -- 'АП'
  client_location text,                        -- 'Москва'

  car_name text,                               -- 'Lamborghini Urus'
  rental_date text,                            -- 'Февраль 2026'

  text text not null,
  rating int not null default 5 check (rating between 1 and 5),
  source text default 'Google Reviews',        -- 'Google Reviews', 'Trustpilot', 'Direct'

  is_published boolean default true,
  sort_order int default 0,

  created_at timestamptz default now()
);

-- 5. FAQ — Часто задаваемые вопросы
create table public.faq (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now()
);

-- 6. INQUIRIES — Заявки с сайта (WhatsApp, звонки, формы)
create table public.inquiries (
  id uuid primary key default gen_random_uuid(),

  type text default 'website' check (type in ('website', 'whatsapp', 'phone', 'email')),

  client_name text,
  client_phone text,
  client_email text,
  message text,

  -- Какое авто интересовало
  car_id uuid references public.cars(id),
  route_id uuid references public.routes(id),

  status text default 'new' check (status in ('new', 'in_progress', 'converted', 'closed')),
  notes text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ═══════════════════════════════════════════════════
-- ИНДЕКСЫ
-- ═══════════════════════════════════════════════════

create index idx_cars_category on public.cars(category);
create index idx_cars_available on public.cars(is_available) where is_available = true;
create index idx_cars_featured on public.cars(is_featured) where is_featured = true;
create index idx_cars_slug on public.cars(slug);

create index idx_routes_region on public.routes(region);
create index idx_routes_slug on public.routes(slug);

create index idx_bookings_status on public.bookings(status);
create index idx_bookings_dates on public.bookings(pickup_date, return_date);
create index idx_bookings_car on public.bookings(car_id);
create index idx_bookings_number on public.bookings(booking_number);

create index idx_reviews_published on public.reviews(is_published) where is_published = true;
create index idx_inquiries_status on public.inquiries(status);

-- ═══════════════════════════════════════════════════
-- RLS (Row Level Security)
-- ═══════════════════════════════════════════════════

alter table public.cars enable row level security;
alter table public.routes enable row level security;
alter table public.bookings enable row level security;
alter table public.reviews enable row level security;
alter table public.faq enable row level security;
alter table public.inquiries enable row level security;

-- Публичное чтение для сайта (авто, маршруты, отзывы, FAQ)
create policy "Cars are viewable by everyone"
  on public.cars for select using (true);

create policy "Routes are viewable by everyone"
  on public.routes for select using (is_published = true);

create policy "Reviews are viewable by everyone"
  on public.reviews for select using (is_published = true);

create policy "FAQ is viewable by everyone"
  on public.faq for select using (is_published = true);

-- Бронирования и заявки — только вставка с сайта
create policy "Anyone can create a booking"
  on public.bookings for insert with check (true);

create policy "Anyone can create an inquiry"
  on public.inquiries for insert with check (true);

-- ═══════════════════════════════════════════════════
-- AUTO-UPDATE updated_at
-- ═══════════════════════════════════════════════════

create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger cars_updated_at
  before update on public.cars
  for each row execute function public.update_updated_at();

create trigger routes_updated_at
  before update on public.routes
  for each row execute function public.update_updated_at();

create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function public.update_updated_at();

create trigger inquiries_updated_at
  before update on public.inquiries
  for each row execute function public.update_updated_at();

-- ═══════════════════════════════════════════════════
-- SEED DATA — Начальные данные автопарка
-- ═══════════════════════════════════════════════════

insert into public.cars (name, slug, category, badge, engine, power, acceleration, seats, interior, price_per_day, deposit, image_main, is_featured, sort_order) values
  ('Lamborghini Urus', 'lamborghini-urus', 'SUV', 'Luxury SUV', '4.0 V8 Twin-Turbo', '650 л.с.', '3.6s', 5, 'Кожа Nappa, панорамная крыша', 850, 5000, 'https://images.unsplash.com/photo-1570829194611-71a926d70ff8?w=1080', true, 1),
  ('Bentley Continental GT', 'bentley-continental-gt', 'Sport', 'Grand Tourer', '6.0 W12', '635 л.с.', '3.7s', 4, 'Кожа премиум, панорама', 900, 6000, 'https://images.unsplash.com/photo-1629820402094-3c745c386950?w=1080', true, 2),
  ('Porsche Cayenne', 'porsche-cayenne', 'SUV', 'Luxury SUV', '4.0 V8 Twin-Turbo', '550 л.с.', '3.9s', 5, 'Кожа, панорамная крыша', 650, 4000, 'https://images.unsplash.com/photo-1644926402747-e3310f0fbf8b?w=1080', true, 3),
  ('Porsche 911', 'porsche-911', 'Sport', 'Sport', '3.0 Twin-Turbo', '580 л.с.', '3.0s', 2, 'Спортивная кожа', 750, 5000, 'https://images.unsplash.com/photo-1742414955049-d332bc45b51a?w=1080', true, 4),
  ('Range Rover', 'range-rover', 'SUV', 'Business', '4.4 V8', '525 л.с.', '4.3s', 5, 'Кожа Windsor, панорама', 700, 4500, 'https://images.unsplash.com/photo-1506616995931-556bc0c90c16?w=1080', true, 5),
  ('Mercedes G-Class', 'mercedes-g-class', 'SUV', 'Luxury SUV', '4.0 V8 BiTurbo', '585 л.с.', '4.5s', 5, 'Designo кожа, панорама', 800, 5000, 'https://images.unsplash.com/photo-1554049019-cf34d12c7967?w=1080', true, 6);

-- Маршруты
insert into public.routes (name, slug, region, description, drive_time, distance_km, best_car_type, image, duration_type, tags, sort_order) values
  ('Гуадалест', 'guadalest', 'costa-blanca', 'Средневековый город в горах с потрясающими видами на побережье и горные озёра', '45 мин', 120, 'SUV', 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1080', 'day', '{"горы", "история"}', 1),
  ('Бенидорм', 'benidorm', 'costa-blanca', 'Знаменитый курорт с золотыми пляжами и панорамной набережной вдоль моря', '30 мин', 45, 'Cabrio', 'https://images.unsplash.com/photo-1655405927893-96a5b68490c1?w=1080', 'day', '{"пляжи", "города"}', 2),
  ('Альтеа', 'altea', 'costa-blanca', 'Белоснежный городок художников с видом на Средиземное море и уютными улочками', '50 мин', 60, 'Sport', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1080', 'day', '{"города", "гастро"}', 3),
  ('Валенсия', 'valencia', 'spain', 'Третий по величине город Испании — Город наук и искусств, родина паэльи', '1 ч 40 мин', 180, 'Business', 'https://images.unsplash.com/photo-1666861522569-3a352a533c1e?w=1080', 'day', '{"города", "гастро"}', 4),
  ('Гранада', 'granada', 'spain', 'Легендарная Альгамбра и андалузская культура — идеальный маршрут на выходные', '4 ч 20 мин', 420, 'SUV', 'https://images.unsplash.com/photo-1719863131288-dc893fdcb955?w=1080', 'weekend', '{"история", "горы"}', 5),
  ('Мурсия', 'murcia', 'spain', 'Город барокко и средиземноморской кухни с богатой историей', '1 ч 10 мин', 85, 'Business', 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1080', 'day', '{"города", "гастро"}', 6);

-- Отзывы
insert into public.reviews (client_name, client_initials, client_location, car_name, rental_date, text, rating, source, sort_order) values
  ('Александр П.', 'АП', 'Москва', 'Lamborghini Urus', 'Февраль 2026', 'Всё было организовано чётко — от бронирования до возврата. Машина в идеальном состоянии, менеджер на связи в WhatsApp. Арендую здесь уже второй раз.', 5, 'Google Reviews', 1),
  ('Мария С.', 'МС', 'Санкт-Петербург', 'Porsche 911', 'Январь 2026', 'Взяла 911 для поездки по побережью. Машина в идеальном состоянии, прозрачные условия, поддержка реально работает 24/7. Путешествие получилось незабываемым.', 5, 'Google Reviews', 2),
  ('John S.', 'JS', 'London', 'Bentley Continental GT', 'Декабрь 2025', 'Best luxury car rental in Alicante. Bentley was perfect for my business trip. Professional service, transparent pricing, no hidden fees. Will definitely use again.', 5, 'Trustpilot', 3);

-- FAQ
insert into public.faq (question, answer, sort_order) values
  ('Какие документы нужны для аренды?', 'Действительные водительские права категории B (стаж от 2 лет), паспорт или ID-карта, кредитная карта для блокировки депозита. Минимальный возраст — 25 лет.', 1),
  ('Что входит в стоимость аренды?', 'Базовая страховка CDW (Collision Damage Waiver), НДС (IVA 21%), лимит 200 км в день. Полная страховка без франшизы, доп. водитель и другие опции — за дополнительную плату.', 2),
  ('Какой размер депозита?', 'От €4,000 до €6,000 в зависимости от класса автомобиля. Депозит блокируется на кредитной карте и возвращается в течение 7-14 дней после возврата авто без повреждений.', 3),
  ('Принимаете ли дебетовые карты?', 'Нет, для блокировки депозита принимаются только кредитные карты Visa, Mastercard или American Express. Это стандартное требование для аренды премиальных автомобилей.', 4),
  ('Как происходит получение и возврат?', 'Мы доставляем автомобиль в аэропорт Аликанте, ваш отель или виллу. Документы подписываются на месте при получении — без офисов и очередей. Возврат в любую удобную точку.', 5),
  ('Можно ли выехать за пределы Испании?', 'Выезд за пределы Испании возможен по предварительному согласованию и при оформлении расширенной страховки. Свяжитесь с нами для уточнения условий.', 6),
  ('Что происходит при ДТП или повреждении?', 'Свяжитесь с нашим консьержем 24/7 — мы организуем эвакуацию и замену авто. С базовой страховкой CDW ваша ответственность ограничена размером франшизы. С полной страховкой — €0.', 7),
  ('Можно ли отменить бронирование?', 'Бесплатная отмена за 48 часов до начала аренды. При отмене менее чем за 48 часов — штраф 50% от стоимости первого дня.', 8);
