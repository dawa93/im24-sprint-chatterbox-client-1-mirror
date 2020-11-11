// eslint-disable-next-line
const app = {
  server: 'http://52.78.206.149:3000/messages',
  init : () => {app.fetch()},
  fetch : () => {
    return fetch(app.server)
    .then(res => res.json())
    .then(res =>{
      //console.log();
      //username, roomname, data, text
      //result : {[{username: "관리자", roomname: "코드스테이츠", date: "2020-11-11T06:48:12.045Z", text: "이머시브 여러분들 환영합니다"}]}
      for(let el of res.results) {
        let chat = document.querySelector('#chats')
        //make box
        let chatbox = document.createElement('div')
        chatbox.classList.add('tweet')
        //insert chatbox in chat
        chat.prepend(chatbox)
        
        //make username
        let nickname = document.createElement('div')
        nickname.textContent = el.username
        nickname.classList.add('username')
        chatbox.append(nickname)

        //make content
        let content = document.createElement('div')
        content.classList.add('text')
        content.textContent = el.text
        chatbox.append(content)
        
        //make date(time)
        let date = document.createElement('div')
        date.classList.add('date')
        date.textContent = el.date
        chatbox.append(date)

        //make room
        let room = document.createElement('div')
        room.classList.add('roomname')
        room.textContent = el.roomname
        chatbox.append(room)
      }
    })
  },
  //test
  send : ()=> {},
  clearMessages : ()=> {},
  renderMessage : ()=> {},
};
app.init()
