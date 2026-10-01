/* Convite suave para clicar: o próximo item ainda não visto ganha um brilho que "respira" (veja .convite no estilo.css).
   Uso, dentro de uma tela:
     var conv = Convite.criar(listaDeElementos, { claro: false });
     conv.atualizar(function (i) { return jaVisto[i]; }, atrasoEmMs);   // chame depois de cada clique
     conv.parar();                                                      // apaga o brilho
   Fundo claro: passe { claro: true } (o brilho fica azul em vez de branco). */
(function () {
  'use strict';

  window.Convite = {
    criar: function (itens, opcoes) {
      var claro = !!(opcoes && opcoes.claro);
      var tempo = null;

      function limpar() {
        itens.forEach(function (e) { e.classList.remove('convite', 'convite-claro'); });
      }

      return {
        atualizar: function (jaFeito, atraso) {
          limpar();
          clearTimeout(tempo);
          tempo = setTimeout(function () {
            if (!itens.length || !document.body.contains(itens[0])) { return; }   // o aluno já saiu da tela
            for (var k = 0; k < itens.length; k++) {
              if (!jaFeito(k)) {
                itens[k].classList.add('convite');
                if (claro) { itens[k].classList.add('convite-claro'); }
                return;
              }
            }
          }, atraso == null ? 900 : atraso);
        },
        parar: function () { clearTimeout(tempo); limpar(); }
      };
    }
  };
})();
