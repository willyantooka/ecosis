// 1. Protege a página: sem login, volta para o início
const cargo = localStorage.getItem('cargo');
if (!cargo) {
  window.location.href = 'index.html';
}

// 2. Dados de exemplo de cada perfil
const perfis = {
  morador:     { rotulo: 'Morador',     nome: 'Marina Rocha' },
  sindico:     { rotulo: 'Síndico',     nome: 'Carlos Mendes' },
  funcionario: { rotulo: 'Funcionário', nome: 'Paulo Lima' },
  porteiro:    { rotulo: 'Porteiro',    nome: 'Roberto Alves' },
  conselheiro: { rotulo: 'Conselheiro', nome: 'Helena Costa' }
};
const perfil = perfis[cargo] || perfis.morador;

// 3. Saudação conforme a hora
const hora = new Date().getHours();
let saudacao = 'Boa noite';
if (hora < 12) saudacao = 'Bom dia';
else if (hora < 18) saudacao = 'Boa tarde';

const primeiroNome = perfil.nome.split(' ')[0];
const iniciais = perfil.nome.split(' ').map(p => p[0]).join('');

document.getElementById('saudacao').textContent = saudacao + ', ' + primeiroNome;
document.getElementById('avatar').textContent = iniciais;
document.getElementById('perfil').textContent = 'Perfil: ' + perfil.rotulo;
document.getElementById('unidade-topo').textContent =
  localStorage.getItem('unidade') || 'Bloco A · Apto 84';

// 4. Esconde o que o cargo não pode acessar
document.querySelectorAll('[data-perfis]').forEach((item) => {
  const permitidos = item.dataset.perfis.split(' ');
  if (!permitidos.includes(cargo)) {
    item.hidden = true;
  }
});

// 5. Botão de pânico com modal
const modal = document.getElementById('modal-panico');
const toast = document.getElementById('toast');
const btnPanico = document.getElementById('panico');
const btnCancelar = document.getElementById('modal-cancelar');

function abrirModal() {
  modal.hidden = false;
  btnCancelar.focus();
}
function fecharModal() {
  modal.hidden = true;
  btnPanico.focus();
}

btnPanico.addEventListener('click', abrirModal);
btnCancelar.addEventListener('click', fecharModal);
document.getElementById('modal-fechar').addEventListener('click', fecharModal);

// Clicar fora da caixa fecha
modal.addEventListener('click', (e) => {
  if (e.target === modal) fecharModal();
});

// Esc fecha
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) fecharModal();
});

// Confirmar
document.getElementById('modal-confirmar').addEventListener('click', () => {
  fecharModal();
  toast.hidden = false;
  setTimeout(() => { toast.hidden = true; }, 4000);
});