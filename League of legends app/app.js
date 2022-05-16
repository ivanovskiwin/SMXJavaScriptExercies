let url = "http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json";
let imagesUrl = "http://ddragon.leagueoflegends.com/cdn/12.6.1/img/champion/";
let championListDiv = document.getElementById("championsList");
let championList = [];
let favChampionList = [];
let searchInput = document.getElementById("search");
let diffSelection = document.getElementById("diff");
let typeSelection = document.getElementById("type");
let filteringOptions = {
    query: "",
    diff: "any"
}


async function makeApiCall(url){
    let res = await fetch(url);
    let result = await res.json();
    console.log(result.data);
    for (const key in result.data) {
        if (Object.hasOwnProperty.call(result.data, key)) {
            const element = result.data[key];
            championList.push(element);
        }
    }
    renderData(championList, championListDiv);
}
function renderData(champList, node){
    node.innerHTML="";
    for (const champion of champList) {
        let div = document.createElement("div");
        div.setAttribute("class", "champion");
        div.innerHTML = `
                        <img src="${imagesUrl}${champion.id}.png" alt="${champion.id}">
                        <h3>${champion.id}</h3>
                        <p>${champion.title}</p>
                        <h4>Difficulty: ${champion.info.difficulty}</h4>
                        `;
        node.appendChild(div);
    }           
}
makeApiCall(url);

searchInput.onkeyup = (event) => {
    //console.log(event.target.value)
    filteringOptions.query = event.target.value;
    filterChampions(championList);
}
diffSelection.onchange = (event) => {
    console.log(event.target.value)
    filteringOptions.diff = event.target.value;
    filterChampions(championList);
}

function filterChampions(championList){
    let filteredChampions = [...championList];
    if(filteringOptions.query){
        filteredChampions = filteredChampions.filter(el => el.name.toLowerCase().includes(filteringOptions.query));
    }
    if(filteringOptions.diff !== "any"){
        switch(filteringOptions.diff){
            case "8":
                filteredChampions = filteredChampions.filter(el => el.info.difficulty >= 8);
                break;
            case "6":
                filteredChampions = filteredChampions.filter(el => {
                    if(el.info.difficulty>=6 && el.info.difficulty<8) return true;
                    return false;
                });
                break;
            case "2":
                filteredChampions = filteredChampions.filter(el => {
                    if(el.info.difficulty>=2 && el.info.difficulty<6) return true;
                    return false;
                });
                break;
            case "0":
                filteredChampions = filteredChampions.filter(el => {
                    if(el.info.difficulty>=0 && el.info.difficulty<2) return true;
                    return false;
                });
                break;
        }
    }
    renderData(filteredChampions, championListDiv);
}