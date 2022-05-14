"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('The sedulous hyena ate the antelope!');
});
mongoose_1.default.connect('mongodb+srv://Hanane_2020:Hanane_2018@cluster0.o7fj3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', (er) => {
    if (er) {
        console.log(er);
    }
    console.log('connected to db');
});
app.listen(port);
//# sourceMappingURL=server.js.map