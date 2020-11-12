// eslint-disable-next-line
const app = {
  server: 'http://52.78.206.149:3000/messages',
  init : () => {app.fetch()},
  fetch : () => {
    return fetch(app.server)
    .then(res => res.json())
    .then(res => {
      for(let el of res.results) {
        app.renderMessage(el);
      }
    })
  },
  send : (message)=> {
    const serverURL = 'http://52.78.206.149:3000/messages'
    window.fetch(serverURL, {
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
    const chatbox = document.querySelector('#chats')
    chatbox.innerHTML = '';
    //also you can use this
    //while(chatbox.firstChild) {
    //chatbox.removeChild(chatbox.firstChild);
    // }
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
    text.textContent = data.text
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
  // select : (para) => {
  //   let selector = document.querySelector('.room').value
  //   if(selector === 1) {

  //   }
  // }
};
app.init()

//making send button
let button = document.querySelector('.sendbutton');
button.addEventListener('click', () => {
  let input = document.querySelector('#textarea')
  const message = {
    username: 'Im name',
    text: input.value,
    date: new Date(),
    roomname: '111' 
  };
  app.send(message)
  app.clearMessages()
  app.fetch()
  input.value = ''
})
let selector = document.querySelector('.room');
selector.addEventListener('change', () => {
  if(selector.value === 1) {
    fetch(app.server)
    .then(res => res.json())
    .then(res => {
      app.clearMessages()
      for(let el of res.results) {
        if(el.roomname === 1) {
          app.renderMessage(el);
        }
      }
    })
  }
})