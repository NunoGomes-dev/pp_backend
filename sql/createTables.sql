-- @block 
CREATE TABLE Users (
    id BIGSERIAL PRIMARY KEY,
    firstname VARCHAR(55) NOT NULL,
    lastname VARCHAR(55) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
    vat VARCHAR(9),
    phone VARCHAR(55)
);

-- @block 
CREATE TABLE Clients (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL, 
    -- FOREIGN KEY (created_by) REFERENCES Clients(id)
);

-- @block 
CREATE TABLE Types (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(55) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Clients(id)
);

-- @block 
CREATE TABLE Orders (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(55) NOT NULL,
    FOREIGN KEY (client_id) REFERENCES Clients(id)
    FOREIGN KEY (type_id) REFERENCES Types(id)
    -- FOREIGN KEY (created_by) REFERENCES Users(id)
);


-- @block 
CREATE TABLE Brands (
	id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
    -- FOREIGN KEY (created_by) REFERENCES Users(id)
);


-- @block 
CREATE TABLE Providers (
    id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
    -- FOREIGN KEY (created_by) REFERENCES Users(id)
);

-- @block 
CREATE TABLE Storages (
    id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
    -- FOREIGN KEY (created_by) REFERENCES Users(id)
);

-- @block 
CREATE TABLE part (
    id BIGSERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
    description: VARCHAR(255),
	stock INTEGER NOT NULL CHECK (stock >= 0),
	min_stock INTEGER NOT NULL CHECK (min_stock >= 0),
	cost MONEY NOT NULL,
	price MONEY NOT NULL,
	resale_price MONEY NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES Brands(id)
    FOREIGN KEY (provider_id) REFERENCES Providers(id)
    FOREIGN KEY (storage_id) REFERENCES Storages(id)
    -- FOREIGN KEY (created_by) REFERENCES Users(id)
);
