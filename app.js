//https://medium.com/@samturquoise/building-a-simple-web-application-with-vue-js-and-node-js-a-beginners-guide-66bef468118a

const express = require('express');
const app = express();
const EverSocket = require('eversocket').EverSocket;
app.use(express.json());

// app.get('/', (req, res) => res.send('<h1>Hello, World!</h1>'));

app.listen(3000, () => console.log('Server listening on port 3000'));

app.post('/dh', (req, res) => {
    res.sendStatus(200)
    const id=req.body
    // const payload='#736052:2 +A \\LST'+id.setSpeed + '\r' + '\n'
    const payload='#'+Number(id.trans)+':2 +A \\LST'+id.setSpeed + '\r' + '\n'
    sendnewData(payload)
    console.log("recieved",id.setSpeed,Number(id.trans),"sending paylaod",payload)
})

app.use(express.static('public'));

const options = {
	moxaIpAddress: '192.168.0.193',
	moxaPort: 23,
}


const dhSocket = new EverSocket({
    reconnectWait: 100,      // wait 100ms after close event before reconnecting
    timeout: 5000,            // set the idle timeout to 100ms
    reconnectOnTimeout: false // reconnect if the connection is idle
      });

      dhSocket.setEncoding('utf8'); // Set encoding for string reply through moxa

  dhSocket.on('reconnect', function() {
    console.log('The Black Box reconnected following a close or timeout event');
  });
  dhSocket.on('error', function(err) {
    console.log('The Black Box returned an error');
      console.log(err);
  });
//   dhSocket.on('close', function() {
//     console.log('Moxa connection "close" received');
//       process.exit(1);
//   });
  dhSocket.on('connect', function() {
    console.log('Connected to Black Box');
  });

//listen for reply after sending
dhSocket.on('data', function (data) {
     console.log('reply: ', data)
})

  dhSocket.connect(options.moxaPort, options.moxaIpAddress);

  function sendnewData(cmd){
    //const cmd = 'r11'
    // moxaSocket.write('\n' +(cmd) +'\r', function(err) {
      dhSocket.write((cmd), function(err) {
      if (err) {
        return console.log('Error on write: ', err.message)
      }
      console.log('message written' + (cmd))
    })
}
