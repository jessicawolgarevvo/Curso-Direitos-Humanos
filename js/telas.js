/*
  Lista oficial de telas (Abertura + Módulo 01), na ordem do storyboard.
  - "num"     = número "Tela" do storyboard.
  - "titulo"  = título da tela no storyboard (ou provisório, quando o storyboard não traz).
  - "slide"   = número do slide no arquivo PPT do storyboard, para conferir na revisão.
  - "estados" = subtelas do storyboard (pop-up, card virado, item aberto...) que ficam DENTRO da tela.
  - "concluiAoVisitar" = a tela conta como concluída só de ser vista (não tem atividade).
  - "barra"/"voltar"/"avancar" = false esconde o item naquela tela.
*/
window.TELAS = [
  /* ---------- ABERTURA (Modulo00.pptx) ---------- */
  { id: 'a01', grupo: 'Abertura', num: '01', slide: 3,
    titulo: 'Boas-vindas ao treinamento sobre Direitos Humanos',
    tipo: 'Texto e imagem', barra: false, voltar: false, avancar: false },
  { id: 'a02', grupo: 'Abertura', num: '02', slide: 4,
    titulo: 'Toda operação começa pelas pessoas',
    tipo: 'Texto e vídeo' },
  { id: 'a03', grupo: 'Abertura', num: '03', slide: 5,
    titulo: 'Como os Direitos Humanos fazem parte do nosso dia a dia?',
    tipo: 'Menu', barra: false, voltar: false, avancar: false, concluiAoVisitar: true },

  /* ---------- MÓDULO 01 (Modulo01.pptx) ---------- */
  { id: 'm1-01', grupo: 'Módulo 01', num: '01', slide: 4,
    titulo: 'O que está por trás de cada decisão?',
    tipo: 'Texto e imagem' },
  { id: 'm1-02', grupo: 'Módulo 01', num: '02', slide: 5,
    titulo: 'Mas, afinal, o que são os Direitos Humanos?',
    tipo: 'Texto e imagem clicável (pop-up)',
    estados: [ { id: '02.1', rotulo: 'Pop-up com as características', slide: 6 } ] },
  { id: 'm1-03', grupo: 'Módulo 01', num: '03', slide: 7,
    titulo: 'Princípios orientadores da ONU',
    tipo: 'Texto + cards que viram',
    estados: [ { id: '03.1', rotulo: 'Cards virados', slide: 8 } ] },
  { id: 'm1-04', grupo: 'Módulo 01', num: '04', slide: 9,
    titulo: 'Por que esse tema é tão importante para a Samarco?',
    tipo: 'Texto e podcast' },
  { id: 'm1-05', grupo: 'Módulo 01', num: '05', slide: 10,
    titulo: 'A nossa Política de Direitos Humanos',
    tipo: 'Texto + imagem' },
  { id: 'm1-06', grupo: 'Módulo 01', num: '06', slide: 11,
    titulo: 'Quem são os detentores de Direitos Humanos?',
    tipo: 'Texto + acordeão (5 boxes)',
    estados: [
      { id: '06.1', rotulo: 'Próprios e próprias',    slide: 12 },
      { id: '06.2', rotulo: 'Terceiros e terceiras',  slide: 13 },
      { id: '06.3', rotulo: 'Comunidades',            slide: 14 },
      { id: '06.4', rotulo: 'PICTs',                  slide: 15 },
      { id: '06.5', rotulo: 'Defensores e defensoras', slide: 16 }
    ] },
  { id: 'm1-07', grupo: 'Módulo 01', num: '07', slide: 17,
    titulo: 'O que é Due Diligence em Direitos Humanos?',
    tipo: 'Texto + infográfico interativo (4 etapas)',
    estados: [ { id: '07.1', rotulo: 'Etapas vistas (frase "Avance para a próxima tela.")', slide: 18 } ] },
  { id: 'm1-08', grupo: 'Módulo 01', num: '08', slide: 19,
    titulo: 'Temas Prioritários',
    tipo: 'Texto + infográfico interativo (9 temas)',
    estados: [ { id: '08.1', rotulo: 'Nome de um tema sobre o ícone (2º slide "08")', slide: 20 } ] },
  { id: 'm1-09', grupo: 'Módulo 01', num: '09', slide: 21,
    titulo: 'O que vimos aqui?',
    tipo: 'Texto + botão "Menu" (volta ao menu)', avancar: false },

  /* ---------- MÓDULO 02 (Modulo02.pptx) ---------- */
  { id: 'm2-01', grupo: 'Módulo 02', num: '01', slide: 4, voltarPara: 'a03',
    titulo: 'Da teoria à prática',
    tipo: 'Texto e imagem' },
  { id: 'm2-02', grupo: 'Módulo 02', num: '02', slide: 5,
    titulo: 'O que é trabalho decente?',
    tipo: 'Texto + ícones clicáveis (4 itens)',
    estados: [ { id: '02.1', rotulo: 'Itens abertos (conteúdo dos 4 ícones)', slide: 6 } ] },
  { id: 'm2-03', grupo: 'Módulo 02', num: '03', slide: 7,
    titulo: 'Caso 1: Trabalho decente',
    tipo: 'Texto e vídeo (avança ao fim do vídeo)' },
  { id: 'm2-04', grupo: 'Módulo 02', num: '04', slide: 8,
    titulo: 'Diante dessa situação, qual é a atitude mais adequada?',
    tipo: 'Texto + quiz (2 alternativas)',
    estados: [ { id: '04.1', rotulo: 'Vídeo de feedback da escolha', slide: 9 } ] },
  { id: 'm2-05', grupo: 'Módulo 02', num: '05', slide: 10,
    titulo: 'Respeito: um compromisso inegociável',
    tipo: 'Texto + imagem clicável (pop-up)',
    estados: [ { id: '05.1', rotulo: 'Pop-up: o papel da liderança', slide: 11 } ] },
  { id: 'm2-06', grupo: 'Módulo 02', num: '06', slide: 12,
    titulo: 'Exemplos',
    tipo: 'Texto + carrossel (5 definições)',
    estados: [
      { id: '06.1', rotulo: 'Assédio moral',          slide: 13 },
      { id: '06.2', rotulo: 'Assédio sexual',         slide: 14 },
      { id: '06.3', rotulo: 'Importunação sexual',    slide: 15 },
      { id: '06.4', rotulo: 'Discriminação',          slide: 16 }
    ] },
  { id: 'm2-07', grupo: 'Módulo 02', num: '07', slide: 17,
    titulo: 'Caso 2: Respeito e dignidade',
    tipo: 'Texto e vídeo (avança ao fim do vídeo)' },
  { id: 'm2-08', grupo: 'Módulo 02', num: '08', slide: 18,
    titulo: 'Diante dessa situação, qual é a atitude mais adequada?',
    tipo: 'Texto + quiz (2 alternativas)',
    estados: [ { id: '08.1', rotulo: 'Vídeo de feedback da escolha', slide: 19 } ] },
  { id: 'm2-09', grupo: 'Módulo 02', num: '09', slide: 20,
    titulo: 'Respeito às comunidades anfitriãs',
    tipo: 'Texto + cards que viram (4 cards)',
    estados: [ { id: '09.1', rotulo: 'Cards virados', slide: 21 } ] },
  { id: 'm2-10', grupo: 'Módulo 02', num: '10', slide: 22,
    titulo: 'Caso 3: Respeito à convivência e à comunidade',
    tipo: 'Texto e vídeo (avança ao fim do vídeo)' },
  { id: 'm2-11', grupo: 'Módulo 02', num: '11', slide: 23,
    titulo: 'Diante dessa situação, qual é a atitude mais adequada?',
    tipo: 'Texto + quiz (2 alternativas)',
    estados: [ { id: '11.1', rotulo: 'Vídeo de feedback da escolha', slide: 24 } ] },
  { id: 'm2-12', grupo: 'Módulo 02', num: '12', slide: 25,
    titulo: 'A responsabilidade na gestão ou fiscalização de contrato',
    tipo: 'Texto e podcast' },
  { id: 'm2-13', grupo: 'Módulo 02', num: '13', slide: 26,
    titulo: 'Canais da Samarco', tituloProvisorio: true,
    tipo: 'Texto' },
  { id: 'm2-14', grupo: 'Módulo 02', num: '14', slide: 27,
    titulo: 'Canal de Ética Samarco',
    tipo: 'Texto + imagem' },
  { id: 'm2-15', grupo: 'Módulo 02', num: '15', slide: 28,
    titulo: 'Ouvidoria Social Samarco',
    tipo: 'Texto + imagem' },
  { id: 'm2-16', grupo: 'Módulo 02', num: '16', slide: 29,
    titulo: 'O que vimos aqui?',
    tipo: 'Texto + vídeo (fecha o treinamento)', avancar: false }
];

/* Nome completo de cada grupo (usado no índice) */
window.GRUPOS = {
  'Abertura':  { nome: 'Abertura',  arquivo: 'Modulo00' },
  'Módulo 01': { nome: 'Módulo 01 — Os Direitos Humanos na Samarco', arquivo: 'Modulo01' },
  'Módulo 02': { nome: 'Módulo 02 — Decisões que fazem a diferença', arquivo: 'Modulo02' }
};

