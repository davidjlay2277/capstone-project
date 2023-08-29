# Dev Mountain Foundations Capstone Plan

**Student:** David Lay  
**Date:** August 2023

## Summary

For my Capstone Project, I will be recreating a simplified version of a Star Wars tabletop game, Epic Duels. The app will allow users to select a character and battle an AI opponent by playing attack and defense cards.

## Front End

### Single Page

- Heading
- Character/card area
- Action area
- Buttons/forms
  - Select character
  - Start Game
  - Play a card
  - Log game
  - Start a new game

### Styling

- IDs for each character with custom style
- Include uniform style for other page elements, mimic Star Wars theme
- Background images using various stock
- Hover style on buttons coded sections
- See Wireframe below for rough layout

## Data Tables
see capstone-project/plan/db-schema.png
https://github.com/davidjlay2277/capstone-project/blob/master/plan/db-schema.png

### Characters

- Fields: name, starting health, image, status

### Cards

- Each entry represents a character card
- Values: (id, CharacterID, attack, defend, status)

### Stats

- Active game info will append Stats table at game end

## Key Features (Back End)

- Select Character (GET)
- Start game (POST)
  - Get random AI opponent
  - Get a hand (5 random cards)
- Play A Card (POST)
  - User selects a card, which modifies the active game data
  - Select a random CPU card
  - Resolve the outcome
  - Update the health values on the character table
  - Send health outcome back to the user
  - Send an "End of Game" status/rule as needed
- Log/Save game stats (PUT)
  - If the game is over, the user can send the steps
  - TABLE of just stats, history
- End Game (DELETE)
  - User can select Clear the current game table

## Wireframe - Main Page
see capstone-project/plan/wireframe.png
https://github.com/davidjlay2277/capstone-project/blob/master/plan/wireframe.png

## Requirements -  Main Page
see capstone-project/plan/requirements-with-estimate.png
https://github.com/davidjlay2277/capstone-project/blob/master/plan/requirements-with-estimates.png