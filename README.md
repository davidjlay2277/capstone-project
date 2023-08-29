# Star Wars Epic Duels

Star Wars Epic Duels is a web-based card duel game where players can select characters from the Star Wars universe and engage in epic card battles against a bot opponent.

## Disclaimer

Star Wars is a registered trademark of Lucasfilm Ltd. This project is an unofficial fan project and is not endorsed by or affiliated with Lucasfilm Ltd. The Star Wars name, characters, and related images are © Lucasfilm Ltd. All rights reserved. 

## Educational and Personal Project

This project is created for educational purposes and personal interest. It is intended to showcase skills in web development, JavaScript programming, and working with APIs. The use of Star Wars characters and elements is solely for illustrative and entertainment purposes.

## Table of Contents

<!-- ... rest of the README content ... -->


## Table of Contents

- [Description](#description)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Authors](#authors)
- [License](#license)

## Description

Star Wars Epic Duels is a web application that allows players to choose characters, play cards, and engage in battles against a bot opponent. The game features a responsive interface and interactive gameplay. Players can select their characters, play cards with different attack and defense values, and watch the battle unfold in real time.

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/star-wars-epic-duels.git

2. 
    install dependencies: 
    
    npm install


3. Set up your environment variables:

    Create a .env file in the root directory and add the following:

        SERVER_PORT=4477
        CONNECTION_STRING=your-database-connection-string

4. Start the server:
    nodemon server

## Database

A Seed.sql file contains all the SQL needed to see the database. In the event that the CONNECTION_STRING (URI) is unavialble, simply re-seed an alt db using hte SQL provided and update the CONNECITON_STRING

The applicaiton accoutns for growth in the db. version 1 has 2 characters with 5 cards each. Additional chracters can be added and play tested. The intention behind hte gameStats table is to provide a means for creating balanced and interesting characters 

## Usage

- Once the application is running, follow these steps:

1. Select a character from the character dropdown list.
2. Click the "Select" button to choose the character.
3. Click the "Start Game" button to begin the duel.
4. Play cards by clicking on them.
    Bot Cards will be played in a random sequence. Each character always has the same hand. the strategy is in recalling the values remaining and the nshoosing a sequence.
5. Observe the battle results and resolve damage as needed.
6. The game ends when one of hte follwing is satisfied:
    the player's health reached 0
    the bot's health reaches zero
    the player runs out of cards (the version currentl yaccounts for 5 cards per player)
7. When the game ends, a player can:
    Log the game stats to the database
    Start a New game

## Endpoints

The application has the following endpoints:

- GET /characters: Retrieves a list of available characters for selection.
- POST /players: Creates player and bot characters for the game.
- POST /startGame: Initializes the game with player and bot characters.
- GET /currentGame: Retrieves the current game state.
- POST /playCard: Plays a card in the current game.
- PUT /logGame: Logs the game stats at the end of the game.
- DELETE /resetGame: Resets the game state.

## Technologies Used:
- HTML, CSS
- JavaScript
- Express.js
- Sequelize (with PostgreSQL)
- Axios

## Additional Documents

## 

## Authors
David Lay
GitHub Profile: 
Repo : 