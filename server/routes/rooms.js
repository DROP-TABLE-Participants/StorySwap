"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roomsController = (server, opts, done) => {
    server.get("/generate", (req, res) => {
        res.send("a");
    });
    server.post("/connect", (req, res) => {
        console.log(req.body);
        server.io.in();
    });
    done();
};
exports.default = roomsController;
