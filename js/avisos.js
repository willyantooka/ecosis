let avisos = [
  { titulo: 'Manutenção do elevador',
    texto: 'Elevador social indisponível amanhã, das 9h às 12h.',
    quando: 'Hoje, 10:30', lido: false },
  { titulo: 'Assembleia do condomínio',
    texto: 'Reunião no salão de festas na quinta-feira, às 19h.',
    quando: 'Ontem, 17:45', lido: false },
  { titulo: 'Limpeza da caixa d’água',
    texto: 'Serviço concluído. O abastecimento já foi normalizado.',
    quando: '12 jun, 14:20', lido: true }
];

const central = document.getElementById('central');
const btnOuvir = document.getElementById('ouvir');

function desenhar() {
  central.innerHTML = avisos.map((a, i) => `
    <article class="item-aviso ${a.lido ? 'lido' : ''}" data-i="${i}">
      <span class="ponto"></span>
      <div>
        <div class="item-aviso__topo">
          <span>${a.lido ? 'Lido' : 'Novo aviso'}</span>
          <span>${esc(a.quando)}</span>
        </div>
        <h3>${esc(a.titulo)}</h3>
        <p>${esc(a.texto)}</p>
      </div>
    </article>
  `).join('');
}

// Clicar num aviso marca como lido
central.addEventListener('click', (e) => {
  const item = e.target.closest('.item-aviso');
  if (!item) return;
  avisos[item.dataset.i].lido = true;
  desenhar();
});

// Marcar todos como lidos
document.getElementById('marcar').addEventListener('click', () => {
  avisos.forEach((a) => { a.lido = true; });
  desenhar();
});

// Ouvir avisos (leitura em voz alta)
btnOuvir.addEventListener('click', () => {
  if (!('speechSynthesis' in window)) {
    alert('Seu navegador não suporta leitura em voz alta.');
    return;
  }
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    btnOuvir.classList.remove('ativa');
    return;
  }
  const novos = avisos.filter((a) => !a.lido);
  const texto = novos.length
    ? novos.map((a) => a.titulo + '. ' + a.texto).join(' ')
    : 'Você não tem avisos novos.';

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = 'pt-BR';
  fala.onend = () => btnOuvir.classList.remove('ativa');
  btnOuvir.classList.add('ativa');
  speechSynthesis.speak(fala);
});

desenhar();