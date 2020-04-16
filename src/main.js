import $ from 'jquery';
import './styles.css';
import { changeState, heal, portland, playerPortland, takeDamage, enemyTakeDamage, randomName, giveName, player1, enemy } from './../src/game.js';


$(document).ready(function() { 
  
  $('#name-submit').click(function() {
    event.preventDefault();
    const newChar = player1(giveName);
    console.log(newChar);
    newChar.playerName = $('#name').val();
    $('#health-value').text(newChar.health);
    $('#name-value').text(newChar.playerName);
    $('#strength-value').text(newChar.strength);
    $('#level-value').text(newChar.level);
    $('#name-form').hide();
    $('#name-submit').hide();
    $('#playerOptions').show();
    $('#character-card').show();

  });

  $('#fight').click(function() {
    event.preventDefault();
    // function that will create a random opponent based off of player1's level?     
    const newEnemy = enemy(randomName);
    const bossNameArray = ["Grumpy", "Sleepy", "Dopey", "Happy", "Sneezy", "Bashful", "Doc"];
    newEnemy.name = bossNameArray[Math.floor(Math.random() * 7)];
    newEnemy.health = Math.floor(Math.random() * (90)) + 10;
    newEnemy.strength = Math.floor(Math.random() * (10)) + 1;
    console.log (newEnemy);
    $('#enemy-name-value').text(newEnemy.name);
    $('#enemy-health-value').text(newEnemy.health);
    $('#enemy-strength-value').text(newEnemy.strength);
    $('#enemy').show();
    $('#playerOptions').hide();
    $('#battleOptions').show();
  }); 

  $('#town').click(function() {
    event.preventDefault();
    // add hidden town select screen
    // $('#townScreen').show();
  });

  $('#heal').click(function() {
    event.preventDefault();
    const newPlayerState = player1(heal);
    
    $('#health-value').text(newPlayerState.health);
    
    // for displaying heal message
    // $('#enemyNameHeal').text(newEnemyState.name);
    // $('#userNameHeal').text(newPlayerState.playerName);
    // $('#userHealPoints').text(userHPLost);
    // $('#enemyHealPoints').text(enemyHPLost);
    // if (money >= 25, +100 health)
  });

  $('#attack').click(function() {
    event.preventDefault();
    $("#userAttack").show();
    setTimeout(function() { $("#userAttack").hide(); }, 2000);

    const newEnemyState = enemy(portland);
    const newPlayerState = player1(playerPortland);


    const takeDamage = changeState("health");
    const enemyHit = takeDamage(-2 * newEnemyState.strength);
    const playerDamageTaken = player1(enemyHit);
    

    const enemyTakeDamage = changeState("health");
    const playerHit = enemyTakeDamage(-3 * newPlayerState.strength);
    const enemyDamageTaken = enemy(playerHit);

    const userHPLost = newPlayerState.health - playerDamageTaken.health; 
    const enemyHPLost = newEnemyState.health - enemyDamageTaken.health;


    console.log(playerDamageTaken);
    console.log(enemyDamageTaken);
    console.log(enemyTakeDamage);
    console.log(takeDamage)
    $('#enemy-health-value').text(enemyDamageTaken.health);
    $('#health-value').text(playerDamageTaken.health);
    $('#enemyNameAttack').text(enemyDamageTaken.name);
    $('#userNameAttack').text(playerDamageTaken.playerName);
    $('#userHitPoints').text(userHPLost);
    $('#enemyHitPoints').text(enemyHPLost);

  }); 

    // add hidden heal div to show temporarily when player heals
    // $('#healScreen').show();
  
});