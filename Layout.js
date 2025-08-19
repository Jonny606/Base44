<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Player Card</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #121212;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .player-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 15px;
      border: 2px solid #666;
      width: 250px;
      overflow: hidden;
      text-align: center;
      padding: 15px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      cursor: pointer;
    }
    .player-card:hover {
      transform: scale(1.05) translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }
    .rarity-badge {
      padding: 3px 8px;
      border-radius: 8px;
      font-weight: bold;
      font-size: 12px;
      display: inline-block;
      margin-bottom: 5px;
    }
    .level {
      font-size: 12px;
      color: #ccc;
      margin-bottom: 10px;
    }
    .stats {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
    }
    .stat {
      text-align: center;
    }
    .stat span {
      display: block;
      font-size: 14px;
      font-weight: bold;
    }
    .level-up-btn {
      margin-top: 10px;
      padding: 5px 10px;
      background: green;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 12px;
    }
    .level-up-btn:disabled {
      background: #555;
      cursor: not-allowed;
    }
  </style>
</head>
<body>

<div id="player-container"></div>

<script>
  const player = {
    name: "Lionel Messi",
    position: "striker",
    rarity: "legendary",
    cardInfo: { level: 5 },
    power: 90,
    speed: 85,
    accuracy: 95
  };

  const RARITY_STYLES = {
    common: "#888",
    rare: "#3498db",
    epic: "#9b59b6",
    legendary: "#f1c40f"
  };

  const LEVEL_UP_COST = (level) => 5 + Math.floor(level * 1.5);
  let upgradePoints = 20;

  function createPlayerCard(player) {
    const container = document.createElement('div');
    container.className = 'player-card';

    // Rarity badge
    const rarity = document.createElement('div');
    rarity.className = 'rarity-badge';
    rarity.textContent = player.rarity.toUpperCase();
    rarity.style.backgroundColor = RARITY_STYLES[player.rarity] || "#666";
    container.appendChild(rarity);

    // Player name and position
    const name = document.createElement('h3');
    name.textContent = player.name;
    container.appendChild(name);

    const position = document.createElement('p');
    position.textContent = player.position;
    container.appendChild(position);

    // Level
    const level = document.createElement('div');
    level.className = 'level';
    level.textContent = "Level: " + player.cardInfo.level;
    container.appendChild(level);

    // Stats
    const stats = document.createElement('div');
    stats.className = 'stats';
    ['power','speed','accuracy'].forEach(statKey => {
      const statDiv = document.createElement('div');
      statDiv.className = 'stat';
      statDiv.innerHTML = `<span>${player[statKey]}</span>${statKey.toUpperCase()}`;
      stats.appendChild(statDiv);
    });
    container.appendChild(stats);

    // Level up button
    const levelUpBtn = document.createElement('button');
    levelUpBtn.className = 'level-up-btn';
    levelUpBtn.textContent = `Level Up (${LEVEL_UP_COST(player.cardInfo.level)} pts)`;
    levelUpBtn.disabled = upgradePoints < LEVEL_UP_COST(player.cardInfo.level) || player.cardInfo.level >= 10;
    levelUpBtn.onclick = (e) => {
      e.stopPropagation();
      if(upgradePoints >= LEVEL_UP_COST(player.cardInfo.level) && player.cardInfo.level < 10) {
        upgradePoints -= LEVEL_UP_COST(player.cardInfo.level);
        player.cardInfo.level++;
        level.textContent = "Level: " + player.cardInfo.level;
        levelUpBtn.textContent = `Level Up (${LEVEL_UP_COST(player.cardInfo.level)} pts)`;
        if(player.cardInfo.level >= 10) {
          levelUpBtn.disabled = true;
          levelUpBtn.textContent = "MAX LEVEL";
        }
      }
    };
    container.appendChild(levelUpBtn);

    return container;
  }

  const container = document.getElementById('player-container');
  container.appendChild(createPlayerCard(player));
</script>

</body>
</html>
