let loginForm = document.getElementById("loginForm");
let registerForm = document.getElementById("registerForm");
let linkToRegister = document.getElementById("wantToRegister");
let linkToLogin = document.getElementById("wantToLogin");
let loginButton = document.getElementById("login");
let registerButton = document.getElementById("register");

//Navigation

    //Default no register form
registerForm.style.display = "none";

linkToRegister.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    
})
linkToLogin.addEventListener("click", () => {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    
})


//Registration
let users = [];

class User{
    constructor(email, password){
        this.email = email;
        this.password = password;
    }
}

    //Validate password
let registerPassword = document.getElementById("registerPassword");
let registerPasswordValue;
registerPassword.onkeyup = function() {
    registerPasswordValue = document.getElementById("registerPassword").value;
    if(registerPasswordValue.length >= 6){
        document.getElementById("error-0").style.color = "green";
    }else{
        document.getElementById("error-0").style.color = "red";
    }
    if(checkCapital(registerPasswordValue)){
        document.getElementById("error-1").style.color = "green";
    }else{
        document.getElementById("error-1").style.color = "red";
    }
    if(checkLower(registerPasswordValue)){
        document.getElementById("error-2").style.color = "green";
    }else{
        document.getElementById("error-2").style.color = "red";
    }
    if(checkNumber(registerPasswordValue)){
        document.getElementById("error-3").style.color = "green";
    }else{
        document.getElementById("error-3").style.color = "red";
    }
    if(checkSymbol(registerPasswordValue)){
        document.getElementById("error-4").style.color = "green";
    }else{
        document.getElementById("error-4").style.color = "red";
    }

}
    //Add errors as default and onkeydown change them
let errors = ["Password must have at least 7 charachters","The password must have capital letter", "The password must have lower letter", "Has a number", "Has a special character"];
let errorDiv = document.getElementById("regErrors");
let errorP = [];
errors.forEach((error, index) => {
    let p = document.createElement("p");
    p.innerText = error;
    p.setAttribute("id", `error-${index}`);
    p.style.color = "red";
    errorP.push(p);
    errorDiv.appendChild(p); 
})
  
function checkCapital(text){
    for(let i = 0; i<text.length; i++){
        let char = text[i];
        if (char === char.toUpperCase()) {
            return true;
        }
    }
    return false;
}
function checkLower(text){
    for(let i = 0; i<text.length; i++){
        let char = text[i];
        if (char === char.toLowerCase()) {
            return true;
        }
    }
    return false;
}
function checkNumber(text){
    for(let i = 0; i<text.length; i++){
        let char = text[i];
        if (!isNaN(parseInt(char))) {
            return true;
        }
    }
    return false;
}
function checkSymbol(text){
    let format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    return format.test(text);
}
function checkEmail(email){
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
}

function validatePassword(text){
    return text.length>=7 && checkCapital(text) && checkLower(text) && checkNumber(text) && checkSymbol(text);
}

    //Validate email and make new User
registerButton.addEventListener("click", () => {
    let email1 = document.getElementById("registerEmail");
    let email2 = document.getElementById("confirmEmail");
    let regPassword = document.getElementById("registerPassword");
    if(checkEmail(email1.value) && email1.value===email2.value){
        if(validatePassword(regPassword.value)){
            users.push(new User(email1.value, regPassword.value));
            email1.value = "";
            email2.value = "";
            regPassword.value = "";
            for (const error of errorP) {
                error.style.color = "red";
            }
            registerForm.style.display = "none";
            loginForm.style.display = "block";
            alert("Succesfully registered");
        }else{
            alert("Please enter a valid password");
        }
    }else{
        alert("Enter valid email and the email must be the same with confirmation email");
    }
    
})

//Login

loginButton.addEventListener("click", () => {
    let loginEmail = document.getElementById("loginEmail");
    let loginPassword = document.getElementById("loginPassword");

    for (const user of users) {
        if(loginEmail.value===user.email && loginPassword.value!==user.password){
            alert("Wrong Password");
            break;
        }
        if(loginEmail.value===user.email && loginPassword.value===user.password){
            alert("Congratulations you are logged in");
            break;
        }
        
        alert("There is no such user, wrong email");
        break;
    }

})