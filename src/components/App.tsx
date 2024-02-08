import React, { useState } from 'react';
import axios from 'axios';
import WriteConfig from '../components/WriteConfig';
import UploadJson from '../components/UploadJson';
import '../styles/App.css';

function App() {
  const [showWriteConfig, setShowWriteConfig] = useState(false);
  const [showUploadJson, setShowUploadJson] = useState(false);

  const fetchConfig = async () => {
    try {
      const response = await axios.get('/api/config');
      console.log(response.data);
      alert('Configuração carregada com sucesso.');
    } catch (error) {
      alert('Houve um erro ao buscar a configuração.');
    }
  };

  const submitConfig = async (serverName: string, serverIp: string, serverPassword: string) => {
    try {
      await axios.post('/api/config', { server_name: serverName, server_ip: serverIp, server_password: serverPassword });
      alert('Configuração salva com sucesso!');
      setShowWriteConfig(false);
    } catch (error) {
      alert('Erro ao salvar configuração!');
    }
  };

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result;
      console.log(text);
      setShowUploadJson(false);
    };
    reader.readAsText(file);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Hello there!</h2>
          <h3>What we're gonna do today?</h3>
        </div>
        <div className='displayScreen'></div>
        <div>
          <button id='read' onClick={fetchConfig}>Read configuration</button>
          <button id='write' onClick={() => setShowWriteConfig(true)}>Write configuration</button>
        </div>

        <UploadJson onClick={() => setShowUploadJson(true)} />

        {showWriteConfig && (
          <>
            <div className="modal-backdrop" onClick={() => setShowWriteConfig(false)} />
            <div className="modal">
              <WriteConfig onSubmit={submitConfig} />
            </div>
          </>
        )}

        {showUploadJson && (
          <>
            <div className="modal-backdrop" onClick={() => setShowUploadJson(false)} />
            <div className="modal">
              <div className='uploadFilebutton'>
                <p>Click to upload your .json file:</p>
                <label htmlFor="file-upload" className="file-upload-btn">+</label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".json"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    if (file) handleUpload(file);
                  }}
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;