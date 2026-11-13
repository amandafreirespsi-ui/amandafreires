(function () {
  var $ = function (q) { return document.querySelector(q); };
  var A = window.ARTIGOS || [];
  var ok = function (a) { return new Date(a.publicar) <= new Date(); };
  var fmt = function (d) { return new Date(d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' }); };
  var bar = $('.progress span'), nav = $('nav');
  function sc() {
    var m = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (m > 0 ? Math.min(window.scrollY / m, 1) : 0) + ')';
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', sc, { passive: true }); sc();

  var slug = document.body.getAttribute('data-slug');
  if (slug) {
    var a = A.filter(function (x) { return x.slug === slug; })[0];
    if (a && !ok(a)) {
      $('#artigo').innerHTML = '<h1>este artigo ainda não foi publicado</h1><p>volte em breve ou veja os <a href="./">outros artigos</a>.</p>';
      document.title = 'Artigo em breve | Amanda Freires';
    } else if (a) { $('#artData').textContent = fmt(a.publicar); }
  }

  var lista = $('#artLista');
  if (lista) {
    var L = A.filter(ok).sort(function (x, y) { return new Date(y.publicar) - new Date(x.publicar); });
    var temas = L.map(function (x) { return x.tema; }).filter(function (t, i, r) { return r.indexOf(t) === i; });
    function render(f) {
      lista.innerHTML = L.filter(function (x) { return f === 'todos' || x.tema === f; }).map(function (x) {
        return '<a class="art-card" href="' + x.slug + '.html"><span class="art-tema">' + x.tema + '</span><h3>' + x.titulo + '</h3><p>' + x.resumo + '</p><span class="art-ler">ler artigo →</span></a>';
      }).join('') || '<p>em breve, novos artigos por aqui.</p>';
    }
    var chips = $('#artChips');
    if (temas.length > 1) {
      chips.innerHTML = ['todos'].concat(temas).map(function (t, i) { return '<button class="faq-chip" aria-pressed="' + (i === 0) + '" data-f="' + t + '">' + t + '</button>'; }).join('');
      Array.prototype.forEach.call(chips.children, function (c) {
        c.addEventListener('click', function () {
          Array.prototype.forEach.call(chips.children, function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
          render(c.getAttribute('data-f'));
        });
      });
    }
    render('todos');
  }
})();
