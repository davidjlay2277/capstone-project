# Star Wars Epic Duels

Star Wars Epic Duels is a Milton Bradley tabletop game. This application is a simplified web-based adaptaiton where players can select characters from the Star Wars universe and engage in card battles against a bot opponent.

## Disclaimer

Star Wars is a registered trademark of Lucasfilm Ltd. This project is an unofficial fan project and is not endorsed by or affiliated with Lucasfilm Ltd. The Star Wars name, characters, and related images are © Lucasfilm Ltd. All rights reserved. This project is created for educational purposes and personal interest. The use of Star Wars characters and elements is solely for illustrative and entertainment purposes.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Database](#database)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Technologies Used](#technologies-used)
- [Additional Documents](#additional-documents)
- [Authors](#authors)

## Description

Star Wars Epic Duels is a web application that allows players to choose characters, play cards, and engage in battles against a bot opponent. The game features a responsive interface and interactive gameplay. Players can select their characters, play cards with different attack and defense values, and watch the battle unfold in real time.

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/davidjlay2277/capstone-project

2. 
    install dependencies: 
    
    npm install


3. Set up your environment variables in a .env file at the root directory:

        SERVER_PORT=4477
        CONNECTION_STRING=your-database-connection-string

4. Start the server:
    nodemon server

## Database

In hte Server directory, the Seed.sql file contains all the SQL needed to seed the database used for gameplay. In the event that the CONNECTION_STRING (URI) is unavialble, simply re-seed an alt db using the SQL provided and update CONNECITON_STRING

The applicaiton accounts for growth in the db. Version 1 has two player characters and two bots with five cards each. Additional chracters can be added and play tested. The intention behind the gamestats table is to provide a means for creating balanced and interesting characters.

## Usage

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

- GET /characters: Retrieves a list of available characters for selection.
- POST /players: Creates player and bot characters for the game.
- POST /startGame: Initializes the game with players and their cards.
- GET /currentGame: Retrieves the current game state.
- POST /playCard: Plays a card in the current game.
- PUT /logGame: Logs the game stats at the end of the game.
- DELETE /resetGame: Resets the game state.

## Technologies Used:

- HTML
- CSS
- JavaScript
- Express.js
- Axios
- Node
- PostgreSQL
- SQL

## Additional Documents

Project documentation can found in capstone-project/plan

## Authors
David Lay
