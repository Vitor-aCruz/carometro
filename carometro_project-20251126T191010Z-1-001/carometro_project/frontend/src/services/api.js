const API = "/api";

// FUNÇÃO PADRÃO PARA CHAMADAS DE API
export async function apiFetch(path, opts = {}) {
  const token = localStorage.getItem("token"); // ← TOKEN AUTOMÁTICO

  const headers = opts.headers || {};

  // Adiciona token
  if (token) headers["X-Auth-Token"] = token;

  // Evita Content-Type quando body é FormData
  if (!(opts.body instanceof FormData)) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  const res = await fetch(API + path, {
    ...opts,
    headers,
    body: opts.body
  });

  if (res.status === 401) {
    throw new Error("unauth");
  }

  return res.json();
}

// LOGIN (SALVA TOKEN AUTOMATICAMENTE)
export async function login(username, password) {
  const r = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password })
  });

  // Salva token
  if (r.token) localStorage.setItem("token", r.token);

  return r;
}

// BUSCAR ALUNOS
export async function fetchStudents(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  return apiFetch("/students" + (params ? "?" + params : ""), {
    method: "GET"
  });
}

// CRIAR ALUNO
export async function createStudent(student) {
  return apiFetch("/students", {
    method: "POST",
    body: JSON.stringify(student)
  });
}

// EDITAR ALUNO
export async function updateStudent(id, student) {
  return apiFetch("/students/" + id, {
    method: "PUT",
    body: JSON.stringify(student)
  });
}

// UPLOAD DE FOTO
export async function uploadPhoto(studentId, file) {
  const formData = new FormData();
  formData.append("file", file);

  const token = localStorage.getItem("token");

  const res = await fetch(`/api/students/${studentId}/photo`, {
    method: "POST",
    headers: { "X-Auth-Token": token },
    body: formData
  });

  if (res.status === 401) throw new Error("unauth");

  return res.json();
}

// CRIAR AVALIAÇÃO
export async function createEvaluation(ev) {
  return apiFetch("/evaluations", {
    method: "POST",
    body: JSON.stringify(ev)
  });
}

// ÚLTIMAS 5 AVALIAÇÕES
export async function last5(studentId) {
  return apiFetch(`/evaluations/student/${studentId}/last5`, {
    method: "GET"
  });
}
