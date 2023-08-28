CREATE TABLE characters(
  idCharacter SERIAL PRIMARY KEY
  ,name VARCHAR(100)
  ,healthStarting INTEGER NOT NULL
  ,status VARCHAR(30) NOT NULL
  ,imgURL VARCHAR(500) DEFAULT 'https://inbetweendrafts.com/wp-content/uploads/2023/05/underrated-star-wars-featured-extras-characters-ilm-stan-winston-henson-1.jpg'
);
INSERT INTO characters(name, healthstarting, status, imgURL)
VALUES
('Luke Skywalker',18,'readyPlayer',
  'https://m.media-amazon.com/images/M/MV5BYWU5ODdhZjItZGE3NC00ZjliLThiYWYtMDgyZGU2YjU0MDhkXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_QL75_UX500_CR0,47,500,281_.jpg')
,('Han Solo',15,'readyPlayer',
  'https://www.usatoday.com/gcdn/presto/2019/11/12/USAT/8ef26a5b-aeff-418d-8de6-dcd4ac409726-han_solo_gun.JPG')
,('Boba Fett',14,'readyBot',
  'https://pyxis.nymag.com/v1/imgs/d33/3f2/43582166e8b4932e752511e4f9e5b52ea6-boba-fett.rsquare.w330.jpg')
,('Darth Vader',22,'readyBot',
  'https://bigthink.com/wp-content/uploads/2022/07/AdobeStock_298943877_Editorial_Use_Only.jpeg')
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

 CREATE TABLE game(
          idGame SERIAL PRIMARY KEY
          ,idUserCharacter INTEGER REFERENCES characters(idCharacter)
          ,idBotCharacter INTEGER REFERENCES characters(idCharacter)
          ,userHealth INTEGER
          ,botHealth INTEGER
          ,winner VARCHAR(100)
        );