DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(6,2) default 0,
stock_quantity INT default 0,
product_sales DECIMAL(6,2),
PRIMARY KEY(item_id)
);

CREATE TABLE departments
(
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(50) NOT NULL,
over_head_costs DECIMAL(6,2) default 0,
PRIMARY KEY(department_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Powerbeats 3 Wireless In-Ear Headphones", "Electronics", 129.99, 10, 2000);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("AHAVA Purifying Dead Sea Mask", "Health/Beauty", 27.99, 7, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("FORLIFE Extra Fine Tea Infuser", "Home", 13, 5, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Mkono Ceramic Rabbit Food Bowl", "Home", 15, 3, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("North Decor Faux Fur Throw Pillow", "Home", 14, 2, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Catan 5th Edition Board Game", "Toys/Games", 39.99, 3, 400);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("LEGO CITY Fire Station Set", "Toys/Games", 97.99, 1, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Asics Women's Gel-Kayano Running Shoe", "Clothing", 69, 2, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Nike Men's Metcon 3 Training Shoe", "Clothing", 109, 2, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales) VALUES ("Speck CandyShell Case for iPhone X", "Electronics", 20, 6, 1000);

INSERT INTO departments (department_name, over_head_costs) VALUES ("Electronics", 200);
INSERT INTO departments (department_name, over_head_costs) VALUES ("Home", 100);
INSERT INTO departments (department_name, over_head_costs) VALUES ("Clothing", 100);
INSERT INTO departments (department_name, over_head_costs) VALUES ("Toys/Games", 100);
INSERT INTO departments (department_name, over_head_costs) VALUES ("Health/Beauty", 100);

