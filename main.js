// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
// grab hearts
let bothHearts = [...document.getElementsByClassName('like-glyph')]
//use the spread operator to turn our collection into an array. We have to put an HTML collection into an array as there aren't any pre-build methods to iterate through one
//console.log("all of the hearts array", bothHearts)
let modal = document.getElementById('modal')
// Testing - console.log("modal class list", modal.classList)
// Testing - console.log("modal w/o class", modal.classList.remove('hidden'))
let modalPara = document.getElementById('modal-message');
//When the "server" returns a failure status: Respond to the error using a .catch(() => {}) block after your .then(() => {}) block.
// New function to hold our error
let callServerAndCatch = (event) => {
  mimicServerCall()
  .then(() => handleResponse(event))
  .catch(error => handleError(error))
}
//IF we hit the error, display the error modal by removing the .hidden class
// Display the server error message in the modal
let handleError = (errorMessage) => {
// modal is .id of error banner, looking to remove class of 'hidden'
  modal.classList.remove('hidden')
  modalPara.innerText = errorMessage
// Use setTimeout to hide the modal after 3 seconds (add the .hidden class)
// First the error message is shown, then after 3 seconds, it is hidden again and the text is set to blank ""
  setTimeout(() => { 
    modal.classList.add('hidden')
    modalPara.innerText = "" 
  }, 3000);
}
//When the "server" returns a success status:
//Change the heart to a full heart
//Add the .activated-heart class to make the heart appear red
//When a user clicks on a full heart:
//Change the heart back to an empty heart: Remove the .activated-heart class
// Target helps us pick up the specific event target (i.e. the heart)
let handleResponse = (event) => {
  console.log("testing click event target", event.target)
  if (event.target.textContent === EMPTY_HEART) {
  event.target.classList.add('.activated-heart')
  event.target.textContent = FULL_HEART
}
  else {
  event.target.classList.remove('.activated-heart')
  event.target.textContent = EMPTY_HEART
  }

}


// When a user clicks on an empty heart:Invoke mimicServerCall to simulate making a server request
//for (let index = 0; index < bothHearts.length; index++) {
//  bothHearts[index].addEventListener('click', mimicServerCall)
//}
bothHearts.map(bothHearts => {
  //Event is packaged with callServerAndCatch
  bothHearts.addEventListener('click', callServerAndCatch)
})



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  console.log('clicked')
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
