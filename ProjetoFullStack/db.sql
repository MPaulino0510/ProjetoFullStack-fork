
CREATE DATABASE projeto_final;

USE projeto_final;

CREATE TABLE pessoas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT NOT NULL
);

INSERT INTO pessoas (nome, idade) VALUES
('João', 20),
('Maria', 25),
('Pedro', 30);
