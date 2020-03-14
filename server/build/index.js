"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const objetivo_routes_1 = __importDefault(require("./routes/objetivo.routes"));
const creencia_routes_1 = __importDefault(require("./routes/creencia.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const setup_1 = __importDefault(require("./database/setup"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
        this.db_config();
    }
    config() {
        this.app.set('port', 4500);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/objetivo', objetivo_routes_1.default);
        this.app.use('/api/creencia', creencia_routes_1.default);
        this.app.use('/api/auth', auth_routes_1.default);
        this.app.use('/api/usuario', usuario_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en el puerto', this.app.get('port'));
        });
    }
    db_config() {
        setup_1.default;
    }
}
const server = new Server();
server.start();
