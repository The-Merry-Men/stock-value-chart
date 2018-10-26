DROP DATABASE IF EXISTS robinhood;

CREATE DATABASE robinhood;

USE robinhood;

CREATE TABLE companies
( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL);

CREATE TABLE stocks (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
company INT NOT NULL,
dateTime DATETIME NOT NULL,
price INT NOT NULL,
FOREIGN KEY (company) REFERENCES companies (id));