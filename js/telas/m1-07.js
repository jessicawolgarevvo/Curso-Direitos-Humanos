/* Módulo 01 · Tela 07 (e 07.1) — O que é Due Diligence em Direitos Humanos? (texto + infográfico clicável com 4 etapas) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m1/t7/';

  var INSTRUCAO = 'Clique nas etapas dentro do infográfico para saber como a Samarco coloca isso em prática.';
  var AVANCE = 'Avance para a próxima tela.';

  /* Ordem do convite e da conclusão: no sentido horário, começando pelo alto. Posições = Figma (palco 1920x1080). */
  var ETAPAS = [
    { icone: 'lupa', titulo: 'Identificação e avaliação de riscos e impactos', rotulo: 'Identificação e avaliação<br>de riscos e impactos',
      texto: 'Analisa os riscos de possíveis violações dos Direitos Humanos no dia a dia das nossas operações, projetos, rede de fornecedores e ações de reparação.',
      x: 1067, y: 72, w: 500, h: 190, ix: 0, iy: 0, lx: 165, ly: 47, lw: 330, ck: [79, 15] },
    { icone: 'engrenagem', titulo: 'Integração (prevenir e mitigar)', rotulo: 'Integração<br>(prevenir e<br>mitigar)',
      texto: 'Implementa ações de prevenção e mitigação, como inspeções em Direitos Humanos, treinamentos e DDSS sobre a temática.',
      x: 1364, y: 325, w: 390, h: 184, ix: 0, iy: 0, lx: 179, ly: 53, lw: 210, ck: [130, 25] },
    { icone: 'barras', titulo: 'Monitoramento', rotulo: 'Monitoramento',
      texto: 'Faz o monitoramento dos resultados, com atuação na correção de desvios identificados.',
      x: 1364, y: 531, w: 450, h: 184, ix: 0, iy: 0, lx: 179, ly: 66, lw: 270, ck: [128, 34] },
    { icone: 'conversa', titulo: 'Comunicação', rotulo: 'Comunicação',
      texto: 'Comunica os resultados, promovendo transparência e melhoria contínua, por exemplo, por meio do Relatório Anual de DH, anexo ao RAS.',
      x: 1090, y: 706, w: 500, h: 184, ix: 0, iy: 0, lx: 170, ly: 81, lw: 330, ck: [86, 25] }
  ];

  /* Anel (azul → verde) com duas setas de ciclo e o texto curvo "Engajar com partes interessadas" */
  function anelSvg() {
    var cx = 280, cy = 280, r = 197, R = 242;
    function ponta(grau, cor) {
      var a = grau * Math.PI / 180, px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
      var nx = Math.cos(a), ny = Math.sin(a), tx = -Math.sin(a), ty = Math.cos(a);   // radial e tangente (sentido horário)
      var p1 = [px + nx * 36 - tx * 6, py + ny * 36 - ty * 6], p2 = [px - nx * 36 - tx * 6, py - ny * 36 - ty * 6], tip = [px + tx * 54, py + ty * 54];
      return '<polygon fill="' + cor + '" points="' + p1.join(',') + ' ' + tip.join(',') + ' ' + p2.join(',') + '"/>';
    }
    function pt(grau, raio) { var a = grau * Math.PI / 180; return (cx + raio * Math.cos(a)).toFixed(1) + ' ' + (cy + raio * Math.sin(a)).toFixed(1); }
    return '<svg class="dd-anel" viewBox="0 0 560 560" aria-hidden="true">' +
      '<defs><linearGradient id="ddGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#00A9FF"/><stop offset="1" stop-color="#95C11F"/></linearGradient>' +
      '<path id="ddTexto" d="M ' + pt(-163, R) + ' A ' + R + ' ' + R + ' 0 0 1 ' + pt(-17, R) + '"/></defs>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="url(#ddGrad)" stroke-width="24"/>' +
      ponta(-29, '#95C11F') + ponta(160, '#00A9FF') +
      '<text class="dd-curvo"><textPath href="#ddTexto" startOffset="50%" text-anchor="middle">ENGAJAR COM PARTES INTERESSADAS</textPath></text>' +
      '</svg>';
  }

  window.RENDER['m1-07'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';
    var jaFeita = ctx.concluida() || estadoId === '07.1';

    var botoes = ETAPAS.map(function (e, i) {
      return '<button type="button" class="dd-etapa" data-i="' + i + '" aria-haspopup="dialog" aria-label="' + e.titulo + '. Clique para ver como a Samarco coloca isso em prática." ' +
        'style="left:' + e.x + 'px;top:' + e.y + 'px;width:' + e.w + 'px;height:' + e.h + 'px">' +
        '<img class="dd-ic" alt="" src="' + D + e.icone + '.png" style="left:0;top:0;width:184px;height:184px">' +
        '<span class="dd-rot" style="left:' + e.lx + 'px;top:' + e.ly + 'px;width:' + e.lw + 'px">' + e.rotulo + '</span>' +
        '<span class="check" style="left:' + e.ck[0] + 'px;top:' + e.ck[1] + 'px"></span>' +
      '</button>';
    }).join('');

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.png" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna" style="--x:200px;--y:223px;--w:660px">' +
        '<h1 class="t-titulo">O que é <em>Due Diligence</em> em<br>Direitos Humanos?</h1>' +
        '<div style="margin-top:45px">' +
          '<p class="t-texto">Assim como na segurança do trabalho, em que buscamos prevenir acidentes antes que aconteçam, a devida diligência em Direitos Humanos tem como objetivo antecipar riscos para evitar que pessoas sejam impactadas.</p>' +
          '<p class="t-texto" style="margin-top:32px">Baseada nos Princípios Orientadores da ONU, a devida diligência em Direitos Humanos é um processo contínuo de identificar, prevenir, mitigar e tratar impactos sobre os Direitos Humanos decorrentes das atividades e relações de negócio da empresa.</p>' +
        '</div>' +
        '<p id="instrucao" class="t-instrucao" style="margin-top:47px">' + (jaFeita ? AVANCE : INSTRUCAO) + '</p>' +
      '</div>' +
      '<div class="el dd-infografico">' +
        '<div class="dd-anel-caixa">' + anelSvg() + '<p class="dd-central">DEVIDA<br>DILIGÊNCIA<br>DE DIREITOS<br>HUMANOS</p></div>' +
        '<div class="dd-botoes">' + botoes + '</div>' +
      '</div>';

    var lista = [].slice.call(el.querySelectorAll('.dd-etapa'));
    var vistas = {};
    var popup = null, abertaAgora = -1;

    var conv = window.Convite.criar(lista);
    function convidar(atraso) { conv.atualizar(function (k) { return vistas[k]; }, atraso); }

    function fechar() {
      if (!popup) { return; }
      var i = abertaAgora, revisao = popup.getAttribute('data-manual') === 'revisao';
      popup.parentNode.removeChild(popup);
      popup = null; abertaAgora = -1;
      ctx.estado(null);
      if (lista[i]) { lista[i].focus(); }
      if (revisao) { return; }
      vistas[i] = true;
      lista[i].classList.add('visto');
      if (Object.keys(vistas).length === ETAPAS.length) {
        document.getElementById('instrucao').textContent = AVANCE;
        ctx.concluir();
        conv.parar();
      } else { convidar(900); }
    }

    function abrir(i, revisao) {
      if (popup) { return; }
      var e = ETAPAS[i];
      conv.parar();
      abertaAgora = i;
      popup = document.createElement('div');
      popup.className = 'popup dd-popup';
      popup.setAttribute('role', 'dialog');
      popup.setAttribute('aria-modal', 'true');
      popup.setAttribute('aria-label', e.titulo);
      if (revisao) { popup.setAttribute('data-manual', 'revisao'); }
      popup.innerHTML =
        '<div class="dd-card"><h2>' + e.titulo + '</h2><p>' + e.texto + '</p>' +
        '<button type="button" class="btn-img popup-fechar" aria-label="Feche o pop-up"><img alt="" src="assets/img/fechar_popup.png"></button></div>';
      el.appendChild(popup);
      popup.querySelector('.popup-fechar').addEventListener('click', fechar);
      popup.addEventListener('click', function (ev) { if (ev.target === popup) { fechar(); } });
      popup.querySelector('.popup-fechar').focus();
      ctx.estado(null);
    }

    lista.forEach(function (b, i) { b.addEventListener('click', function () { abrir(i, false); }); });
    document.addEventListener('keydown', function esc(ev) {
      if (!document.body.contains(el.querySelector('.dd-etapa'))) { document.removeEventListener('keydown', esc); return; }
      if (ev.key === 'Escape' && popup) { fechar(); }
    });

    /* Aberta pelo índice (07.1): mostra a tela já concluída ("Avance para a próxima tela."), sem contar como atividade feita. */
    if (estadoId === '07.1') { lista.forEach(function (b) { b.classList.add('visto'); }); }
    else if (!ctx.concluida()) { convidar(1600); }
    else { lista.forEach(function (b) { b.classList.add('visto'); }); }
  };
})();
