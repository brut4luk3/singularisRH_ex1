"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/server.ts
var express_1 = require("express");
var fs_1 = require("fs");
var path_1 = require("path");
var app = (0, express_1.default)();
var PORT = 5000;
var configFilePath = path_1.default.join(__dirname, 'config.json');
app.use(express_1.default.json());
app.get('/api/config', function (req, res) {
    if (!fs_1.default.existsSync(configFilePath)) {
        return res.status(404).send({ message: 'Configuração não encontrada!' });
    }
    var configFileContent = fs_1.default.readFileSync(configFilePath, 'utf8');
    var config = configFileContent ? JSON.parse(configFileContent) : {};
    res.send(config);
});
app.post('/api/config', function (req, res) {
    var _a = req.body, server_name = _a.server_name, server_ip = _a.server_ip, server_password = _a.server_password;
    var config = { server_name: server_name, server_ip: server_ip, server_password: server_password };
    fs_1.default.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf8');
    res.send({ message: 'Configuração salva com sucesso!', config: config });
});
app.listen(PORT, function () {
    console.log("Servidor rodando em http://localhost:".concat(PORT));
});
