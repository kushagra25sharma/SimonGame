
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level=0;
var userCount = -1;

$(document).on("keydown", function(event){
  if(level === 0){
    gamePattern = [];
    nextSeqence();
  }
});


function nextSeqence(){
  userCount = -1;
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomnNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColors[randomnNumber];
  gamePattern.push(randomChoosenColor);
  playSound(randomChoosenColor);
  $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

}

$(".btn").on("click", function(){
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  //console.log(userClickedPattern);
  userCount++;
  checkAnswer(userCount, userChoosenColor);
});


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  //console.log(name);
  animatePress(name);
  audio.play();
}


function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){$("#" + currentColor).removeClass("pressed");}, 100);
}

function checkAnswer(currentCount, choosenColor){
  if(gamePattern[currentCount] === choosenColor){
    if(currentCount === (gamePattern.length - 1)){
      setTimeout(function(){ nextSeqence();}, 1000);
    }
  }
  else{
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 2000);
    level = 0;
  }
}
