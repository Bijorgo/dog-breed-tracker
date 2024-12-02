// Javascript Content Here
//take input from form upon submit
    //fetch info from json .find()
    //create li under #list
    //display name and append breed to li
    //if no breed found-handle that
    //increase counter by 1
    //add "more info" button to each dog
        //upon click, display more info
    //add delete button to dog, click event listener
    //create "favorite" function, dblclick event listener

//callbacks:
function breedInput(breedData){
    // value of text input
    const breed = document.querySelector("#breed-lookup").value;
    const selectedBreed = breedData.find(b => b === breed);
    console.log(breed);
    console.log("breedInput")
    //if no breed found => handle it
    // create object with info?
}

function formInfo(breedData) {
    const form = document.querySelector("#list");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        breedInput();
        console.log("form Info")
        /*
        //hold info from form
        const breed = document.querySelector("#breed-lookup").value;
        const mixedBreed = document.querySelector("#mix-yes").value;
        const dogName = document.querySelector("#name").value;
        const breedGroup = document.querySelector("#groups");
        const sizeType = document.querySelector("#dropdown-size");
        const hairType = document.querySelector("#dropdown-hair-type");
        const coatType = document.querySelector("#dropdown-coat-type");
        const coatColor = document.querySelector(".coat-color");
        const dogsInList = document.querySelector("#dogs");
        //match breed
        const selectedBreed = breedData.find(b => b === breed);
        // create li under #dogs, set text
        const newDog = document.createElement("li");
        newDog.textContent = "Breed:" + (selectedBreed || "Unknown") + "Name:" + dogName;
        dogsInList.append(newDog);
        */

    }); // closes addEventListener
    
}; //closes formInfo()

function retrieveDogInfo() {
    fetch("./db.json")
    .then(response => response.json())
    .then(breedData => {
            //do something with data
        formInfo();
        console.log("fetch request");
        
    }) //closes .then()
    .catch(error => console.error("Error fetching data.", error));
}; //closes retrieveDogInfo()
retrieveDogInfo();