CREATE TABLE projetos (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nome VARCHAR(150) NOT NULL,
                          descricao VARCHAR(300) NOT NULL,
                          datainicio DATE NOT NULL,
                          datafim DATE NOT NULL,
                          status VARCHAR(255) NOT NULL,
                          responsavel VARCHAR(100) NOT NULL
);

CREATE TABLE usuarios (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nome VARCHAR(100) NOT NULL,
                          nomeuser VARCHAR(20) NOT NULL,
                          email VARCHAR(50) NOT NULL,
                          status VARCHAR(20),
                          projeto_id BIGINT,
                          FOREIGN KEY (projeto_id) REFERENCES projetos(id)
);
