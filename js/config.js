/* Configurações gerais do curso */
window.CONFIG = {
  // true  = versão de revisão: o índice abre QUALQUER tela livremente (útil para conferir com o storyboard).
  // false = versão final: o índice só abre telas já liberadas (respeita o travamento de telas).
  MODO_REVISAO: true,

  // false = janelas mais largas que 16:9 mostram faixas azuis nas laterais (como no início).
  // true  = o fundo de cada tela se expande (precisa dos arquivos fundo-largo.jpg, guardados em ferramentas/fundos-expandidos).
  FUNDO_EXPANDIDO: true,   // só expande as telas listadas abaixo; as demais seguem com as faixas azuis
  // Fundos novos (3840x1440) já entregues. Ao colocar um novo fundo-largo.jpg, acrescente o caminho aqui.
  FUNDOS_LARGOS: [
    'assets/img/capa/fundo-largo.jpg', 'assets/img/intro/fundo-largo.jpg', 'assets/img/menu/fundo-largo.jpg',
    'assets/img/m1/t1/fundo-largo.jpg', 'assets/img/m1/t2/fundo-largo.jpg', 'assets/img/m1/t3/fundo-largo.jpg',
    'assets/img/m1/t4/fundo-largo.jpg', 'assets/img/m1/t5/fundo-largo.jpg', 'assets/img/m1/t6/fundo-largo.jpg', 'assets/img/m1/t7/fundo-largo.jpg', 'assets/img/m1/t8/fundo-largo.jpg',
    'assets/img/m1/t9/fundo-largo.jpg',
    /* Módulo 02 */
    'assets/img/m2/t1/fundo-largo.jpg',
    'assets/img/m2/t5/fundo-largo.jpg', 'assets/img/m2/t12/fundo-largo.jpg', 'assets/img/m2/t13/fundo-largo.jpg',
    'assets/img/m2/t14/fundo-largo.jpg'
  ],

  // Tamanho do "palco" (a tela do Figma). O curso se ajusta a qualquer janela mantendo essa proporção.
  LARGURA: 1920,
  ALTURA: 1080,

  // Chave usada para guardar o progresso no navegador quando não há LMS (visualização local).
  CHAVE_LOCAL: 'dh3822-samarco'
};

