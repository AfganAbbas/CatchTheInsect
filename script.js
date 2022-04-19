const playBtn = document.getElementById("play-btn");
const screens = document.querySelectorAll(".screen");
const choose_insect_btns = document.querySelectorAll(".insect-select");
const timeEl = document.getElementById('Time');
const scoreEl = document.getElementById('Score');
const game_container = document.querySelector(".game_container");
let seconds = 0;
let score = 0;
let selected_insect = {};

playBtn.addEventListener('click', function () {
    screens[0].classList.add('up');
});

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', function () {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = {
            src,
            alt
        };
        screens[1].classList.add('up');
        setTimeout(CreateInsect, 1000);
        Startgame();

    });

});

function incTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;

    seconds++;
}

function AddInsect() {
    setTimeout(CreateInsect, 1000);
    setTimeout(CreateInsect, 1500);
}

function CreateInsect() {
    const insect = document.createElement('div');
    const {
        x,
        y
    } = GetRandomLoc();
    insect.classList.add('insect');
    insect.style.left = `${x}px`;
    insect.style.top = `${y}px`;
    insect.innerHTML = `<img src="${selected_insect.src}" arc="${
		selected_insect.alt
	}" style="transform: rotate(${Math.random() * 360}deg)"/>`;
    insect.addEventListener('click', catchInsect);

    game_container.appendChild(insect);
}

function catchInsect() {
    incScore();
    this.classList.add("catched");
    setTimeout(() => {
        this.remove();
    }, 2000);
    AddInsect();
}

function incScore() {
    score++;
    scoreEl.innerHTML = `Score: ${score}`;
}

function Startgame() {
    setInterval(incTime, 1000);
}

function GetRandomLoc() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return {
        x,
        y
    };
}
