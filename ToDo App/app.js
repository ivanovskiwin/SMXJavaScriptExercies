const addButton = document.getElementById("addButton");
let toDoArray = [];
let completed = 0;
addButton.addEventListener("click", ()=>{
    let inputText = document.getElementById("toDoInput").value;
    if(!inputText){
        alert("The input cannot be empty!");
        return;
    }
    toDoArray.unshift({
        id: `${randomInteger(0, 100000)}`,
        text: inputText,
        isComplete: false
    });
    document.getElementById("toDoInput").value="";
    addOnScreen();
})
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
function addOnScreen(){
    let listingSection = document.getElementById("listing");
    listingSection.innerHTML="";
    toDoArray.forEach(todo => {
        let div = document.createElement("div");
        div.setAttribute("class", "todo");
        div.setAttribute("id", `${todo.id}`);
        div.innerHTML = `<h4>${todo.text}</h4>
                    <button class="complete" onclick=completeTask("${todo.id}")>C</button>
                    <button class="delete" onclick=deleteTask("${todo.id}")>X</button>
                    <button class="edit" onclick=editTask("${todo.id}")>E</button>`;
        listingSection.appendChild(div);
    });
}
function completeTask(id){
    let div = document.getElementById(`${id}`);
    if(completed===0){
        document.getElementById("completed").innerHTML = `<h2>Completed: </h2>`;
    }
    for (let todo of toDoArray) {
        if(todo.id===id){
            if(!todo.isComplete){
                todo.isComplete = true;
                div.remove();
                div.firstChild.style.textDecoration = "line-through";
                document.getElementById("completed").appendChild(div);
                div.lastChild.remove();
                completed++;
            }else{
                todo.isComplete = false;
                div.remove();
                div.firstChild.style.textDecoration = "none";
                document.getElementById("listing").appendChild(div);
                div.innerHTML+=`<button class="edit" onclick=editTask("${todo.id}")>E</button>`;
                if(completed===0){
                    document.getElementById("completed").innerHTML = "";
                }
                completed--;
            }
            break;
        }
    }
}
function deleteTask(id){
    let div = document.getElementById(`${id}`);
    let obj = toDoArray.filter(el => el.id===id)[0];
    if(obj.isComplete){
        completed--;
    }
    toDoArray = toDoArray.filter(el => el.id!==id);
    if(completed===0){
        document.getElementById("completed").innerHTML = "";
    }
    div.remove();
}
function editTask(id){
    addButton.setAttribute("disabled", "disabled");
    let div = document.getElementById(`${id}`);
    div.innerHTML=`<input type="text" id="updateInput"><input type="submit" id="edit" value="Edit">`;
    document.getElementById("updateInput").value = toDoArray.filter(el => el.id===id)[0].text;
    let editButton = document.getElementById("edit");
    editButton.addEventListener("click", ()=>{
        let newText = document.getElementById("updateInput").value;
        if(!newText){
            alert("You must enter some text to your input");
        }else{
            toDoArray.filter(el => el.id===id)[0].text = newText;
            div.innerHTML = `<h4>${newText}</h4>
                        <button class="complete" onclick=completeTask("${id}")>C</button>
                        <button class="delete" onclick=deleteTask("${id}")>X</button>
                        <button class="edit" onclick=editTask("${id}")>E</button>`;
            addButton.removeAttribute("disabled");
        }
    });
}