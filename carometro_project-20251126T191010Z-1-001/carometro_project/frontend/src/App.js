import React, { useState } from 'react';
import Login from './components/Login';
import Carometro from './components/Carometro';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  function onLogin(tok, user) {
    setToken(tok);
    setUsername(user);
    localStorage.setItem('token', tok);
    localStorage.setItem('username', user);
  }

  function onLogout() {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  return (
    <div style={{
      padding: 20,
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f6fa',
      minHeight: '100vh'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: '#2f3640',
        marginBottom: 20
      }}>
        Carômetro — Avaliação Lúdica
      </h1>

      {!token ? (
        <div style={{
          maxWidth: 400,
          margin: '50px auto',
          padding: 20,
          backgroundColor: '#fff',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <Login onLogin={onLogin} />
        </div>
      ) : (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
            padding: 10,
            backgroundColor: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: 16, color: '#2f3640' }}>
              Logado como <strong>{username}</strong>
            </div>
            <button
              onClick={onLogout}
              style={{
                backgroundColor: '#e84118',
                color: '#fff',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 5,
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Sair
            </button>
          </div>

          <div style={{
            backgroundColor: '#fff',
            padding: 20,
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <Carometro token={token} username={username} />
          </div>
        </div>
      )}
    </div>
  );
}
