const playerHand = [
    {
      idcard: 1,
      idcharacter: 1,
      attackValue: 5,
      attackValue: 1,
      status: "hand",
  
    },
    {
      idcard: 1,
      idcharacter: 1,
      attackValue: 3,
      attackValue: 2,
      status: "hand",
  
    },
    {
      idcard: 1,
      idcharacter: 1,
      attackValue: 1,
      attackValue: 4,
      status: "hand",
  
    },
  ];
  
  const botHand = [
      {
        idcard: 1,
        idcharacter: 2,
        attackValue: 5,
        attackValue: 1,
        status: "hand",
    
      },
      {
        idcard: 1,
        idcharacter: 2,
        attackValue: 3,
        attackValue: 2,
        status: "hand",
    
      },
      {
        idcard: 1,
        idcharacter: 2,
        attackValue: 1,
        attackValue: 4,
        status: "hand",
    
      },
    ];

let gameCurrent = {
        playerId: 1,
        botId: 2,
        playerName: 'luke',
        botName: 'darth',
        playerHealth: 16,
        botHealth: 22,
        playerHand: playerHand,
        botHand: botHand,
      };






      module.exports = {
        postCard2: (req, res) => {
          let playerCardId = 2;
          let botCardId = 7;
          let { playerHand, botHand, playerHealth, botHealth } = gameCurrent;
      
          const playerCardPromise = new Promise((resolve) => {
            findCard(playerHand, playerCardId)
              .then(playerCard => {
                console.log('playerCard:', playerCard);
                resolve(playerCard);
              })
              .catch(error => {
                console.error('Error getting player card:', error);
                resolve(null); // Resolve with a default value or handle the error
              });
          });
      
          const botCardPromise = new Promise((resolve) => {
            findCard(botHand, botCardId)
              .then(botCard => {
                console.log('botCard:', botCard);
                resolve(botCard);
              })
              .catch(error => {
                console.error('Error getting bot card:', error);
                resolve(null); // Resolve with a default value or handle the error
              });
          });
      
          const playerHealthPromise = Promise.resolve(playerHealth);
          const botHealthPromise = Promise.resolve(botHealth);
      
          Promise.all([
            playerCardPromise,
            botCardPromise,
            playerHealthPromise,
            botHealthPromise
          ])
            .then(([playerCard, botCard, playerHealth, botHealth]) => {
              if (!playerCard || !botCard) {
                // Handle the case where card retrieval failed
                res.status(500).send("Error occurred: Card retrieval failed");
                return;
              }
      
              let playerDamage = damageCalc(
                playerHealth,
                damageCalc(botCard.attackValue, playerCard.defenseValue)
              );
              let botDamage = damageCalc(
                botHealth,
                damageCalc(playerCard.attackValue, botCard.defenseValue)
              );
      
              playerHand = discard(playerHand, playerCardId);
              botHand = discard(botHand, botCardId);
      
              Object.assign(gameCurrent, {
                playerHealth: playerDamage,
                botHealth: botDamage,
                playerHand: playerHand,
                botHand: botHand,
              });
      
              res.status(200).send(gameCurrent);
            })
            .catch((error) => {
              res.status(500).send("Error occurred: " + error.message);
            });
        }
      };
      