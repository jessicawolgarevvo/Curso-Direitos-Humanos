/* Módulo 02 · Tela 06 (e 06.1 a 06.4) — Exemplos (texto + carrossel de 5 definições) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m2/t6/';
  var FUNDO = 'assets/img/m2/t1/fundo.jpg';   // mesmo fundo claro da tela 01

  var INSTRUCAO = 'Interaja com as setas para conhecer alguns exemplos e novas definições.';
  var AVANCE = 'Avance para a próxima tela.';

  var CARDS = [
    { nome: 'Tratamento desrespeitoso', icone: 'tratamento-desrespeitoso', estado: null,
      texto: 'Conduta abusiva e hostil na qual a pessoa é tratada de forma desrespeitosa e/ou violenta por outra, o que pode se dar por comportamentos, palavras, atos, gestos etc.' },
    { nome: 'Assédio moral', icone: 'assedio-moral', estado: '06.1',
      texto: 'É toda e qualquer conduta que caracteriza comportamento abusivo, frequente e intencional, por meio de atitudes, gestos, palavras ou escritos que possam ferir a integridade física ou psíquica de uma pessoa, pôr em risco o seu emprego ou degradar o seu ambiente de trabalho.' },
    { nome: 'Assédio sexual', icone: 'assedio-sexual', estado: '06.2',
      texto: 'Exige que a pessoa assediadora use sua condição de ocupante de cargo superior no local de trabalho. Ou seja, ela busca vantagem ou favorecimento sexual utilizando-se da hierarquia, da fragilização e do impedimento de defesa da pessoa assediada.' },
    { nome: 'Importunação sexual', icone: 'importunacao-sexual', estado: '06.3',
      texto: 'Prática de ato libidinoso, com ou sem contato físico, na presença de alguém ou dirigido a alguém de forma não consensual, com o objetivo de “satisfazer a própria lascívia ou a de terceiro”.' },
    { nome: 'Discriminação', icone: 'discriminacao', estado: '06.4',
      texto: 'Prática de atitude baseada em ideia preconcebida em relação a alguém, seja por questões raciais, de gênero, orientação sexual, deficiência, nacionalidade, religião, situação econômica ou qualquer outra característica individual.' }
  ];

  var X = 345, Y = 402, W = 1230, H = 452;   // posição do cartão no palco

  window.RENDER['m2-06'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = '';

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + FUNDO + '" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna centro" style="--x:360px;--y:177px;--w:1200px">' +
        '<h1 class="t-titulo">Exemplos</h1>' +
        '<p class="t-texto" style="margin-top:15px">Agora que você sabe que um ambiente de trabalho respeitoso é um valor inegociável na Samarco, que tal conferir alguns exemplos de práticas abusivas e discriminatórias que não podemos tolerar?</p>' +
        '<p id="instrucao" class="t-instrucao" style="margin-top:30px">' + (ctx.concluida() ? AVANCE : INSTRUCAO) + '</p>' +
      '</div>' +
      '<div id="carCard" class="el car-card" style="--x:' + X + 'px;--y:' + Y + 'px;--w:' + W + 'px;--h:' + H + 'px" aria-live="polite">' +
        '<img class="marca" alt="" id="carMarca"><img class="circulo" alt="" id="carCirculo">' +
        '<h2 class="c-titulo" id="carTitulo"></h2><p class="c-texto" id="carTexto"></p>' +
      '</div>' +
      '<div class="el car-setas" style="--x:0px;--y:0px;--w:0px;--h:0px">' +
        '<button type="button" id="carVolta" class="car-seta" aria-label="Exemplo anterior" style="left:' + (X - 45) + 'px;top:' + (Y + H / 2 - 33) + 'px"><img alt="" src="' + D + 'seta-esquerda_circulo_verde.png"></button>' +
        '<button type="button" id="carVai" class="car-seta" aria-label="Próximo exemplo" style="left:' + (X + W - 33) + 'px;top:' + (Y + H / 2 - 33) + 'px"><img alt="" src="' + D + 'seta-direita_circulo_verde.png"></button>' +
      '</div>';

    var atual = 0, vistos = {};
    var volta = document.getElementById('carVolta'), vai = document.getElementById('carVai');

    /* convite suave: a seta "próximo" respira enquanto faltam exemplos a ver (fundo claro: brilho azul) */
    var conv = window.Convite.criar([vai], { claro: true });
    function convidar(atraso) {
      conv.atualizar(function () { return Object.keys(vistos).length === CARDS.length || vai.disabled; }, atraso);
    }

    function mostrar(i, conta) {
      atual = i;
      var c = CARDS[i];
      document.getElementById('carTitulo').textContent = c.nome;
      document.getElementById('carTexto').textContent = c.texto;
      document.getElementById('carCirculo').src = D + c.icone + '_circulo.png';
      document.getElementById('carMarca').src = D + c.icone + '_traco.png';
      volta.disabled = i === 0;
      vai.disabled = i === CARDS.length - 1;
      volta.firstChild.src = D + (volta.disabled ? 'seta-esquerda_circulo_cinza-desativada.png' : 'seta-esquerda_circulo_verde.png');
      vai.firstChild.src = D + (vai.disabled ? 'seta-direita_circulo_cinza-desativada.png' : 'seta-direita_circulo_verde.png');
      ctx.estado(c.estado);
      if (conta) {
        vistos[i] = true;
        convidar(900);
        if (Object.keys(vistos).length === CARDS.length) {
          document.getElementById('instrucao').textContent = AVANCE;
          ctx.concluir();
        }
      }
    }

    volta.addEventListener('click', function () { if (atual > 0) { mostrar(atual - 1, true); } });
    vai.addEventListener('click', function () { if (atual < CARDS.length - 1) { mostrar(atual + 1, true); } });

    var inicio = 0, contaInicio = true;
    CARDS.forEach(function (c, i) { if (c.estado && estadoId === c.estado) { inicio = i; contaInicio = false; } });   // aberto pelo índice
    mostrar(inicio, contaInicio);
    if (!ctx.concluida() && contaInicio) { convidar(1600); }
  };
})();
