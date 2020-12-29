CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(40) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(256) NOT NULL,
  ip VARCHAR(256) NOT NULL
);

INSERT INTO users(username, email, password, ip) VALUES ("jordan", "jlewis2008@live.com", "hi", "127");