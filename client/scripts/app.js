// eslint-disable-next-line
const app = {
  server: 'http://52.78.206.149:3000/messages',
  init : () => {
    app.fetch()

    //this makes infinite fetch roop
    // setInterval(() => {
    //   app.clearMessages();
    //   app.fetch()
    // }, 500)

  },
  fetch : () => {
    return fetch(app.server)
    .then(res => res.json())
    .then(res => {
      for(let el of res.results) {
        app.renderMessage(el);
      }
    })
  },
  send : async (message)=> {
    const serverURL = 'http://52.78.206.149:3000/messages'
      await window.fetch(serverURL, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      // message sent!
    });
  },
  clearMessages : ()=> {
    //just delete text and html with innerHTML
    // const chatbox = document.querySelector('#chats')
    // chatbox.innerHTML = '';

    //also you can use this
    const chatbox = document.querySelector('#chats')
    while(chatbox.firstChild) {
    chatbox.removeChild(chatbox.firstChild);
    }
  },
  renderMessage : (data)=> {
    let chatbox = document.querySelector('#chats')
    let tweetbox = document.createElement('div')
    tweetbox.classList.add('tweet')
    chatbox.prepend(tweetbox)
    
    let tweet = document.querySelector('.tweet')
    
    let username = document.createElement('div')
    username.classList.add('username')
    username.textContent = data.username
    tweet.append(username)

    let text = document.createElement('div')
    text.classList.add('text')
    text.innerHTML = data.text
    //change textContent to innerHTML because I want to be hacked..
    // text.textContent = data.text
    tweet.append(text)

    let roomname = document.createElement('div')
    roomname.classList.add('roomname')
    roomname.textContent = data.roomname
    tweet.append(roomname)

    let date = document.createElement('div')
    date.classList.add('date')
    date.textContent = data.date
    tweet.append(date)
  },
};
app.init()

 //making send button
 let button = document.querySelector('.sendbutton');
 button.addEventListener('click', async () => {
   let input = document.querySelector('#textarea')
   const message = {
   username: 'code',
   text: input.value,
   date: new Date(),
   roomname: 'codestates' 
 };
 app.clearMessages()
 await app.send(message)
 await app.fetch()
 input.value = ''
})
//this makes selector
let selector = document.querySelector('.room');
console.log(selector.value)
selector.addEventListener('change', () => {
  if(selector.value === "코드스테이츠") {
    fetch('http://52.78.206.149:3000/messages?roomname=코드스테이츠')
    .then(res => res.json())
    .then(res => {
      console.log(res)
      app.clearMessages()
      for(let el of res) {
          app.renderMessage(el);
      }
    })
  }
  if(selector.value === "all") {
    app.init();
  }
})