// server/server.ts
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;
const configFilePath = path.join(__dirname, 'config.json');

app.use(express.json());

app.get('/api/config', (req, res) => {
  if (!fs.existsSync(configFilePath)) {
    return res.status(404).send({ message: 'Configuração não encontrada!' });
  }

  const configFileContent = fs.readFileSync(configFilePath, 'utf8');
  const config = configFileContent ? JSON.parse(configFileContent) : {};
  res.send(config);
});

app.post('/api/config', (req, res) => {
  const { server_name, server_ip, server_password } = req.body;
  const config = { server_name, server_ip, server_password };

  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf8');
  res.send({ message: 'Configuração salva com sucesso!', config });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});