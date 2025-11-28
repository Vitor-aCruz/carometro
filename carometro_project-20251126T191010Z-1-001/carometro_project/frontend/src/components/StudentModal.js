import React, { useState, useEffect } from 'react';
import { createStudent, updateStudent, uploadPhoto, createEvaluation, last5 } from '../services/api';

export default function StudentModal({ student, token, username, onClose }) {
  const isNew = !student.id;
  const [form, setForm] = useState({ name: '', series: '', formation: 'FUND1' });
  const [file, setFile] = useState(null);
  const [report, setReport] = useState([]);

  useEffect(() => {
    if (!isNew) {
      setForm({ name: student.name, series: student.series, formation: student.formation });
      loadReport();
    }
  }, []);

  async function save() {
    if (isNew) {
      await createStudent(form, token);
    } else {
      await updateStudent(student.id, form, token);
      if (file) await uploadPhoto(student.id, file, token);
    }
    onClose();
  }

  async function loadReport() {
    try {
      const r = await last5(student.id, token);
      setReport(Array.isArray(r) ? r : []);
    } catch (e) {
      setReport([]);
    }
  }

  const [evalVals, setEvalVals] = useState({ ass: 3, part: 3, resp: 3, soc: 3, obs: '' });

  async function submitEval() {
    const payload = {
      student: { id: student.id },
      assiduidade: evalVals.ass,
      participacao: evalVals.part,
      responsabilidade: evalVals.resp,
      sociabilidade: evalVals.soc,
      observation: evalVals.obs
    };
    await createEvaluation(payload, token);
    setEvalVals({ ...evalVals, obs: '' });
    loadReport();
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 10,
        padding: 30,
        width: '100%',
        maxWidth: 600,
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>{isNew ? 'Novo Aluno' : 'Editar Aluno'}</h2>
          <button onClick={onClose} style={{
            background: '#e84118',
            color: '#fff',
            border: 'none',
            padding: '6px 12px',
            borderRadius: 5,
            cursor: 'pointer'
          }}>X</button>
        </div>

        {/* Formulário do aluno */}
        <div style={{ display: 'grid', gap: 15 }}>
          <input
            placeholder="Nome"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc', width: '100%' }}
          />
          <input
            placeholder="Série"
            value={form.series}
            onChange={e => setForm({ ...form, series: e.target.value })}
            style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc', width: '100%' }}
          />
          <select
            value={form.formation}
            onChange={e => setForm({ ...form, formation: e.target.value })}
            style={{ padding: 10, borderRadius: 5, border: '1px solid #ccc', width: '100%' }}
          >
            <option value='FUND1'>Fundamental 1</option>
            <option value='FUND2'>Fundamental 2</option>
            <option value='MEDIO'>Ensino Médio</option>
          </select>
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button
            onClick={save}
            style={{
              background: '#00a8ff',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 5,
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Salvar
          </button>
        </div>

        {/* Avaliação lúdica */}
        {!isNew && (
          <div style={{ marginTop: 30 }}>
            <h3>Avaliação Lúdica</h3>
            {['ass', 'part', 'resp', 'soc'].map((key) => (
              <div key={key} style={{ marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                <label style={{ width: 120, textTransform: 'capitalize' }}>
                  {key === 'ass' ? 'Assiduidade' :
                   key === 'part' ? 'Participação' :
                   key === 'resp' ? 'Responsabilidade' : 'Sociabilidade'}:
                </label>
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setEvalVals({ ...evalVals, [key]: n })}
                    style={{
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: 5,
                      border: n === evalVals[key] ? '2px solid #00a8ff' : '1px solid #ccc',
                      backgroundColor: n === evalVals[key] ? '#dff6ff' : '#f0f0f0'
                    }}
                  >
                    {'😀'}
                  </button>
                ))}
                <span>{evalVals[key]}</span>
              </div>
            ))}
            <textarea
              placeholder="Observação"
              value={evalVals.obs}
              onChange={e => setEvalVals({ ...evalVals, obs: e.target.value })}
              style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc', marginBottom: 10 }}
            ></textarea>
            <button
              onClick={submitEval}
              style={{
                background: '#44bd32',
                color: '#fff',
                border: 'none',
                padding: '10px 20px',
                borderRadius: 5,
                cursor: 'pointer',
                fontWeight: 'bold',
                marginBottom: 20
              }}
            >
              Enviar avaliação ({username})
            </button>

            {/* Últimas 5 avaliações */}
            <h4>Últimas 5 avaliações</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {report.length > 0 ? report.map(r => (
                <div key={r.id} style={{ padding: 10, borderRadius: 5, background: '#f5f6fa' }}>
                  <div><strong>{r.evaluator}</strong> — {new Date(r.dateTime).toLocaleString()}</div>
                  <div>Média: {((r.assiduidade + r.participacao + r.responsabilidade + r.sociabilidade) / 4).toFixed(2)}</div>
                  <div>{r.observation}</div>
                </div>
              )) : <div>Nenhuma avaliação encontrada.</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
