import React, { useState } from 'react';
import '../styles/WriteConfig.css'

interface WriteConfigProps {
  onSubmit: (serverName: string, serverIp: string, serverPassword: string) => Promise<void>;
}

const WriteConfig: React.FC<WriteConfigProps> = ({ onSubmit }) => {
  const [serverName, setServerName] = useState('');
  const [serverIp, setServerIp] = useState('');
  const [serverPassword, setServerPassword] = useState('');

  const handleServerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerName(e.target.value);
  };

  const handleServerIpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerIp(e.target.value);
  };

  const handleServerPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(serverName, serverIp, serverPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="write-config-form">
      <input
        type="text"
        value={serverName}
        onChange={handleServerNameChange}
        placeholder="Informe o nome do servidor"
        className="input-field top"
      />
      <input
        type="text"
        value={serverIp}
        onChange={handleServerIpChange}
        placeholder="Informe o IP do servidor"
        className="input-field middle"
      />
      <input
        type="password"
        value={serverPassword}
        onChange={handleServerPasswordChange}
        placeholder="Informe a senha do servidor"
        className="input-field bottom"
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default WriteConfig;