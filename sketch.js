var gameState = 0;
var wealthCount = 0;
var thief;
var thiefImg;
var bgrd1, bgrd2, bgrdImg, instructionsBGRD;
var gem, objectsArray;
var police1, police2, police3;
var objectIndex = 0;
var lifeCount = 15;
var upperInvisible, lowerInvisible;
var playIcon, playIconImg, restartIcon, restartIconImg;
var naarangi1, naarangi2, naarangi3, beerangi1, beerangi2, beerangi3;
let gemCollectSound, policeSirenSound, naarangiComingSound, beerangiComingSound;
let explosionSound, gameOverMusic, gamePlayMusic, thrillerBGM, thrillerBGM2, gameWinMusic;
let bonusSound, restartMusic, bankruptSound, ohNoSound, bonusLifeSound;
var startSprite;
var startSpriteImg, endBGRDImg, winBGRDImg;
var startTime = null;
var latestTime = null;
var elapsedTime = null;
var velocityIncreaseTime = 0;
var wealthCountIncTime = 0;
var velocityIncrease = 0;
var velIncDone = false;
var wealthCountBonus = false;
var loopedThrillerMusic = false;
var loopedThrillerMusic2 = false;
var choruIntroSprite, naarangiIntroSprite, beerangiIntroSprite;
var naarangiImg, beerangiImg;
var winTime = 300;
var bankruptSoundPlayed = false;
var ohNoSoundPlayed = false;
var bonusLifeInc = false;

