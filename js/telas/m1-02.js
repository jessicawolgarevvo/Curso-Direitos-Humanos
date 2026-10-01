/* Módulo 01 · Tela 02 (e 02.1) — Mas, afinal, o que são os Direitos Humanos? (texto + imagem clicável com pop-up) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m1/t2/';

  var INSTRUCAO = 'Clique na imagem para aprofundar seu conhecimento sobre este tema.';
  var AVANCE = 'Avance para a próxima tela.';

  window.RENDER['m1-02'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<button type="button" id="btnFoto" class="el btn-img" aria-label="Clique na imagem e confira o conteúdo" style="--x:252px;--y:194px;--w:734px;--h:656px;--ar:734/656">' +
        '<img alt="" src="' + D + 'foto_n.png"><img class="h" alt="" src="' + D + 'foto_h.png">' +
      '</button>' +
      '<div class="el coluna" style="--x:1112px;--y:243px;--w:608px">' +
        '<h1 class="t-titulo" style="width:560px">Mas, afinal, o que são os Direitos Humanos?</h1>' +
        '<div style="margin-top:47px">' +
          '<p class="t-texto">São <strong>garantias</strong> que asseguram a todas as pessoas o direito de <strong>viver com dignidade, respeito, segurança e liberdade</strong>. Eles são universais, ou seja, devem ser garantidos a todas as pessoas, independentemente de sua origem, condição ou lugar onde estejam.</p>' +
          '<p class="t-texto" style="margin-top:28px">Esse compromisso vai além do cumprimento das leis e das ações governamentais. As empresas também desempenham um papel fundamental na promoção e no respeito aos Direitos Humanos, incorporando esses princípios em suas atividades, nas relações que estabelecem e nas decisões que tomam diariamente.</p>' +
        '</div>' +
        '<p id="instrucao" class="t-instrucao" style="margin-top:30px">' + (ctx.concluida() ? AVANCE : INSTRUCAO) + '</p>' +
      '</div>';

    /* ---- pop-up 02.1 ---- */
    var popup = null;
    var conv = null;

    function abrir() {
      if (popup) { return; }
      if (conv) { conv.parar(); }
      popup = document.createElement('div');
      popup.className = 'popup';
      popup.setAttribute('role', 'dialog');
      popup.setAttribute('aria-modal', 'true');
      popup.setAttribute('aria-label', 'As principais características dos Direitos Humanos');
      popup.innerHTML =
        '<div class="popup-caixa">' +
          '<h2 class="pop-titulo">As principais características dos Direitos Humanos são:</h2>' +
          '<ul class="pop-lista">' +
            '<li><strong>Universais</strong>: devem ser garantidos a todos(as), independentemente de gênero, raça, idade etc.;</li>' +
            '<li><strong>Indisponíveis</strong>: não podem ser renunciados, negociados ou retirados;</li>' +
            '<li><strong>Indivisíveis</strong>: todos têm a mesma importância e devem ser respeitados em conjunto, sem que um seja considerado superior a outro;</li>' +
            '<li><strong>Interdependentes</strong>: estão conectados entre si. Quando um direito é promovido ou violado, outros direitos também podem ser impactados;</li>' +
            '<li><strong>Internacionalmente reconhecidos</strong>: protegidos por tratados e acordos <span class="quebra"></span>internacionais.</li>' +
          '</ul>' +
          '<p class="pop-final">Direitos Humanos é direito, é dever e é compromisso!</p>' +
          '<button type="button" class="btn-img popup-fechar" aria-label="Feche o pop-up"><img alt="" src="assets/img/fechar_popup.png"></button>' +
        '</div>';
      el.appendChild(popup);
      popup.querySelector('.popup-fechar').addEventListener('click', fechar);
      popup.querySelector('.popup-fechar').focus();
      ctx.estado('02.1');
    }

    function fechar() {
      if (!popup) { return; }
      var viuTudo = popup.getAttribute('data-manual') !== 'revisao';
      popup.parentNode.removeChild(popup);
      popup = null;
      ctx.estado(null);
      document.getElementById('btnFoto').focus();
      if (viuTudo) {
        ctx.concluir();
        document.getElementById('instrucao').textContent = AVANCE;
      }
    }

    document.getElementById('btnFoto').addEventListener('click', abrir);

    /* convite suave: a imagem "respira" até o aluno clicar */
    conv = window.Convite.criar([document.getElementById('btnFoto')]);
    if (!ctx.concluida() && estadoId !== '02.1') { conv.atualizar(function () { return false; }, 1600); }
    document.addEventListener('keydown', function esc(e) {
      if (!document.body.contains(el.querySelector('#btnFoto'))) { document.removeEventListener('keydown', esc); return; }
      if (e.key === 'Escape' && popup) { fechar(); }
    });

    /* Abrir direto pelo índice (02.1): mostra o pop-up sem contar como atividade feita. */
    if (estadoId === '02.1') {
      abrir();
      popup.setAttribute('data-manual', 'revisao');
    }
  };
})();
