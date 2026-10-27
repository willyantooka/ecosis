const cargo = document.getElementById('cargo');
const tituloAcesso = document.getElementById('titulo-acesso');
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const btnMostrar = document.getElementById('mostrar-senha');

const nomes = {
  morador: 'Acesso do morador',
  sindico: 'Acesso do síndico',
  funcionario: 'Acesso do funcionário',
  porteiro: 'Acesso do porteiro',
  conselheiro: 'Acesso do conselheiro'
};

// Muda o título e o e-mail conforme o cargo
cargo.addEventListener('change', () => {
  tituloAcesso.textContent = nomes[cargo.value];
  email.value = cargo.value + '@ecosis.com';
});

// Mostrar / ocultar senha
btnMostrar.addEventListener('click', () => {
  const oculta = senha.type === 'password';
  senha.type = oculta ? 'text' : 'password';
  btnMostrar.textContent = oculta ? 'Ocultar' : 'Mostrar';
});

// Entrar
document.getElementById('form-login').addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.setItem('cargo', cargo.value);
  localStorage.setItem('unidade', document.getElementById('unidade').value);
  window.location.href = 'inicio.html';
});