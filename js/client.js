let socket = io("http://localhost:3000");

// Get DOM Element in a respective Js Variable
const form = document.getElementById('send-container');
const messageinp = document.getElementById('messageinp');
const messagecontainer = document.querySelector('.container');
let audio = new Audio('notify.mp3');

// Creating a Function Which Will append When any event get fired and audio also play
const append = (message, position)=>{
    const messageelement = document.createElement('div');
    messageelement.innerText = message;
    messageelement.classList.add('message');
    messageelement.classList.add(position);
    messagecontainer.append(messageelement);
    if (position === 'left') {
        audio.play();
    }
}

// Ask New User for Hi's/her name and let the server know
const name = prompt('Enter Your Name To Join');
socket.emit('new-user-joined',name);

// if new user joins, receive the event from the server
socket.on('user-joined', name =>{
    append(`${name}, joined The Chat`,'center');
});

// If server sends a message receive it
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left');
});

// If user leaves the chat append the info to the container
socket.on('leave', name =>{
    append(`${name}, Left The Chat`,'center');
});

// if the Form get submitted, send server the message
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageinp.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageinp.value = "";
});

// Taking feedback from client
setTimeout(() => {
    let xr = prompt('rate us out 0f 5',5)
    if(xr == 5){
        alert("Greate !, Hope you enjoied it");
    }
    else if(xr == 4){
        alert("Thanks! Have a Greate Day");
    }
    else if(xr == 3){
        alert("Thanks, Have a Good Day");
    }
    else if(xr == 2){
        alert("Thanks, we try to improve our experience next time");
    }
    else
    {
        alert('Thanks for your feedback');
    }
}, 200000);
