// Tiny client-side search over /search.json (title, tags, section, text).
(function () {
  var input = document.getElementById('search-input');
  var list = document.getElementById('search-results');
  if (!input) return;
  var docs = [];

  fetch(input.getAttribute('data-index')).then(function (r) { return r.json(); }).then(function (data) {
    docs = data;
    var q = new URLSearchParams(location.search).get('q');
    if (q) { input.value = q; run(); }
  });

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function run() {
    var terms = input.value.toLowerCase().split(/\s+/).filter(Boolean);
    list.innerHTML = '';
    if (!terms.length) return;
    var hits = docs.map(function (d) {
      var title = d.title.toLowerCase();
      var meta = (d.tags.join(' ') + ' ' + d.section).toLowerCase();
      var body = d.content.toLowerCase();
      var score = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i], s = 0;
        if (title.indexOf(t) > -1) s += 10;
        if (meta.indexOf(t) > -1) s += 5;
        if (body.indexOf(t) > -1) s += 1;
        if (!s) return null; // every term must match somewhere
        score += s;
      }
      return { d: d, score: score };
    }).filter(Boolean).sort(function (a, b) { return b.score - a.score; });

    if (!hits.length) { list.innerHTML = '<li class="empty">No results.</li>'; return; }
    hits.slice(0, 30).forEach(function (h) {
      var d = h.d, li = document.createElement('li');
      li.innerHTML = '<a href="' + d.url + '">' + esc(d.title) + '</a> ' +
        '<span class="badge">' + esc(d.section) + '</span>' +
        '<p class="snippet">' + esc(d.content.slice(0, 140)) + '…</p>';
      list.appendChild(li);
    });
  }
  input.addEventListener('input', run);
})();
