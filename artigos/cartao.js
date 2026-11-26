window.cardArtigo = function (a, base) {
  var d = new Date(a.publicar).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'America/Sao_Paulo' }).replace(/\./g, '').toUpperCase();
  return '<a class="art-card" href="' + base + a.slug + '.html"><span class="art-cat">' + a.tema + '</span><h3>' + a.titulo + '</h3><p>' + a.resumo + '</p><span class="art-rodape"><time>' + d + '</time><span>→</span></span></a>';
};
