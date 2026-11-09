const cargo = localStorage.getItem('cargo');
if (!cargo) window.location.href = 'index.html';

// Bloqueia páginas que o cargo não pode ver
const acesso = document.body.dataset.acesso;
if (acesso && !acesso.split(' ').includes(cargo)) {
  window.location.href = 'inicio.html';
}

// Esconde itens que o cargo não pode usar
document.querySelectorAll('[data-perfis]').forEach((item) => {
  if (!item.dataset.perfis.split(' ').includes(cargo)) item.hidden = true;
});

// Iniciais no avatar
const nomes = {
  morador: 'Marina Rocha', sindico: 'Carlos Mendes', funcionario: 'Paulo Lima',
  porteiro: 'Roberto Alves', conselheiro: 'Helena Costa'
};
const avatar = document.getElementById('avatar');
if (avatar) {
  avatar.textContent = (nomes[cargo] || nomes.morador).split(' ').map(p => p[0]).join('');
}

// Evita que texto digitado vire HTML
function esc(t) {
  return String(t).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}