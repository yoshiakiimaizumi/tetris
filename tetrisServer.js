var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var url = require('url');
var path = require('path');

var port_num = 3000;

var load_static_file = function (uri, response) {
    var tmp = uri.split('.');
    var type = tmp[tmp.length - 1];
    var filename = path.join(process.cwd(), uri);
console.log(uri);
    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Not Found\n');
            response.end();
            return;
        }

        fs.readFile(filename, 'binary', function (err, file) {
            if (err) {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.write(err + '\n');
                response.end();
                return;
            }

            switch (type) {
                case 'html':
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    break;
                case 'js':
                    response.writeHead(200, { 'Content-Type': 'text/javascript' });
                    break;
                case 'css':
                    response.writeHead(200, { 'Content-Type': 'text/css' });
                    break;
                case 'jpg':
                    response.writeHead(200, { 'Content-Type': 'image/jpeg' });
                    break;
            }
            response.write(file, 'binary');
            response.end();
        });
    });
};

// var app = express();
//
//        var server = http.createServer(app).listen(app.get('port'), function(){
//        console.log('Express server listening on port ' + app.get('port'));
//        });
//
//        var io=require('socket.io').listen(server);

//まだlistenしない
//var server = http.createServer(app);
//
//var io = require('socket.io').listen(server);
//io.sockets.on('connection', function(socket) {
//  //do something
//});
//
////socket.ioの準備をしてからlistenする
//server.listen(app.get('port'), function(){
//  console.log("Express server listening on port " + app.get('port'));
//});


//元データ
var server = http.createServer(
    function (req, res) {
        var uri = url.parse(req.url).pathname;
        load_static_file(uri, res);
    }
).listen(port_num);
//var io=require('socket.io').listen(server);
//var io = socketIO.listen(server);
var io = socketio.listen(server);

class WaitingPlayer{
  constructor(){
    this.list = new Array();
  }

  push(address){
    console.log(this.isWaiting(address));
    if(!this.isWaiting(address)){
      console.log("checked");
      this.list.push(address);
      console.log(this.list.length);
    }
  }

  searchEnemy(address){
    console.log("list" + this.list.length);
    if(this.list.length !== 0 && !this.isWaiting(address)){
      return this.list.shift();
    }
  }

  isWaiting(address){
    for(var i = 0; i < this.list.length ; ++i){
      if(this.list[i] === address){
        return true;
      }
    }
    return false;
  }
}

// ログインユーザ管理用
var login_users = {};
var playerMap =new Map();
var playerList = [];
var battleMap = new Map();
var enemyPlayer;
var wp = new WaitingPlayer();

io.sockets.on('connection', function (socket) {

    console.log('接続:' + socket.request.connection.remoteAddress);

    // 接続時にソケットIDをサーバからクライアントへ送る
    io.to(socket.id).emit('onConnect', {
        socket_id: socket.id
    });

    // ログインユーザに追加
    socket.on('aikotoba', function (data) {
    playerMap.set(socket.request.connection.remoteAddress, socket.id);
      var enemy = wp.searchEnemy(socket.request.connection.remoteAddress);
      if(!enemy){
        console.log("one login");
        wp.push(socket.request.connection.remoteAddress);
      }else{
        console.log("two login");
        var enemyId = playerMap.get(enemy);
        console.log(enemyId + ":" + socket.id);
        battleMap.set(enemyId,socket.id);
        battleMap.set(socket.id,enemyId);
        io.to(socket.id).emit('toGame','matched');
        io.to(enemyId).emit('toGame','matched');
        playerMap.clear();
      }
    });
  socket.on('board',function(data){
    //console.log(data);
    io.to(battleMap.get(socket.id)).emit('board', data);
  });
  socket.on('attack',function(data){
    //console.log(data);
    io.to(battleMap.get(socket.id)).emit('attack', '');
    
  });
  socket.on('attackedCounter',function(data){
    //console.log(data);
    io.to(battleMap.get(socket.id)).emit('attackedCounter',data);
  });
  socket.on('pose',function(data){
    //console.log(data);
    io.to(battleMap.get(socket.id)).emit('pose',data);
  });
  socket.on('end',function(data){
    //console.log(data);
    io.to(battleMap.get(socket.id)).emit('end',data);
    var deleteEnemy = battleMap.get(socket.id);
    battleMap.delete(socket.id);
    battleMap.delete(deleteEnemy);
  });
});
