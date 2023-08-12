const mycontainer = document.querySelector('.container');

function gatherUser() {
    var usernames = localStorage.getItem('userval');

    // Create a new div element for each username
    var div = document.createElement('div');
    div.classList.add('list');
    div.innerText = usernames;

    // Check if the username already exists in the saved HTML structure
    var savedHTML = localStorage.getItem('appendedText');
    if (savedHTML && savedHTML.includes(usernames)) {
        // The username already exists, no need to append it again
        return;
    }

    // Append the div to the container
    mycontainer.appendChild(div);

    // Save all appended usernames to local storage
    var appendedText = savedHTML ? savedHTML + div.outerHTML : div.outerHTML;
    localStorage.setItem('appendedText', appendedText);
}

gatherUser();

window.addEventListener('DOMContentLoaded', function () {
    // Load the saved HTML structure from local storage
    var savedHTML = localStorage.getItem('appendedText');
    if (savedHTML) {
        // Assign the saved HTML structure to the container
        mycontainer.innerHTML = savedHTML;
    }
});
