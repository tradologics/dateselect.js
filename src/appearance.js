/* jshint esversion: 9 */

(function(Appearance, undefined) {
    Appearance.set = (mode) => {
        Appearance.pref = ["light", "dark", "system"].indexOf(mode) > -1 ? mode : "light";
        var system_dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (Appearance.pref == "dark" || (Appearance.pref == "system" && system_dark)) {
            document.getElementsByTagName('html')[0].setAttribute('class', 'dark');
        }
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (Appearance.pref == "system") {
            document.getElementsByTagName('html')[0].setAttribute('class', e.matches ? "dark" : "light");
        }
    });
}(window.Appearance = window.Appearance || {}));
