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

//submit handler
function formInfo(breedData) {
    const form = document.querySelector("#list");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        // value of text input
        const breedInput = document.querySelector("#breed-lookup").value.trim();
        console.log("Trimmed User Input:", breedInput);
        const matchedBreed = breedData.find(b => b.breed.toLowerCase() === breedInput.toLowerCase());
        console.log(matchedBreed);
        console.log("breedInput check")
        //if no breed found => handle it
        if (!matchedBreed) {
            console.log("Breed not found");
        } else {
            console.log("Found breed:", matchedBreed.breed);
        };
        
        

    }); // closes addEventListener
    
}; //closes formInfo()

function retrieveDogInfo() {
    fetch("./db.json")
    .then(response => response.json())
    .then(data => {
            //do something with data
        const breedData = data["dog-breeds"];
        formInfo(breedData);
        
        
    }) //closes .then()
    .catch(error => console.error("Error fetching data.", error));
}; //closes retrieveDogInfo()
retrieveDogInfo();



//NOTES:

//Debugging under 2nd .then
        /*
        breedData.forEach(b => {
            // Log the breed to see what's inside
            console.log("Breed object:", b);

            // Ensure the breed is a string
            if (typeof b.breed !== 'string') {
                console.error("Invalid breed data:", b);
                return;
            }
            console.log(b.breed);
        });
        */

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