CREATE TABLE users(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(40) NOT NULL,
  first_name VARCHAR(40) NOT NULL,
  last_name VARCHAR(40) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(256) NOT NULL,
  tier VARCHAR(20) NOT NULL DEFAULT = "Free"
);

INSERT INTO users(username, email, password, ip) VALUES ("jordan", "jlewis2008@live.com", "hi", "127");