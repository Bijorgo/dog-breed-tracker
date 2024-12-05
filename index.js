
// hold input from static form
function dogDisplay(storeDogInfo){
    // create list items
    const nestedBreed = document.createElement("li");
    const formList = document.createElement("ul")
    const nestedName = document.createElement("li");
    const nestedComment = document.createElement("li");

    // set text content
    nestedBreed.textContent = "Breed: " + storeDogInfo.breed + (checkMix());
    nestedName.textContent = "Name: " + (storeDogInfo.name || "Unknown");
    nestedComment.textContent = "Comment: " + (storeDogInfo.comment || "None");

    //append into nested lists
    formList.append(nestedName);
    formList.append(nestedComment);
    nestedBreed.append(formList);
    return nestedBreed;
};

function breedDish(storeDogInfo) {
    //make unordered list for additional sttributes to go into
    const extraList = document.createElement("ul");

    const groupItem = document.createElement("li");
    groupItem.id = "group-item";
    groupItem.textContent = "Group: " + storeDogInfo.group;
    extraList.append(groupItem);

    const sizeItem = document.createElement("li");
    sizeItem.id = "size-item"
    sizeItem.textContent = "Size: " + storeDogInfo.size;
    extraList.append(sizeItem);

    const hairItem = document.createElement("li");
    hairItem.textContent = "Hair Type: " + storeDogInfo.hair;
    extraList.append(hairItem);

    const coatItem = document.createElement("li");
    coatItem.textContent = "Coat Type: " + storeDogInfo.coat;
    extraList.append(coatItem);

    document.querySelector("li").append(extraList);
    return extraList; // return full list without appending yet
}; 

// callback function to handle mouseenter and mouseleave events on list items 
function mousingHandler(storeDogInfo, displayNest) {
    let extraList;
    //display extra attributes list when mousing over breed
    displayNest.addEventListener("mouseenter", (event) => {
        extraList = breedDish(storeDogInfo);
        displayNest.append(extraList);
    });
    // Remove the extra list when the mouse leaves    
    displayNest.addEventListener("mouseleave", (event) => {    
        if (extraList) {
            extraList.remove();
        };
    });
}; 

// callback function to use input from checkbox
function checkMix(){
    const mixInput = document.querySelector("#mix-yes");
    let mixed;
    if (mixInput.checked) {
        mixed = "(Mixed)";
    }else {
        mixed = "";
    };  
    return mixed;  
};

// define dogCounter and countInc in global scope
let dogCounter = 0;
const countInc = document.querySelector("#counter");

// callback to handle what happens when static form is submitted 
function submitFormInfo(breedData) {

    const form = document.querySelector("#dog-form");
    // to keep track of number of dogs added to list 

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        // take breed typed in and match it with a breed in the database
        const breedInput = document.querySelector("#breed-lookup").value.trim(); //trim trailing spaces from input
        const matchedBreed = breedData.find(b => b.breed.toLowerCase() === breedInput.toLowerCase()); //match input and data case

        // if no breed is found, display text telling user what to do
        if (!matchedBreed) {
            const alertDiv = document.querySelector("#more");
            const alertP = document.createElement("p");
            alertP.textContent = `Breed not found. Please check your spelling or use breed "other".`;
            alertDiv.append(alertP);
            const xButton = document.createElement("button");
            xButton.textContent = "X";
            alertDiv.append(xButton);
            xButton.addEventListener("click", ()=> {
                alertDiv.textContent = "";
                form.reset();
            });
            return; // if no breed found, exit
        } else {
            console.log("Found breed:", matchedBreed.breed);
        };
        //console.log(matchedBreed + "breedInput check"); // debug

        // hold input infomration
        const commentInput = document.querySelector("#comments").value;
        const nameInput = document.querySelector("#name").value;

        // create a space for new dog to go, add dog to list
        const orderedListDogBreed = document.querySelector("#dogs"); //static ol

        // hold all information in new object
        const storeDogInfo = { 
            "breed": matchedBreed.breed, 
            "comment": commentInput, 
            "name": nameInput, 
            "group": matchedBreed.group, 
            "size": matchedBreed.size, 
            "hair": matchedBreed.hair, 
            "coat": matchedBreed.coat, 
            "li": orderedListDogBreed, 
        };

        // call dogDisplay() to display name, breed, comment with matched information
        const displayNest = dogDisplay(storeDogInfo);
        orderedListDogBreed.append(displayNest);

        // create a favorite button
        const favBtn = document.createElement("button");
        const heart = '\u2661'; // exmpty heart symbol
        favBtn.textContent = heart;
        favBtn.addEventListener("dblclick", () => {
            const filledHeart = `\u2665`; // filled heart symbol
            favBtn.textContent = filledHeart;
        });
        
        // create a remove button plus functionality on click
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.addEventListener("click",() => {
            dogCounter--; // subtract 1 for each dog removed
            countInc.textContent = dogCounter;
            displayNest.remove();
            favBtn.remove();
            removeBtn.remove();
        });

        displayNest.append(favBtn);
        displayNest.append(removeBtn);
        createEdit(storeDogInfo, displayNest);

        // add 1 to counter for each dog added
        dogCounter++; 
        countInc.textContent = dogCounter;

        // call event handler to display additional attributes from database
        mousingHandler(storeDogInfo, displayNest);
        
        form.reset(); // clear form after submit
    });  
};

