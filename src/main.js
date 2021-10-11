#!/usr/bin/env node

'use strict';

/* Configuration */
const Config = require("./Config");

/* Import express http server */
const express = require('express');

/* Set up express http server */
const app = express();

app.disable('x-powered-by');
if(Config.http_serve_htdocs)
{
  console.log(`[HTTP] Serving htdocs/ static files`);
  app.use(express.static('htdocs'));
}

const http = require('http').Server(app);
const io = require('socket.io')(http)

let latestText = '';

io.on('connection', (socket) =>
{
  io.emit('p', latestText);
  socket.on('p', (msg) =>
  {
    console.log(`[WS] Received message: ${msg}`);
    socket.broadcast.emit('p', msg);
    latestText = msg;
  });
});

http.listen(Config.http_port, function() {
  console.log(`[HTTP] Server started. Listening on port ${Config.http_port}`);
});