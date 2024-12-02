// Javascript Content Here
//take input from form upon submit
    //fetch info from json .find()
    //create li under #list
    //display name and append breed to li
    //if no breed found-handle that
    //increase counter by 1
    //add "more info" button to each dog
        //upon click, display more info
    //add delete button to dog

//callbacks:
function breedInput(){
    const breed = document.querySelector("#breed-lookup").value;
    const selectedBreed = breedData.find(breed);
}
function formInfo(breedData) {
    document.querySelector(".submit-button").addEventListener("submit"{
        //hold info from form
        const breed = document.querySelector("#breed-lookup").value;
        const mixedBreed = document.querySelector("#mix-yes");
        const dogName = document.querySelector("#name");
        const breedGroup = document.querySelector("#groups");
        const sizeType = document.querySelector("#dropdown-size");
        const hairType = document.querySelector("#dropdown-hair-type");
        const coatType = document.querySelector("#dropdown-coat-type");
        const coatColor = document.querySelector(".coat-color");
        const dogsInList = document.querySelector("#dogs");
        //match 
        const selectedBreed = breedData.find(breed);
        // create li under #dogs, set text
        const newDog = document.createElement("li");
        newDog.textContent = "Breed:" + selectedBreed + "Name:"


    }); // closes addEventListener
    
}; //closes formInfo()

function retrieveDogInfo() {
    fetch("./db.json")
    .then(response => response.json())
    .then(breedData) =>{
            //do something with data
        
    } //closes .then()
    .catch(error => console.error("Error fetching data."));
}; //closes retrieveDogInfo()