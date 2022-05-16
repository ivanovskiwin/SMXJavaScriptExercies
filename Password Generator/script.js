const button = document.getElementById("button");
button.addEventListener("click", () => {
    let checkedValues = document.querySelectorAll('input[type="checkbox"]:checked');
    let passwordLength = document.getElementById("pwLength");
    if(parseInt(passwordLength.value)<3 || passwordLength.value === ""){
        alert("Password length must be bigger than or equal to 4");
    }else{
        if(checkedValues.length<1){
            alert("Select at least one type of characters");
        }else{
        let generatedPassword = generatePassword(checkedValues, passwordLength);
        let divPassword = document.getElementById("password");
        divPassword.innerText = generatedPassword;
        }
    }
});

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNumber(){
    return String.fromCharCode(randomInteger(48, 57));
}

function generateUpperCase(){
    return String.fromCharCode(randomInteger(65, 90));
}

function generateLowerCase(){
    return String.fromCharCode(randomInteger(97, 122));
}

function generateSymbol(){
    let symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[randomInteger(0, symbols.length-1)];
}

function generatePassword(requirements, pwlength){
    let checkedValues = requirements;
    let passwordLength = pwlength;
    let generatedPassword = "";

    //Generate minimum for the requirements
    for(let i = 0; i<checkedValues.length; i++){
        if(checkedValues[i].value==="upper"){
            generatedPassword+=generateUpperCase();
        }else if(checkedValues[i].value==="lower"){
            generatedPassword+=generateLowerCase();
        }else if(checkedValues[i].value==="number"){
            generatedPassword+=generateNumber();
        }else if(checkedValues[i].value==="symbol"){
            generatedPassword+=generateSymbol();
        }else{
            alert("Please add at least one type of characters");
            break;
        }
    }
    //Generate the rest of the length with random function
    for(let i = checkedValues.length; i<parseInt(passwordLength.value); i++){
        let randomNumber = randomInteger(0, checkedValues.length-1);
        if(checkedValues[randomNumber].value==="upper"){
            generatedPassword+=generateUpperCase();
        }else if(checkedValues[randomNumber].value==="lower"){
            generatedPassword+=generateLowerCase();
        }else if(checkedValues[randomNumber].value==="number"){
            generatedPassword+=generateNumber();
        }else if(checkedValues[randomNumber].value==="symbol"){
            generatedPassword+=generateSymbol();
        }
    }
    return generatedPassword;
}