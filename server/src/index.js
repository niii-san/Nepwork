import dotenv from "dotenv/config";
import { app } from "./app.js";
import { connectDB } from "./db/connect.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setUserOnline, setUserOffline } from "./controllers/index.js";

const PORT = process.env.PORT || 8000;

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(`Error on express >> \n${error}`);
        });

        server.listen(PORT, () => {
            console.log(`server running on port : ${PORT} `);
        });
    })
    .catch((error) => {
        console.log(`failed to run server! ERROR> ${error}`);
    });

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) {
        setUserOnline(userId);
        console.log(`${userId} connected, socketId: ${socket.id}`);
    }

    socket.on("disconnect", () => {
        setUserOffline(userId);
        console.log("User disconnected: ", socket.id);
    });
});

app.get("/", (_, res) => {
    res.json("This is nepwork server");
});
