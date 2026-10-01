/* Módulo 01 · Tela 06 (e 06.1 a 06.5) — Quem são os detentores de Direitos Humanos? (texto + acordeão) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m1/t6/';

  var INSTRUCAO = 'Clique nos boxes para compreender melhor quem é cada detentor.';
  var AVANCE = 'Avance para a próxima tela para continuar com seus estudos.';

  var ITENS = [
    { fechado: 'Próprios e próprias', aberto: 'Próprios e próprias', estado: '06.1',
      texto: 'São empregados e empregadas da Samarco, que têm seus Direitos Humanos respeitados e protegidos no ambiente de trabalho, por meio de relações pautadas na dignidade, no respeito, na segurança e na igualdade de oportunidades.' },
    { fechado: 'Terceiros e terceiras', aberto: 'Terceiros e terceiras', estado: '06.2',
      texto: 'São profissionais que atuam como prestadores de serviços e contratados ou contratadas e que, assim como os empregados e as empregadas, devem ter seus Direitos Humanos respeitados em todas as atividades realizadas.' },
    { fechado: 'Comunidades', aberto: 'Comunidades', estado: '06.3',
      texto: 'São as pessoas e os grupos que vivem ou desenvolvem suas atividades nas regiões onde a Samarco atua. A empresa busca manter um relacionamento responsável, considerando os impactos de suas operações e ações de reparação, promovendo o diálogo e o respeito aos Direitos Humanos.' },
    { fechado: 'PICTs', aberto: 'PICTs', estado: '06.4',
      texto: 'São Povos Indígenas e Comunidades Tradicionais. Esses grupos possuem identidades, culturas, modos de vida e formas de organização próprios, que devem ser respeitados. A atuação da Samarco considera seus direitos, promovendo o diálogo e o respeito às suas especificidades.' },
    { fechado: 'Defensores', aberto: 'Defensores e defensoras', estado: '06.5',
      texto: 'São pessoas ou grupos que atuam na promoção e proteção dos Direitos Humanos, contribuindo para a defesa dos direitos de indivíduos e comunidades. Sua atuação deve ser respeitada, assegurando um ambiente de diálogo e livre manifestação.' }
  ];

  var SETA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>';

  window.RENDER['m1-06'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = '';

    var itens = ITENS.map(function (it, i) {
      return '<div class="ac-item" data-i="' + i + '">' +
        '<button type="button" class="ac-cab" aria-expanded="false"><span>' + it.fechado + '</span>' + SETA + '</button>' +
        '<div class="ac-corpo" role="region"><p>' + it.texto + '</p></div></div>';
    }).join('');

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna" style="--x:200px;--y:232px;--w:660px">' +
        '<h1 class="t-titulo">Quem são os detentores de<br>Direitos Humanos?</h1>' +
        '<div style="margin-top:46px">' +
          '<p class="t-texto">Detentores de direitos são todas as pessoas ou grupos que devem ter seus Direitos Humanos respeitados.</p>' +
          '<p class="t-texto" style="margin-top:28px">Aqui na Samarco, isso inclui empregados e empregadas, terceiros e terceiras, comunidades, povos indígenas e comunidades tradicionais, além de defensores e defensoras de Direitos Humanos e do meio ambiente.</p>' +
          '<p class="t-texto" style="margin-top:28px">Esses públicos devem ser considerados nas decisões e nas atividades da empresa, contribuindo para a prevenção de impactos e para a construção de relações responsáveis.</p>' +
        '</div>' +
        '<p id="instrucao" class="t-instrucao" style="margin-top:40px">' + (ctx.concluida() ? AVANCE : INSTRUCAO) + '</p>' +
      '</div>' +
      '<div class="el" id="acordeao" style="--x:1137px;--y:233px;--w:598px">' + itens + '</div>';

    var lista = el.querySelectorAll('.ac-item');
    var vistos = {};
    var abertoAgora = -1;

    /* convite suave: o próximo box ainda não visto "respira" */
    var conv = window.Convite.criar([].slice.call(lista));
    var convidar = function (atraso) { conv.atualizar(function (k) { return vistos[k]; }, atraso); };
    if (!ctx.concluida() && !estadoId) { convidar(1600); }

    function fechar(i) {
      var it = lista[i];
      it.classList.remove('aberto');
      it.querySelector('.ac-cab').setAttribute('aria-expanded', 'false');
      it.querySelector('.ac-cab span').textContent = ITENS[i].fechado;
    }

    function abrir(i, conta) {
      if (abertoAgora >= 0) { fechar(abertoAgora); }
      var it = lista[i];
      it.classList.add('aberto');
      it.querySelector('.ac-cab').setAttribute('aria-expanded', 'true');
      it.querySelector('.ac-cab span').textContent = ITENS[i].aberto;
      abertoAgora = i;
      ctx.estado(ITENS[i].estado);
      if (conta) {
        vistos[i] = true;
        convidar(900);
        if (Object.keys(vistos).length === ITENS.length) {
          document.getElementById('instrucao').textContent = AVANCE;
          ctx.concluir();
        }
      }
    }

    lista.forEach(function (it, i) {
      it.querySelector('.ac-cab').addEventListener('click', function () {
        if (abertoAgora === i) { fechar(i); abertoAgora = -1; ctx.estado(null); }
        else { abrir(i, true); }
      });
    });

    /* Abrir direto pelo índice (06.1 a 06.5): mostra o item sem contar como atividade feita. */
    ITENS.forEach(function (it, i) { if (estadoId === it.estado) { abrir(i, false); } });
  };
})();
