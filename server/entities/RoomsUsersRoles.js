"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Room_1 = __importDefault(require("./Room"));
let RoomsUsersRoles = class RoomsUsersRoles {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RoomsUsersRoles.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(type => Room_1.default, (room) => room.id, { persistence: false }),
    (0, typeorm_1.JoinColumn)({ name: "room" }),
    __metadata("design:type", Room_1.default)
], RoomsUsersRoles.prototype, "room", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoomsUsersRoles.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RoomsUsersRoles.prototype, "type", void 0);
RoomsUsersRoles = __decorate([
    (0, typeorm_1.Entity)()
], RoomsUsersRoles);
exports.default = RoomsUsersRoles;
