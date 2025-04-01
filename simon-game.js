// alert("Welcom to Hogwarts!!");

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


function nextSequence(){
    
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    // animatePress(randomChosenColour); // optional to call this here (let's make the game little tough by NOT calling it here)

    level++;
    $("#level-title").text("Level " + level);
}


$(".btn").click( function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    $("." + currentColour).addClass("pressed"); // can also make use of id i.e. '#' symbol here instead of class i.e. '.' (both are correct)

    setTimeout(function(){
        $("." + currentColour).removeClass("pressed"); // can also make use of id i.e. '#' symbol here instead of class i.e. '.' (both are correct)
    }, 100);
}


var firstTimePressed = true;
var level = 0;

$(document).keydown(function(){
    if(firstTimePressed){
        $("#level-title").text("Level " + level);
        nextSequence();
        firstTimePressed = false;
    }
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }

    }else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over"); 
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


// Restart
function startOver(){ 
    gamePattern = [];
    level = 0;
    firstTimePressed = true;
}