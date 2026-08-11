/**
 * Postavlja temu PRE prvog paint-a, da se ne vidi blesak pogrešne teme.
 * Mora da bude izvan "use client" modula da bi se iz layout-a ubacio kao tekst.
 *
 * <html> već stiže sa data-theme="dark" iz SSR-a, pa je tamna tema
 * podrazumevana za svakog ko nema sačuvan izbor — i kad je JS isključen.
 */
export const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('sajtoskop-theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    } else if (t === 'system') {
      document.documentElement.removeAttribute('data-theme');
    }
  } catch (e) {}
})();
`;
