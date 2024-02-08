import React, { useState } from 'react';
import WriteConfig from '../components/WriteConfig';
import '../styles/App.css';

function App() {
  const [showWriteConfig, setShowWriteConfig] = useState(false);
  const [configContent, setConfigContent] = useState('');

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (text) {
          const obj = JSON.parse(text.toString());
          if (Object.keys(obj).length === 0) {
            setConfigContent("O arquivo JSON está vazio.");
          } else {
            setConfigContent(text.toString());
          }
        } else {
          setConfigContent("Não foi possível ler o arquivo ou o arquivo está vazio.");
        }
      };
      reader.onerror = () => {
        setConfigContent("Erro ao ler o arquivo.");
      };
      reader.readAsText(file);
    }
  };  

  const submitConfig = async (serverName: string, serverIp: string, serverPassword: string) => {
    const configData = { serverName, serverIp, serverPassword };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setShowWriteConfig(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Hello there!</h2>
          <h3>What we're gonna do today?</h3>
        </div>
        <div className='displayScreen'>
          <pre>{configContent}</pre>
        </div>
        <div>
          <button id='read' onClick={() => document.getElementById('file-upload')?.click()}>
            Read configuration
          </button>
          <input id="file-upload" type="file" accept=".json" onChange={handleUpload} style={{ display: 'none' }} />
          <button id='write' onClick={() => setShowWriteConfig(true)}>
            Write configuration
          </button>
        </div>
        {showWriteConfig && (
          <div className="modal-backdrop" onClick={() => setShowWriteConfig(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <WriteConfig onSubmit={submitConfig} />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;