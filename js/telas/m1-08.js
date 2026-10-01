/* Módulo 01 · Tela 08 (e 08.1) — Temas Prioritários (texto + infográfico interativo com 9 temas) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m1/t8/';
  var FUNDO = 'assets/img/m1/t8/fundo.png';

  /* Ordem da grade do Figma (da esquerda para a direita, de cima para baixo). */
  var TEMAS = [
    { icone: 'maleta',   nome: 'Trabalho decente' },
    { icone: 'coracao',  nome: 'Qualidade de vida, saúde e segurança das comunidades anfitriãs' },
    { icone: 'triste',   nome: 'Uso da força' },
    { icone: 'balao',    nome: 'Práticas abusivas e discriminatórias' },
    { icone: 'aperto',   nome: 'Direito à informação' },
    { icone: 'escudo',   nome: 'Privacidade, segurança e uso de dados pessoais' },
    { icone: 'rede',     nome: 'Saúde e segurança ocupacional' },
    { icone: 'paisagem', nome: 'Direito à terra e deslocamento involuntário de famílias e comunidades' },
    { icone: 'mundo',    nome: 'Modos de vida de Povos Indígenas e Comunidades Tradicionais' }
  ];
  var COLS = [0, 224, 457, 681];   // divisões da grade (px do palco, relativas à grade)
  var LINS = [0, 193, 393, 574];
  function pct(v, total) { return (v / total * 100).toFixed(3) + '%'; }   // a grade se ajusta ao tamanho da tela

  window.RENDER['m1-08'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = 'escuro';

    var celulas = TEMAS.map(function (tm, i) {
      var c = i % 3, l = Math.floor(i / 3);
      return '<button type="button" class="tema" data-i="' + i + '" aria-label="' + tm.nome + '" aria-pressed="false" ' +
        'style="left:' + pct(COLS[c], 681) + ';top:' + pct(LINS[l], 574) + ';width:' + pct(COLS[c + 1] - COLS[c], 681) + ';height:' + pct(LINS[l + 1] - LINS[l], 574) + '">' +
        '<img alt="" src="' + D + tm.icone + '.png">' +
        '<span class="check"></span>' +
        '<span class="nome"><img alt="" src="' + D + tm.icone + '.png"><span>' + tm.nome + '</span></span>' +
      '</button>';
    }).join('');

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + FUNDO + '" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna" style="--x:200px;--y:303px;--w:580px">' +
        '<h1 class="t-titulo">Temas Prioritários</h1>' +
        '<div style="margin-top:20px"><p class="t-texto">Na etapa de Identificação e Avaliação de Riscos e Impactos, a Samarco identificou nove temas prioritários de Direitos Humanos. Esses temas representam as áreas com maior potencial de impacto sobre as pessoas e orientam o desenvolvimento de ações de prevenção, mitigação e gestão desses riscos.</p></div>' +
        '<p class="t-instrucao" style="margin-top:15px">Clique nos ícones do infográfico para descobrir quais são esses 9 temas prioritários.</p>' +
      '</div>' +
      /* só aparece no celular em pé: mostra o nome do tema escolhido, acima do infográfico (no computador o nome aparece sobre o ícone) */
      '<p id="legendaTema" class="legenda-tema" aria-live="polite"></p>' +
      '<div class="el grade-temas" style="--x:929px;--y:155px;--w:681px;--h:574px;--ar:681/574">' +
        '<span class="linha" style="left:' + pct(224, 681) + ';top:0;width:1px;height:100%"></span>' +
        '<span class="linha" style="left:' + pct(457, 681) + ';top:0;width:1px;height:100%"></span>' +
        '<span class="linha" style="left:0;top:' + pct(193, 574) + ';width:100%;height:1px"></span>' +
        '<span class="linha" style="left:0;top:' + pct(393, 574) + ';width:100%;height:1px"></span>' +
        celulas +
      '</div>';

    var botoes = el.querySelectorAll('.tema');
    var visitados = {};          // temas já abertos ao menos uma vez
    var abertoAgora = -1;

    var legenda = document.getElementById('legendaTema');

    function fechar(i) {
      legenda.textContent = '';
      botoes[i].classList.remove('aberto');
      botoes[i].classList.add('visto');          // o check fica no lugar, marcando que já passou por ali
      botoes[i].setAttribute('aria-pressed', 'false');
    }

    function abrir(i, conta) {
      if (abertoAgora >= 0 && abertoAgora !== i) { fechar(abertoAgora); }
      botoes[i].classList.add('aberto');
      botoes[i].setAttribute('aria-pressed', 'true');
      legenda.textContent = TEMAS[i].nome;
      abertoAgora = i;
      if (conta) {
        visitados[i] = true;
        if (Object.keys(visitados).length === TEMAS.length) { ctx.concluir(); }
      }
      sugerir(900);
    }

    /* Convite suave: o próximo tema ainda não visto (esquerda → direita, de cima para baixo) ganha um brilho que "respira". */
    var tempoSugestao = null;
    function sugerir(atraso) {
      botoes.forEach(function (b) { b.classList.remove('sugestao'); });
      clearTimeout(tempoSugestao);
      tempoSugestao = setTimeout(function () {
        if (!document.body.contains(el.querySelector('.grade-temas'))) { return; }   // o aluno já saiu da tela
        for (var k = 0; k < TEMAS.length; k++) {
          if (!visitados[k]) { botoes[k].classList.add('sugestao'); return; }
        }
      }, atraso);
    }

    botoes.forEach(function (b, i) {
      b.addEventListener('click', function () {
        if (abertoAgora === i) { fechar(i); abertoAgora = -1; sugerir(900); }
        else { abrir(i, true); }
      });
    });

    var celularEmPe = window.matchMedia('(max-width: 900px) and (orientation: portrait), (max-width: 600px), (max-height: 500px) and (orientation: landscape)').matches;
    if (celularEmPe) { abrir(0, true); }             // celular: o primeiro tema já vem aberto, para mostrar como funciona
    else if (estadoId === '08.1') { abrir(0, false); }   // aberto pelo índice: mostra o nome sobre um ícone
    else { sugerir(1400); }                          // começa o convite logo depois que o conteúdo termina de aparecer
  };
})();
