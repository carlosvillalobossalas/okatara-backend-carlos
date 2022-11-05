"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const packages_1 = __importDefault(require("../routes/packages"));
const config_1 = require("../database/config");
class Server {
    constructor() {
        this.apiPaths = {
            packages: "/api/packages",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        (0, config_1.dbConnection)();
        this.middlewares();
        this.routes();
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //BODY
        this.app.use((0, express_1.json)());
        //PUBLIC
        this.app.use(express_1.default.static("public"));
    }
    routes() {
        this.app.use(this.apiPaths.packages, packages_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening on port: " + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map