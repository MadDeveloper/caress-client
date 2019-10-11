/*
 * Caress example server
 * Copyright (c) 2019 Julien Sergent
 * MIT Licensed
 */

const Caress = require("caress-server")
const express = require("express")
const http = require("http")

const socketIO = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketIO.listen(server)
const caress = new Caress("0.0.0.0", 3333, { json: true })

io.on("connection", onSocketConnect)

app.use(express.static(__dirname))
app.get("/", (req, res) => res.sendfile(__dirname + "/index.html"))

function onSocketConnect(socket) {
  console.log("Socket.io client connected")

  caress.on("tuio", message => socket.emit("tuio", message))
  socket.on("disconnect", () => {
    console.log("Socket.io Client Disconnected")
  })
}

server.listen(5000)