// create input function to be called several times in the edit feature
function createInputField(form, labelText, inputName) {
    // Create label
    const label = document.createElement("label");
    label.textContent = labelText;

    // Create input field
    const input = document.createElement("input");
    input.type = "text"; 
    input.name = inputName; 
    input.className = inputName;
    input.placeholder = "Optional";
    

    // Append input field to the label
    label.append(input);

    // Append label to the form
    form.append(label);
};

function createEdit(storeDogInfo, displayNest){
    // create "edit" button
    const editBtn = document.createElement("button");
    editBtn.textContent = "edit"; 

    //handle edit event
    editBtn.addEventListener("click", () => {
        // create new form
        const form = document.createElement("form");
        form.name = "edit-form";
        form.id = "edit-form";
    
        // create text inputs
        //createInputField(form, "Name: ", "edit-name");
        //createInputField(form, "Comment: ", "edit-comment");
        createInputField(form, "Group: ", "edit-group");
        createInputField(form, "Size: ", "edit-size");
        createInputField(form, "Hair: ", "edit-hair");
        createInputField(form, "Coat: ", "edit-coat");

        //create submit button
        const submitBtn = document.createElement("button");
        submitBtn.type = "submit";
        submitBtn.textContent = "submit";
        form.append(submitBtn); // attatch submit button to bottom of form

        // attatch new form to dom
        document.querySelector("#more").append(form);

        //input values
        //const editNameText = document.querySelector(".edit-name");
        //const editCommentText = document.querySelector(".edit-comment");
        const editGroupText = document.querySelector(".edit-group");
        const editSizeText = document.querySelector(".edit-size");
        const editHairText = document.querySelector(".edit-hair");
        const editCoatText = document.querySelector(".edit-coat");

        //handle a submission
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            //const newDish = breedDish(storeDogInfo);

            // retain original information
            //const retainName = storeDogInfo.name;
            //const retainComment = storeDogInfo.comment;
            const retainSize = storeDogInfo.size;
            const retainGroup = storeDogInfo.group;
            const retainHair = storeDogInfo.hair;
            const retainCoat = storeDogInfo.coat;

            // take new information or retain old information
            //const newName = (editNameText.value || retainName);
            //const newComment = (editCommentText.value || retainComment);
            const newGroup =(editGroupText.value || retainGroup);
            const newSize = (editSizeText.value || retainSize);
            const newHair = (editHairText.value || retainHair);
            const newCoat = (editCoatText.value || retainCoat);

            // update object
            //storeDogInfo.name = newName;
            //storeDogInfo.comment = newComment;
            storeDogInfo.group = newGroup;
            storeDogInfo.size = newSize;
            storeDogInfo.hair = newHair;
            storeDogInfo.coat = newCoat;
    
            // update display
            const updatedDogDisplay = dogDisplay(storeDogInfo);
            displayNest.replaceWith(updatedDogDisplay);

            // recreate edit button for updated display
            createEdit(storeDogInfo, updatedDogDisplay);

            // recreate remove function after edit 
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "X";
            removeBtn.addEventListener("click", () => {
                dogCounter--; // subtract 1 for each dog removed
                countInc.textContent = dogCounter;
                updatedDogDisplay.remove(); // remove the updated dog display
            });

            updatedDogDisplay.append(removeBtn);

            //re apply mouseenter and mouseleave
            mousingHandler(storeDogInfo, updatedDogDisplay);

            
       
            //remove entire edit/form box
            form.remove();
        }); 
    });
    displayNest.append(editBtn);
    return editBtn;
};

// make connection with data, retrieve information that JavaScript can read
function main() {
    fetch("./db.json")
    .then(response => response.json())
    .then(data => {
        const breedData = data["dog-breeds"];
        submitFormInfo(breedData);
    })
    .catch(error => console.error("Error fetching data.", error));
};

