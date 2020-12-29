CREATE TABLE sessions(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  stake VARCHAR(10) NOT NULL,
  limit_type VARCHAR(20) NOT NULL DEFAULT "No Limit",
  game VARCHAR(40) NOT NULL DEFAULT "Hold Em",
  venue VARCHAR(60) NOT NULL,
  buyin DECIMAL(8,2) NOT NULL,
  cashout DECIMAL(8,2) NOT NULL,
  date_play DATE NOT NULL,
  time_length DECIMAL(4,2) NOT NULL,
  FOREIGN KEY(user_id) references users(id)
);