
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price DECIMAL(6,2) default 0,
stock_quantity INT default 0,
PRIMARY KEY(item_id)
);

INSERT INTO products VALUES ("Powerbeats 3 Wireless In-Ear Headphones", "Electronics", 129.99, 10);
INSERT INTO products VALUES ("AHAVA Purifying Dead Sea Mask", "Health/Beauty", 27.99, 7);
INSERT INTO products VALUES ("FORLIFE Extra Fine Tea Infuser", "Kitchen", 13, 5);
INSERT INTO products VALUES ("Mkono Ceramic Rabbit Food Bowl", "Pet", 15, 3);
INSERT INTO products VALUES ("North Decor Faux Fur Throw Pillow", "Bed/Bath", 14, 2);
INSERT INTO products VALUES ("Catan 5th Edition Board Game", "Toys/Games", 39.99, 3);
INSERT INTO products VALUES ("LEGO CITY Fire Station Set", "Toys/Games", 97.99, 1);
INSERT INTO products VALUES ("Asics Women's Gel-Kayano Running Shoe", "Clothing", 69, 2);
INSERT INTO products VALUES ("Nike Men's Metcon 3 Training Shoe", "Clothing", 109, 2);
INSERT INTO products VALUES ("Speck CandyShell Case for iPhone X", "Electronics", 20, 6);
