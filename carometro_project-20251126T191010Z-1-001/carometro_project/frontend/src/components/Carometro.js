import React, { useEffect, useState } from 'react';
import { fetchStudents } from '../services/api';
import StudentModal from './StudentModal';

function StudentCard({ s, onClick }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: '#fff',
        borderRadius: 12,
        padding: 15,
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      }}
    >
      <img
        src={s.photoPath || '/default.png'}
        alt={s.name}
        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '50%', marginBottom: 10 }}
      />
      <div style={{ fontWeight: 'bold', fontSize: 16, color: '#333', marginBottom: 4 }}>{s.name}</div>
      <div style={{ fontSize: 14, color: '#666' }}>{s.series} - {s.formation}</div>
    </div>
  );
}

export default function Carometro({ token, username }) {
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({ formation: '', series: '' });
  const [selected, setSelected] = useState(null);

  useEffect(() => { load(); }, [filters]);

  async function load() {
    try {
      const s = await fetchStudents(filters, token);
      setStudents(Array.isArray(s) ? s : []);
    } catch (e) { console.error(e); setStudents([]); }
  }

  return (
    <div style={{ padding: 30, fontFamily: 'Arial, sans-serif', background: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: 20 }}>Área Administrativa - Carômetro</h1>

      {/* Filtros e botões */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
        <select
          value={filters.formation}
          onChange={e => setFilters({ ...filters, formation: e.target.value })}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 150 }}
        >
          <option value=''>Todos</option>
          <option value='FUND1'>Fundamental 1</option>
          <option value='FUND2'>Fundamental 2</option>
          <option value='MEDIO'>Ensino Médio</option>
        </select>

        <input
          placeholder='Série (ex: 1º, 6º, 3º EM)'
          value={filters.series}
          onChange={e => setFilters({ ...filters, series: e.target.value })}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', minWidth: 180 }}
        />

        <button
          onClick={() => setFilters({ formation: '', series: '' })}
          style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#f44336', color: '#fff', cursor: 'pointer', transition: '0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#d32f2f'}
          onMouseLeave={e => e.currentTarget.style.background = '#f44336'}
        >
          Limpar
        </button>

        <button
          onClick={() => setSelected({})}
          style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#4CAF50', color: '#fff', cursor: 'pointer', transition: '0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#45a049'}
          onMouseLeave={e => e.currentTarget.style.background = '#4CAF50'}
        >
          Novo aluno
        </button>
      </div>

      {/* Grid de alunos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 15,
      }}>
        {students.length > 0 ? students.map(s =>
          <StudentCard key={s.id} s={s} onClick={() => setSelected(s)} />
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#999', fontSize: 16 }}>
            Nenhum aluno encontrado.
          </div>
        )}
      </div>

      {/* Modal */}
      {selected &&
        <StudentModal
          student={selected}
          token={token}
          username={username}
          onClose={() => { setSelected(null); load(); }}
        />
      }
    </div>
  );
}
