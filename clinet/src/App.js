import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./compoents/Chat";
import ToggleColorMode from "./compoents/ToggleColorMode";
import axios from "axios";

const socket = io.connect("http://localhost:3020");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [data, setData] = useState([]);

  /**axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }) */
  function joinRoom() {
    if (username !== "" && room !== "") {
      let user;
      axios.get("http://localhost:3020/getUser").then((user)=>{
// for(const element in user){
//   // if( element.username==username)
//   console.log(element);
// }
if(user.data[0].username==username)
{
  socket.emit("join_room", room);
  setShowChat(true);

}
else{
  alert("access denied")
}
// console.log("yes");
      }).catch((e)=>{console.log(e);})
      // if(username==)
      
    }
  }
  function getData() {
    // axios
    //   .get("http://localhost:3020/users")
    //   .then((a) => {
    //     console.log(a.data);
    //     console.log("insideeeee");
    //     setData(a.data)
    //     return a;
    //   })
    //   .catch((e) => console.error("eee----------------->e" + e));
  }
  useEffect(() => {
    // getData();
    console.log("hhhhhhhkh",data);
  }, []);
  return (
    <div className="App">
      <ToggleColorMode></ToggleColorMode>
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          {/* <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          /> */}
          <select value={room} onChange={(event) => {
              setRoom(event.target.value);
            }}>
            <option value="driver-customer">driver-customer</option>
          </select>

          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
