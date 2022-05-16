let arrayOfObjects = [
    {
      age: 1,
      text: "He was born David Robert Jones in Brixton on January 8, 1947. The same date Elvis Presley was born, who was 12 years older. Stephen Hawking and Shirley Bassey is also born this day.",
    },
    {
      age: 2,
      text: "He was a good looking baby.",
      img: "http://supbowie.com/content/images/1948.jpg",
    },
    {
      age: 3,
      text: "He sang the ABC song perfectly.",
    },
    {
      age: 4,
      text: "He had a cameo appearance in a home video.",
    },
    {
      age: 5,
      text: 'He released the album "Black Tie White Noise" after spending time with his hard rock band "Tin Machine".',
      video: "https://rr2---sn-oxvuxa-n32l.googlevideo.com/videoplayback?expire=1646095331&ei=gxcdYvXUC4Gc1wblhYP4Aw&ip=181.215.176.49&id=o-ABjRKxNvN3k8tUxXRZARvR87wp5k8lhVcryFAkq7XlHm&itag=18&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=W6ttYWBB-VD9m9ErSodalKgG&gir=yes&clen=8227512&ratebypass=yes&dur=305.110&lmt=1390217897219441&fexp=24001373,24007246&c=WEB&n=hmL_v5hAab9uQw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAN9SDZcWJFKlZFNnzP8VU9g4h4xeUveUvzkuvsIbpS02AiBJGHvWm9TUW8QnvmtDOYTN0eWReVSI8-2CjpINB7pLJg%3D%3D&redirect_counter=1&rm=sn-aigesk7l&req_id=297f33a5f7d0a3ee&cms_redirect=yes&ipbypass=yes&mh=XG&mip=95.86.35.177&mm=31&mn=sn-oxvuxa-n32l&ms=au&mt=1646073428&mv=m&mvi=2&pcm2cms=yes&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRQIgJ2bK-lCuW2RUoFCCKEFlJxPUNTe6P8J0lM3TZtQsjLQCIQDNUY7NLjj3lL1ZXi3qej3tSasDAKlZkTJRlohlros7XQ%3D%3D",
    },
  ];

let button = document.getElementById("button");
let content = document.getElementById("content");

button.addEventListener("click", () => {
    let age = document.getElementById("age").value;
    clearContent();
    validateAge(parseInt(age)) ? generateContent(parseInt(age)) : alert("Enter Valid age");
});

document.getElementById("age").addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    //console.log(event.key);
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("button").click();
    }
  });

function clearContent(){
    content.innerHTML = "";
}

function validateAge(age){
    if(age>=1 && age<=5){
        return 1;
    }
    return 0;
}
function generateContent(age){
    let obj=arrayOfObjects.find((key) => key.age===age);
 
    let h1 = document.createElement("h1");
    h1.innerText = `When David Bowie was ${age}`;
    content.appendChild(h1);
    if(obj.text){
        let p = document.createElement("p");
        p.innerText = `${obj.text}`;
        content.appendChild(p);
    }
    if(obj.img){
        let img = document.createElement("img");
        img.setAttribute("src", `${obj.img}`);
        content.appendChild(img);
    }
    if(obj.video){
        let video = document.createElement("iframe");
        video.setAttribute("src", `${obj.video}`);
        content.appendChild(video);
    }
}
