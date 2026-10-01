/* Módulo 02 · Tela 05 (e 05.1) — Respeito: um compromisso inegociável (texto + imagem clicável com pop-up) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m2/t5/';

  var INSTRUCAO = 'Neste cenário, a liderança tem um papel fundamental para evitar essas situações. Clique na imagem e descubra como a liderança pode auxiliar na eliminação de práticas abusivas e discriminatórias.';
  var AVANCE = 'Avance para a próxima tela.';

  window.RENDER['m2-05'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<button type="button" id="btnFoto" class="el btn-img" aria-label="Clique na imagem e confira o conteúdo" style="--x:195px;--y:177px;--w:734px;--h:656px;--ar:734/656">' +
        '<img alt="" src="' + D + 'foto_n.png"><img class="h" alt="" src="' + D + 'foto_h.png">' +
      '</button>' +
      '<div class="el coluna" style="--x:1059px;--y:198px;--w:650px">' +
        '<h1 class="t-titulo">Respeito: um compromisso inegociável</h1>' +
        '<div style="margin-top:42px">' +
          '<p class="t-texto">Na Samarco, o respeito é um valor inegociável. Por isso, não há espaço para assédio, discriminação ou qualquer outra forma de tratamento desrespeitoso.</p>' +
          '<p class="t-texto" style="margin-top:36px">Promover um ambiente respeitoso também significa promover segurança. Ambientes marcados pelo medo, pela humilhação ou pelo silêncio aumentam a chance de falhas, comprometem a confiança entre as pessoas e podem contribuir para a ocorrência de acidentes.</p>' +
        '</div>' +
        '<p id="instrucao" class="t-instrucao" style="margin-top:56px">' + (ctx.concluida() ? AVANCE : INSTRUCAO) + '</p>' +
      '</div>';

    /* ---- pop-up 05.1: o papel da liderança ---- */
    var popup = null;
    /* convite suave: a imagem "respira" até o aluno clicar */
    var conv = window.Convite.criar([document.getElementById('btnFoto')]);
    if (!ctx.concluida() && estadoId !== '05.1') { conv.atualizar(function () { return false; }, 1600); }

    function abrir() {
      if (popup) { return; }
      conv.parar();
      popup = document.createElement('div');
      popup.className = 'popup';
      popup.setAttribute('role', 'dialog');
      popup.setAttribute('aria-modal', 'true');
      popup.setAttribute('aria-label', 'O papel da liderança');
      popup.innerHTML =
        '<div class="popup-caixa lideranca">' +
          '<h2 class="pop-titulo">O papel da liderança:</h2>' +
          '<ul class="pop-lista">' +
            '<li>Intervir prontamente diante de situações de desrespeito;</li>' +
            '<li>Promover diálogos sobre comunicação não violenta;</li>' +
            '<li>Ser referência de confiança para a equipe;</li>' +
            '<li>Orientar a equipe a acionar os canais adequados sempre que necessário (Canal de Ética).</li>' +
          '</ul>' +
          '<button type="button" class="btn-img popup-fechar" aria-label="Feche o pop-up"><img alt="" src="assets/img/fechar_popup.png"></button>' +
        '</div>';
      el.appendChild(popup);
      popup.querySelector('.popup-fechar').addEventListener('click', fechar);
      popup.querySelector('.popup-fechar').focus();
      ctx.estado('05.1');
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
    document.addEventListener('keydown', function esc(e) {
      if (!document.body.contains(el.querySelector('#btnFoto'))) { document.removeEventListener('keydown', esc); return; }
      if (e.key === 'Escape' && popup) { fechar(); }
    });

    /* Aberto pelo índice (05.1): mostra o pop-up sem contar como atividade feita. */
    if (estadoId === '05.1') {
      abrir();
      popup.setAttribute('data-manual', 'revisao');
    }
  };
})();
