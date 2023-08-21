CREATE TABLE characters(
  idCharacter SERIAL PRIMARY KEY
  ,name VARCHAR(100)
  ,healthStarting INTEGER NOT NULL
  ,status VARCHAR(30) NOT NULL
  ,imgURL VARCHAR(500) DEFAULT 'https://inbetweendrafts.com/wp-content/uploads/2023/05/underrated-star-wars-featured-extras-characters-ilm-stan-winston-henson-1.jpg'
);
INSERT INTO characters(name, healthstarting, status)
VALUES
('Luke Skywalker',18,'readyPlayer')
,('Han Solo',15,'readyPlayer')
,('Boba Fett',14,'readyBot')
,('Darth Vader',22,'readyBot')
;

CREATE TABLE cards(
  idCard SERIAL PRIMARY KEY
  ,idCharacter INTEGER REFERENCES characters(idCharacter)
  ,attackValue INTEGER 
  ,defenseValue INTEGER
  ,cardStatus VARCHAR(30) DEFAULT 'deck'
);
INSERT INTO cards(idCharacter, attackValue, defenseValue)
VALUES 
--LUKE
(1,4,2)
,(1,4,1)
,(1,3,3)
,(1,5,1)
,(1,1,4)
--HAN
,(2,4,2)
,(2,4,1)
,(2,3,3)
,(2,5,1)
,(2,1,4)
--VADER
,(3,4,2)
,(3,4,1)
,(3,3,3)
,(3,1,5)
,(3,1,4)
--BOBA
,(4,4,2)
,(4,4,1)
,(4,3,3)
,(4,5,1)
,(4,1,4);