function preload()
{
  gemCollectSound = loadSound("SoundFiles/gemCollectSound.wav");
  policeSirenSound = loadSound("SoundFiles/policeSiren.wav");
  naarangiComingSound = loadSound("SoundFiles/naarangiComingSound.wav");
  beerangiComingSound = loadSound("SoundFiles/beerangiSound.mp3");
  explosionSound = loadSound("SoundFiles/explosion.wav");
  gameOverMusic = loadSound("SoundFiles/gameOverMusic.mpeg");
  gamePlayMusic = loadSound("SoundFiles/gamePlayMusic.wav");
  thrillerBGM = loadSound("SoundFiles/thrillerBGM2.mp3");
  thrillerBGM2 = loadSound("SoundFiles/thrillerBGM.mp3");
  gameWinMusic = loadSound("SoundFiles/gameWinMusic.mp3");
  bonusSound = loadSound("SoundFiles/bonusSound.wav");
  restartMusic = loadSound("SoundFiles/restartMusic.wav");
  bankruptSound = loadSound("SoundFiles/bankruptSound.wav");
  ohNoSound = loadSound("SoundFiles/OhNoSound.wav");
  bonusLifeSound = loadSound("SoundFiles/bonusLifeSound.wav");

  bgrdImg = loadImage("ImageFiles/background.jpg");
  instructionsBGRD = loadImage("ImageFiles/instructionsBGRD.jpg");
  playIconImg = loadImage("ImageFiles/playIcon.png");
  startSpriteImg = loadImage("ImageFiles/choruStartState.png");
  endBGRDImg = loadImage("ImageFiles/ChoruBehindBars.jpg");
  winBGRDImg = loadImage("ImageFiles/gameWinImg.png");
  restartIconImg = loadImage("ImageFiles/restartIcon.png");
  naarangiImg = loadImage("ImageFiles/naarangi.png");
  beerangiImg = loadImage("ImageFiles/beerangi.png");
}
function setup()
{
  createCanvas(displayWidth, displayHeight);
  bgrd1 = createSprite(displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  bgrd1.addImage(bgrdImg);
  bgrd1.scale = 2.5;
  bgrd1.visible = false;

  bgrd2 = createSprite(displayWidth + displayWidth/2, displayHeight/2, displayWidth, displayHeight);
  bgrd2.addImage(bgrdImg);
  bgrd2.scale = 2.5;
  bgrd2.visible = false;

  upperInvisible = createSprite(displayWidth/2, 35, displayWidth, 5);
  upperInvisible.visible = false;
  lowerInvisible = createSprite(displayWidth/2, displayHeight - 5, displayWidth, 5);
  lowerInvisible.visible = false;

  thief = new Thief(displayWidth/10, displayHeight/2 + 300);

  playIcon = createSprite(displayWidth/2 + 150, displayHeight - 270);
  playIcon.addImage(playIconImg);
  playIcon.scale = 0.3;

  startSprite = createSprite(displayWidth - 200, displayHeight - 150, 20, 20);
  startSprite.addImage(startSpriteImg);
  startSprite.scale = 0.4;

  restartIcon = createSprite(displayWidth/2, displayHeight/2, 20, 20);
  restartIcon.addImage(restartIconImg);
  restartIcon.scale = 0.2;
  restartIcon.visible = false;

  choruIntroSprite = createSprite(displayWidth/3.5 + 600, 90, 20, 20);
  choruIntroSprite.addAnimation("moving", thief.image);
  choruIntroSprite.scale = 1;
  choruIntroSprite.visible = false;

  naarangiIntroSprite = createSprite(displayWidth/3.5, displayHeight - 150, 20, 20);
  naarangiIntroSprite.addImage(naarangiImg);
  naarangiIntroSprite.scale = 0.1;
  naarangiIntroSprite.visible = false;

  beerangiIntroSprite = createSprite(displayWidth/3.5 + 200, displayHeight - 150, 20, 20);
  beerangiIntroSprite.addImage(beerangiImg);
  beerangiIntroSprite.scale = 0.2;
  beerangiIntroSprite.visible = false;

  objectsArray = new Array();
}

function draw()
{
  background(255);

  if(gameState === 0)
  {
    gameStart();
  }

  if(gameState === 1)
  {
    gamePlay("sprites");
  }

  if(gameState === 2)
  {
    gameEnd();
  }

  if(gameState === 3)
  {
    gameWin();
  }

  drawSprites(); 

  if(gameState === 1)
  {
    gamePlay("string");
  }
}

function destroyAllSprites()
{
  thief.sprite.destroy();
  for(var i = 0; i < objectsArray.length; i++)
  {
    if(objectsArray[i].sprite != null) 
    {
      objectsArray[i].sprite.destroy();
      objectsArray[i] = null;
    }
  }
}

function gameStart()
{
  background(instructionsBGRD);
  choruIntroSprite.visible = true;
  naarangiIntroSprite.visible = true;
  beerangiIntroSprite.visible = true;
  fill("cyan");
  textFont("Lucida Calligraphy");
  textSize(30);
  text("BHAAGH  CHORU  BHAAGH !!", displayWidth/3.5, 100);
  textSize(20);
  fill("white");
  text("* You are a Night-Time Robinhood CHORU who has to steal wealth for the poor.", displayWidth/11, 180);
  text("* You can use the UP and DOWN Arrow Keys to help CHORU Navigate.", displayWidth/11, 245);
  text("* Beware of the Twin Demons and thieves NAARANGI and BEERANGI.", displayWidth/11, 310);
  text("* CHORU has " + lifeCount + " lives to escape from the POLICE and gets bonus lives for a good wealth status.", displayWidth/11, 375);
  text("* CHORU wins if he escapes from the police for " + winTime + " seconds.", displayWidth/11, 440);
  text("* Click PLAY Icon to enter CHORU's Night-Time Adventures.", displayWidth/11, 505);
  textFont("Matura MT Script Capitals");
  fill("black");
  textSize(32);
  text("Naarangi & Beerangi Brothers", displayWidth/3.5 - 75, displayHeight - 90);
  if(playIcon != null)
  {
    if(mousePressedOver(playIcon))
    {
      playIcon.destroy();
      startSprite.destroy();
      choruIntroSprite.destroy();
      naarangiIntroSprite.destroy();
      beerangiIntroSprite.destroy();
      gamePlayMusic.loop();
      gameState = 1;
      startTime = new Date();
    }
  }
}

function gamePlay(input)
{
  if(input === "sprites")
  {
    latestTime = new Date();
    elapsedTime = Math.round((latestTime - startTime)/1000);

    if(elapsedTime != 0 && elapsedTime % 30 === 0 && ! velIncDone)
    {
      velocityIncreaseTime = elapsedTime;
      velocityIncrease = velocityIncrease - 5;
      velIncDone = true;
    }

    if((elapsedTime - velocityIncreaseTime) >= 5)
    {
      velIncDone = false;
      velocityIncreaseTime = 0;
    }

    if(wealthCount < 5000)
    {
      bonusLifeInc = false;
    }

    if(elapsedTime != 0 && elapsedTime % 60 === 0 && ! wealthCountBonus)
    {
      bonusSound.play();
      wealthCountIncTime = elapsedTime;
      wealthCount = wealthCount + 2000;
      wealthCountBonus = true;
      incrementBonusLifeCount();
    }

    if((elapsedTime - wealthCountIncTime) >= 5)
    {
      wealthCountBonus = false;
      wealthCountIncTime = 0;
    }

  if(keyDown("up")) thief.sprite.velocityY = -10;
  if(keyDown("down")) thief.sprite.velocityY = 10;

  if(elapsedTime >= 63)
  {
    gamePlayMusic.stop();
    if(loopedThrillerMusic === false)
    {
      thrillerBGM.loop();
      loopedThrillerMusic = true;
    }
  }
  if(elapsedTime >= 150)
  {
    thrillerBGM.stop();
    if(loopedThrillerMusic2 === false)
    {
      thrillerBGM2.loop();
      loopedThrillerMusic2 = true;
    }
    if (keyDown("up")) thief.sprite.velocityY = -20;
    if (keyDown("down")) thief.sprite.velocityY = 20;
  }

  if(keyWentUp("up") || keyWentUp("down")) thief.sprite.velocityY = 0;

  bgrd1.visible = true;
  bgrd2.visible = true;
  
  bgrd1.velocityX = -2;
  bgrd2.velocityX = -2;

  thief.sprite.visible = true;
  thief.sprite.collide(upperInvisible);  
  thief.sprite.collide(lowerInvisible);

  if(bgrd2.x === displayWidth/2) bgrd1.x = displayWidth + displayWidth/2;
  if(bgrd1.x === displayWidth/2) bgrd2.x = displayWidth + displayWidth/2;
  if(frameCount % 20 === 0)
  {
    var r = Math.round(random(1, 8));
    if(r < 6)
    {
      gem = new Gems(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
      objectsArray[objectIndex] = gem;
      gem.display();
      objectIndex = objectIndex + 1;
    }

    if(r === 6)
    {
      police1 = new Police(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
      objectsArray[objectIndex] = police1;
      objectIndex = objectIndex + 1;
      police1.display();

      if(elapsedTime >= 60)
      {
        police2 = new Police(displayWidth, police1.y + 100, r, objectIndex);
        objectsArray[objectIndex] = police2;
        objectIndex = objectIndex + 1;
        police2.display();
      }

      if(elapsedTime >= 150)
      {
        police3 = new Police(displayWidth, police1.y - 100, r, objectIndex);
        objectsArray[objectIndex] = police3;
        objectIndex = objectIndex + 1;
        police3.display();
      }
      policeSirenSound.play();
    }

    if(r === 7)
    {
      naarangi1 = new Demons(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
      objectsArray[objectIndex] = naarangi1;
      naarangi1.display();
      objectIndex = objectIndex + 1;

      if(elapsedTime >= 60)
      {
        naarangi2 = new Demons(displayWidth, naarangi1.y + 100, r, objectIndex);
        objectsArray[objectIndex] = naarangi2;
        naarangi2.display();
        objectIndex = objectIndex + 1;
      }

      if(elapsedTime >= 150)
      {
        naarangi3 = new Demons(displayWidth, naarangi1.y - 100, r, objectIndex);
        objectsArray[objectIndex] = naarangi3;
        naarangi3.display();
        objectIndex = objectIndex + 1;
      }
      ohNoSoundPlayed = false;
      naarangiComingSound.play();
    }

    if(r === 8)
    {
      beerangi1 = new Demons(displayWidth, random(displayHeight/10, displayHeight - 50), r, objectIndex);
      objectsArray[objectIndex] = beerangi1;
      beerangi1.display();
      objectIndex = objectIndex + 1;

      if(elapsedTime >= 60)
      {
        beerangi2 = new Demons(displayWidth, beerangi1.y + 100, r, objectIndex);
        objectsArray[objectIndex] = beerangi2;
        beerangi2.display();
        objectIndex = objectIndex + 1;
      }

      if(elapsedTime >= 150)
      {
        beerangi3 = new Demons(displayWidth, beerangi1.y - 100, r, objectIndex);
        objectsArray[objectIndex] = beerangi3;
        beerangi3.display();
        objectIndex = objectIndex + 1;
      }
      bankruptSoundPlayed = false;
      beerangiComingSound.play();
    }
  }

  for(var i = 0; i < objectsArray.length; i++)
  {
    if(objectsArray[i] != null)
    {
      if(objectsArray[i].sprite.isTouching(thief.sprite))
    {
      if(objectsArray[i].objNum === 1)
      {
        gemCollectSound.play();
        wealthCount = wealthCount + 100;
        incrementBonusLifeCount();
      }

      else if(objectsArray[i].objNum === 2)
      {
        gemCollectSound.play();
        wealthCount = wealthCount + 200;
        incrementBonusLifeCount();
      }

      else if(objectsArray[i].objNum === 3)
      {
        gemCollectSound.play();
        wealthCount = wealthCount + 300;
        incrementBonusLifeCount();
      }

      else if(objectsArray[i].objNum === 4)
      {
        gemCollectSound.play();
        wealthCount = wealthCount + 400;
        incrementBonusLifeCount();
      }

      else if(objectsArray[i].objNum === 5)
      {
        gemCollectSound.play();
        wealthCount = wealthCount + 50;
        incrementBonusLifeCount();
      }

      else if(objectsArray[i].objNum === 6)
      {
        explosionSound.play();
        lifeCount = lifeCount - 1;
        if(lifeCount === 0)
        {
          gameOverMusic.play();
          destroyAllSprites();
          gameState = 2;
        }
        
      }

      else if(objectsArray[i].objNum === 7)
      {
        if(ohNoSoundPlayed === false)
        {
          ohNoSound.play();
          ohNoSoundPlayed = true;
        }
        wealthCount = Math.round(wealthCount - (wealthCount/2));
      }

      else if(objectsArray[i].objNum === 8)
      {
        if(bankruptSoundPlayed === false)
        {
          bankruptSound.play();
          bankruptSoundPlayed = true;
        }
        wealthCount = 0;
      }
      if(objectsArray[i] != null)
      {
        if(objectsArray[i].sprite != null) objectsArray[i].sprite.destroy();
      }
    }
    }
   }

    if(elapsedTime >= winTime && lifeCount > 0 && wealthCount > 0)
    {
      gameWinMusic.play();
      destroyAllSprites();
      gameState = 3;
    }

  }

  else if(input === "string")
  {
    fill("white");
    textSize(15);
    textFont("Lucida Calligraphy");
    text("Wealth collected: Rs. " + wealthCount, displayWidth/2 - 50, displayHeight/10);
    text("Lives Left: " + lifeCount, displayWidth/2 + 400, displayHeight/10);
    if(elapsedTime === 1)
        text("Survival Time: " + elapsedTime + " second", displayWidth/2 - 500, displayHeight/10);
    else 
        text("Survival Time: " + elapsedTime + " seconds", displayWidth/2 - 500, displayHeight/10);
    if((elapsedTime != 0 && elapsedTime != 1) && (elapsedTime % 60 === 0 || elapsedTime % 60 === 1))
    {
      fill("orange");
      textFont("Old English Text MT");
      textSize(60);
      text("Bonus Wealth !!", displayWidth/2 - 200, displayHeight/2);
    }

    if(elapsedTime === 0 || elapsedTime === 1 || elapsedTime === 2)
    {
      fill("orange");
      textFont("MV Boli");
      textSize(60);
      text("CHORU ENTERS LEVEL 1 !!", displayWidth/2 - 420, displayHeight/2);
    }

    if(elapsedTime === 63 || elapsedTime === 64 || elapsedTime === 65)
    {
      fill("orange");
      textFont("MV Boli");
      textSize(60);
      text("CHORU ENTERS LEVEL 2 !!", displayWidth/2 - 420, displayHeight/2);
    }

    if(elapsedTime === 150 || elapsedTime === 151 || elapsedTime === 152)
    {
      fill("orange");
      textFont("MV Boli");
      textSize(60);
      text("CHORU ENTERS LEVEL 3 !!", displayWidth/2 - 420, displayHeight/2);
    }
  }
}

function gameEnd()
{
  background(endBGRDImg);
  endStateActions();
  fill("red");
  textSize(40);
  textFont("Matura MT Script Capitals");
  text("Game Over !! Choru has been Arrested.", displayWidth/2 - 370, displayHeight/6);
  text("Replay", displayWidth/2 - 70, displayHeight/2 - 50);
}

function gameWin()
{
  background(winBGRDImg);
  restartIcon.x = displayWidth/2 + 70;
  restartIcon.y = displayHeight/1.2;
  endStateActions();
  stroke(4);
  fill("black");
  textFont("Lucida Calligraphy");
  textSize(20);
  text("CHORU has escaped from the POLICE \nand has earned Rs. " + wealthCount + " for the poor !!", displayWidth/2.8, displayHeight/14);
  text("Replay", displayWidth/2 + 30, displayHeight/1.2 - 50);
}

function endStateActions()
{
  gamePlayMusic.stop();
  thrillerBGM.stop();
  thrillerBGM2.stop();
  bgrd1.destroy();
  bgrd2.destroy();
  upperInvisible.destroy();
  lowerInvisible.destroy();
  restartIcon.visible = true;
  if(mousePressedOver(restartIcon))
  {
    restartMusic.play();
    restartIcon.destroy();
    gameOverMusic.stop();
    gameWinMusic.stop();
    lifeCount = 15;
    wealthCount = 0;
    objectIndex = 0;
    velocityIncrease = 0;
    velIncDone = false;
    velocityIncreaseTime = 0;
    wealthCountIncTime = 0;
    wealthCountBonus = false;
    loopedThrillerMusic = false;
    loopedThrillerMusic2 = false;
    ohNoSoundPlayed = false;
    bankruptSoundPlayed = false;
    bonusLifeInc = false;
    setup();
    gameState = 0;
  }
}

function incrementBonusLifeCount()
{
  if(bonusLifeInc === false && wealthCount >= 5000)
  {
    bonusLifeSound.play();
    lifeCount = lifeCount + 1;
    bonusLifeInc = true;
  }
}