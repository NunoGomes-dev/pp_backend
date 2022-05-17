CREATE TABLE brand (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE provider (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL
);

CREATE TABLE storage (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE part (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	stock INTEGER NOT NULL CHECK (stock >= 0),
	min_stock INTEGER NOT NULL CHECK (min_stock >= 0),
	cost MONEY NOT NULL,
	price MONEY NOT NULL,
	resale_price MONEY NOT NULL
);

CREATE TABLE part_brand (
  part_id INT NOT NULL,
  brand_id INT NOT NULL,
  PRIMARY KEY (part_id, brand_id),
  FOREIGN KEY (brand_id)
      REFERENCES brand (id),
  FOREIGN KEY (part_id)
      REFERENCES part (id)
);

CREATE TABLE part_provider (
  part_id INT NOT NULL,
  provider_id INT NOT NULL,
  PRIMARY KEY (part_id, provider_id),
  FOREIGN KEY (provider_id)
      REFERENCES provider (id),
  FOREIGN KEY (part_id)
      REFERENCES part (id)
);

CREATE TABLE part_storage (
  part_id INT NOT NULL,
  storage_id INT NOT NULL,
  PRIMARY KEY (part_id, storage_id),
  FOREIGN KEY (storage_id)
      REFERENCES storage (id),
  FOREIGN KEY (part_id)
      REFERENCES part (id)
);

-- CRIARRRRR

CREATE TABLE user (
    uuid BIGSERIAL NOT NULL PRIMARY KEY,
    firstname VARCHAR(55) NOT NULL,
    lastname VARCHAR(55) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL,
    vat VARCHAR(9),
    phone VARCHAR(55)
)

CREATE TABLE client (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(100) UNIQUE NOT NULL, 
);

CREATE TABLE order_type (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(55) NOT NULL,
);

CREATE TABLE order (
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR(55) NOT NULL,
);