main();








// Work for future improvements 
/*
        const groupEdit = document.createElement("label");
        groupEdit.textContent = "Group: ";

        // create dropdown to choose group
        const groupSelect = document.createElement("select");

        // create dropdown options, collect them in the dropdown
        // MISC
        const miscOpt = document.createElement("option");
        miscOpt.value = "misc-group";
        miscOpt.textContent = "Misc";
        groupSelect.append(miscOpt);
        //HOUND
        const houndOpt = document.createElement("option");
        houndOpt.value = "hounds";
        houndOpt.textContent = "Hounds";
        groupSelect.append(houndOpt);
        //SPORTING 
        const sportOpt = document.createElement("option");
        sportOpt.value = "sporting";
        sportOpt.textContent = "Sporting"
        groupSelect.append(sportOpt);
        //NON-SPORTING
        const nonSpOpt = document.createElement("option");
        nonSpOpt.value = "non-sporting";
        nonSpOpt.textContent = "Non-Sporting";
        groupSelect.append(nonSpOpt);
        //TERRIER
        const terrierOpt = document.createElement("option");
        terrierOpt.value = "terrier";
        terrierOpt.textContent = "Terrier";
        groupSelect.append(terrierOpt);
        //TOY
        const toyOpt = document.createElement("option");
        toyOpt.value = "toy";
        toyOpt.textContent = "Toy";
        groupSelect.append(toyOpt);
        //WORKING
        const workingOpt = document.createElement("option");
        workingOpt.value = "working";
        workingOpt.textContent = "Working";
        groupSelect.append(workingOpt);
        //HERDING
        const herdingOpt = document.createElement("option");
        herdingOpt.value = "herding";
        herdingOpt.textContent = "Herding";
        groupSelect.append(herdingOpt);

        // attatch the group dropdown to a lable 
        groupEdit.append(groupSelect);
        // attatch everything under group lable to the form
        form.append(groupEdit);

*/

/*
        //create size text input 
        const editSizeLabel = document.createElement("label");
        editSizeLabel.textContent = "Size: ";
        const editSizeText = document.createElement("input");
        editSizeText.type = "text";
        editSizeText.name = "edit-size"
        editSizeText.placeholder = "optional"
        editSizeLabel.append(editSizeText);
        form.append(editSizeLabel);
        */

        //const retainSize = storeDogInfo.size;
        //const newSize = (editSizeText.value || retainSize);
        //storeDogInfo.size = newSize;
        //displayNest.querySelector("li:nth-child(1)").textContent = "Name: " + (newName || retainName);
        //displayNest.querySelector("li:nth-child(2)").textContent = "Comment: " + (newComment || retainComment);
        //const extraList = breedDish(storeDogInfo);
        //displayNest.querySelector("ul").append(extraList);

     /*
            orderedListDogBreed.querySelector("li:nth-child(1)").textContent = "Name: " + (newName || retainName);
            orderedListDogBreed.querySelector("li:nth-child(2)").textContent = "Comment: " + (newComment || retainComment);
            const extraList = breedDish(storeDogInfo);
            orderedListDogBreed.querySelector("ul").append(extraList);
            */
            /*
            const listADog = document.createElement("li"); // first item to go under ol
            const displayNest = dogDisplay(storeDogInfo);
            listADog.append(displayNest);
    */
   
            //const existingForm = document.querySelector("edit-form")
            /*
            if (listADog){
                listADog.remove();
            };
            */
           
            /*
        const editNameLabel = document.createElement("label");
        editNameLabel.textContent = "Name: ";
        const editNameText = document.createElement("input");
        editNameText.type = "text";
        editNameText.name = "edit-name"
        editNameText.placeholder = "optional"
        editNameLabel.append(editNameText);
        form.append(editNameLabel);
        

        //create text input to edit comment
        const editCommentLabel = document.createElement("label");
        editCommentLabel.textContent = "Comment: ";
        const editCommentText = document.createElement("input");
        editCommentText.type = "text";
        editCommentText.name = "edit-comment"
        editCommentText.placeholder = "optional"
        editCommentLabel.append(editCommentText);
        form.append(editCommentLabel);

            
        //create size text input 
        const editSizeLabel = document.createElement("label");
        editSizeLabel.textContent = "Size: ";
        const editSizeText = document.createElement("input");
        editSizeText.type = "text";
        editSizeText.name = "edit-size"
        editSizeText.placeholder = "optional"
        editSizeLabel.append(editSizeText);
        form.append(editSizeLabel);
        */