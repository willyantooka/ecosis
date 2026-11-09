const rotulos = { aberto: 'Aberto', andamento: 'Em andamento', resolvido: 'Resolvido' };

let chamados = [
  { local: 'Garagem', texto: 'Lâmpada queimada perto da vaga 24.', data: '08/11', status: 'andamento' },
  { local: 'Elevador', texto: 'Porta do elevador social fazendo barulho.', data: '03/11', status: 'resolvido' }
];

const form = document.getElementById('form-chamado');
const descricao = document.getElementById('descricao');
const contador = document.getElementById('contador');
const arquivo = document.getElementById('arquivo');
const anexo = document.getElementById('anexo');
const confirmacao = document.getElementById('confirmacao');
const toggle = document.getElementById('historico-toggle');
const historico = document.getElementById('historico');

const textoAnexo = '+ Adicionar foto ou gravação de voz';

// Contador de caracteres
descricao.addEventListener('input', () => {
  contador.textContent = descricao.value.length + '/300 caracteres';
});

// Botão de anexo abre o seletor de arquivo
anexo.addEventListener('click', () => arquivo.click());
arquivo.addEventListener('change', () => {
  anexo.textContent = arquivo.files.length ? '✓ ' + arquivo.files[0].name : textoAnexo;
});

// Histórico
function desenharHistorico() {
  historico.innerHTML = chamados.map((c) => `
    <article class="chamado-item">
      <div class="chamado-item__topo">
        <strong>${esc(c.local)}</strong>
        <span class="status status--${c.status}">${rotulos[c.status]}</span>
      </div>
      <p>${esc(c.texto)}</p>
      <small>${esc(c.data)}</small>
    </article>
  `).join('');
}

toggle.addEventListener('click', () => {
  const aberto = historico.hidden;
  historico.hidden = !aberto;
  toggle.setAttribute('aria-expanded', aberto);
});

// Enviar chamado
form.addEventListener('submit', (e) => {
  e.preventDefault();
  chamados.unshift({
    local: document.getElementById('local').value,
    texto: descricao.value,
    data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
    status: 'aberto'
  });

  form.reset();
  contador.textContent = '0/300 caracteres';
  anexo.textContent = textoAnexo;
  desenharHistorico();

  confirmacao.hidden = false;
  setTimeout(() => { confirmacao.hidden = true; }, 5000);
});

desenharHistorico();