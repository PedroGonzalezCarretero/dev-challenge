CREATE DATABASE tgx;

\c tgx

CREATE TABLE public."Weather" (
  id SERIAL PRIMARY KEY,
  city VARCHAR(255),
  dateAndTime TIMESTAMP,
  celsiusTemperature FLOAT,
  condition VARCHAR(255),
  conditionIcon VARCHAR(255)
);
