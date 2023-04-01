"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roomsController = (server, opts, done) => {
    server.get("/generate", (req, res) => {
        res.send("a");
    });
    done();
};
exports.default = roomsController;
