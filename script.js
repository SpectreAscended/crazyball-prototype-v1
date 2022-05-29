"use strict";

const balls = document.querySelectorAll('.ball');
const targetBall = document.querySelector('.target');
const gameBox = document.querySelector('.game-box');
const loser = document.querySelectorAll('.loser');
const begin = document.querySelector('.start-game__button');
const winningPage = document.querySelector('.winning-page');
const losingPage = document.querySelector('.losing-page');
const lvlText = document.querySelector('.logo-box__level--level');
const highscoreText = document.querySelector('.logo-Box__level--highscore');

let counter = 0;
let lvl = 1;
let highscore = 0;

const ranNum = function(n) {
    return Math.trunc(Math.random() * n);
}

const crazyBall = function() {
    let clicked = false;
    targetBall.classList.remove('spin');
    targetBall.classList.remove('marked');
    const level = setInterval(() => {
        counter++;
        balls.forEach(ball => {
            ball.style.transform = `translate(${ranNum(1500)}px, ${ranNum(300)}px)`;
            ball.style.backgroundColor = `rgba(240, ${ranNum(255)}, ${ranNum(255)})`;
        })
        
        if(counter === 10) {
            clearInterval(level);
        }
    }, 400);


    balls.forEach(ball => {

        ball.addEventListener('click', function(e) {
            if(clicked === true) return;
            clicked = true;
            if(e.target.closest('.target')) {
                winningPage.classList.remove('hidden');
                targetBall.classList.add('marked');
                counter = 0;
                lvl++
                renderLevel();
                renderHighscore();
                console.log(lvl);
                setTimeout(() => {
                    winningPage.classList.add('hidden');
                }, 2000);
            }

            if(e.target.closest('.loser')){
                losingPage.classList.remove('hidden');
                counter = 0;
                lvl = 1;
                renderLevel();
                setTimeout(() => {
                    losingPage.classList.add('hidden');
                }, 2000) 
            };
        });
    });

};

const renderLevel = function() {
    lvlText.textContent = `Level: ${lvl}`
};

const renderHighscore = function() {
    if(lvl > highscore && lvl > 1) {
        highscore = lvl - 1;
        highscoreText.textContent = `Highscore: ${highscore}`
    };
};


begin.addEventListener('click', function() {
    crazyBall();
})

