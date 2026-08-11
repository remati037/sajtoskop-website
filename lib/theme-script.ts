/**
 * Postavlja temu PRE prvog paint-a, da se na tamnoj temi ne vidi beli blesak.
 * Mora da bude izvan "use client" modula da bi se iz layout-a ubacio kao tekst.
 */
export const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('sajtoskop-theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
})();
`;
