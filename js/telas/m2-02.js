/* Módulo 02 · Tela 02 (e 02.1) — O que é trabalho decente? (texto + 4 itens que abrem) */
(function () {
  'use strict';
  window.RENDER = window.RENDER || {};
  var D = 'assets/img/m1/t6/';   // mesmo fundo da tela 06 do Módulo 01

  var INSTRUCAO = 'Vamos explorar mais sobre o que a Samarco entende como condições dignas? Clique nos itens ao lado para explorar mais sobre este conteúdo.';
  var AVANCE = 'Avance para a próxima tela.';

  var ITENS = [
    { nome: 'Estrutura adequada',
      texto: 'Banheiros e copas limpos, acessíveis e suficientes, acesso à água potável e à alimentação de qualidade, além de um ambiente com conforto térmico, protegido contra calor ou frio, garantindo mais segurança, bem-estar e respeito às pessoas.' },
    { nome: 'Jornada e descanso',
      texto: 'O respeito à jornada de trabalho vai além do cumprimento da legislação. Isso inclui observar limites legais e humanos, garantir pausas e intervalos para descanso, prevenir a fadiga, especialmente em atividades como as de motoristas, operadores e operadoras de máquinas, e assegurar que salários e benefícios sejam pagos corretamente e dentro dos prazos estabelecidos.' },
    { nome: 'Moradias',
      texto: 'Oferecer condições adequadas de limpeza e organização, espaço suficiente para cada pessoa, ventilação e conforto, sempre respeitando a privacidade e a dignidade de quem utiliza esses ambientes. Estabelecer regras de convivência entre os moradores para a promoção do tratamento respeitoso e não discriminatório.' },
    { nome: 'Responsabilidade com terceiros',
      texto: 'Acompanhar a atuação de fornecedores e empresas subcontratadas para garantir que ofereçam as condições dignas de trabalho esperadas pela Samarco.' }
  ];

  var SETA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>';

  window.RENDER['m2-02'] = function (t, estadoId, ctx) {
    var el = ctx.tela;
    el.className = '';

    var itens = ITENS.map(function (it, i) {
      return '<div class="ac-item" data-i="' + i + '">' +
        '<button type="button" class="ac-cab" aria-expanded="false"><span>' + it.nome + '</span>' + SETA + '</button>' +
        '<div class="ac-corpo" role="region"><p>' + it.texto + '</p></div></div>';
    }).join('');

    el.innerHTML =
      '<img class="el fundo" alt="" src="' + D + 'fundo.jpg" style="--x:0px;--y:0px;--w:1920px;--h:1080px">' +
      '<div class="el coluna" style="--x:200px;--y:276px;--w:650px">' +
        '<h1 class="t-titulo">O que é trabalho decente?</h1>' +
        '<div style="margin-top:22px">' +
          '<p class="t-texto">Trabalho decente é aquele realizado em condições dignas, seguras e respeitosas, com garantia de direitos e valorização das pessoas.</p>' +
          '<p class="t-texto" style="margin-top:30px">Na prática, isso significa oferecer uma <strong>estrutura adequada para o trabalho</strong>, respeitar a jornada e os períodos de descanso, assegurar moradias dignas quando houver alojamentos e acompanhar as condições de trabalho ao longo de toda a rede de fornecedores, incluindo empresas terceirizadas e subcontratadas.</p>' +
        '</div>' +
        '<p id="instrucao" class="t-instrucao" style="margin-top:34px">' + (ctx.concluida() ? AVANCE : INSTRUCAO) + '</p>' +
      '</div>' +
      '<div class="el" id="acordeao" style="--x:1141px;--y:310px;--w:600px">' + itens + '</div>';

    var lista = el.querySelectorAll('.ac-item');
    var vistos = {};
    var abertoAgora = -1;

    /* convite suave: o próximo item ainda não visto "respira" */
    var conv = window.Convite.criar([].slice.call(lista));
    var convidar = function (atraso) { conv.atualizar(function (k) { return vistos[k]; }, atraso); };
    if (!ctx.concluida() && !estadoId) { convidar(1600); }

    function fechar(i) {
      lista[i].classList.remove('aberto');
      lista[i].querySelector('.ac-cab').setAttribute('aria-expanded', 'false');
    }

    function abrir(i, conta) {
      if (abertoAgora >= 0) { fechar(abertoAgora); }
      lista[i].classList.add('aberto');
      lista[i].querySelector('.ac-cab').setAttribute('aria-expanded', 'true');
      abertoAgora = i;
      ctx.estado('02.1');
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

    /* Aberto pelo índice (02.1): mostra o primeiro item aberto, sem contar como atividade feita. */
    if (estadoId === '02.1') { abrir(0, false); }
  };
})();
