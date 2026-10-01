/*
  Conversa com o LMS usando SCORM 1.2.
  Se o curso for aberto fora de um LMS (visualização local), o progresso é guardado no próprio
  navegador, para que tudo possa ser testado do mesmo jeito.
*/
(function () {
  'use strict';

  var api = null;
  var inicio = Date.now();
  var finalizado = false;

  /* Sobe pelas janelas procurando o objeto "API" do LMS.
     Janelas de outro domínio bloqueiam a leitura (erro de segurança): nesse caso ignoramos e seguimos. */
  function procurarApi(janela) {
    var voltas = 0;
    while (janela && voltas < 10) {
      try { if (janela.API) { return janela.API; } } catch (e) { /* outro domínio */ }
      try {
        if (!janela.parent || janela.parent === janela) { break; }
        janela = janela.parent;
      } catch (e) { break; }
      voltas++;
    }
    return null;
  }

  /* ----- armazenamento local (sem LMS) ----- */
  function lerLocal(chave) {
    try {
      var tudo = JSON.parse(localStorage.getItem(window.CONFIG.CHAVE_LOCAL) || '{}');
      return tudo[chave] || '';
    } catch (e) { return ''; }
  }
  function gravarLocal(chave, valor) {
    try {
      var tudo = JSON.parse(localStorage.getItem(window.CONFIG.CHAVE_LOCAL) || '{}');
      tudo[chave] = String(valor);
      localStorage.setItem(window.CONFIG.CHAVE_LOCAL, JSON.stringify(tudo));
      return true;
    } catch (e) { return false; }
  }

  /* tempo da sessão no formato do SCORM 1.2: HHHH:MM:SS.SS */
  function tempoSessao() {
    var s = Math.round((Date.now() - inicio) / 1000);
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), seg = s % 60;
    function d(n, t) { n = String(n); while (n.length < t) n = '0' + n; return n; }
    return d(h, 4) + ':' + d(m, 2) + ':' + d(seg, 2) + '.00';
  }

  window.Scorm = {
    lms: false,

    iniciar: function () {
      try {
        api = procurarApi(window);
        if (!api && window.opener) { api = procurarApi(window.opener); }
        if (api) { this.lms = String(api.LMSInitialize('')) === 'true'; }
      } catch (e) { this.lms = false; }
      if (!this.lms) { api = null; }
      return this.lms;
    },

    obter: function (chave) {
      if (this.lms) { return String(api.LMSGetValue(chave) || ''); }
      return lerLocal(chave);
    },

    definir: function (chave, valor) {
      if (this.lms) { return String(api.LMSSetValue(chave, String(valor))) === 'true'; }
      return gravarLocal(chave, valor);
    },

    salvar: function () {
      if (this.lms) { api.LMSCommit(''); }
    },

    /* Marca o status sem nunca "desconcluir" um curso já concluído. */
    status: function (novo) {
      var atual = this.obter('cmi.core.lesson_status');
      if (atual === 'completed' || atual === 'passed') { return atual; }
      if (novo && novo !== atual) { this.definir('cmi.core.lesson_status', novo); }
      return novo || atual;
    },

    finalizar: function () {
      if (finalizado) { return; }
      finalizado = true;
      var concluido = this.obter('cmi.core.lesson_status') === 'completed';
      this.definir('cmi.core.session_time', tempoSessao());
      this.definir('cmi.core.exit', concluido ? '' : 'suspend');
      this.salvar();
      if (this.lms) { api.LMSFinish(''); }
    }
  };
})();
