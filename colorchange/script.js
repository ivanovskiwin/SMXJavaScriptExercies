
let body = document.getElementsByTagName("body")[0];

function changeBackground(){
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let hex = `#${hours*10000+minutes*100+seconds}`;
    body.style.backgroundColor = hex;
    body.innerHTML = `<h1 id="time">${hex}</h1>`;
    }

setInterval(changeBackground, 1000);