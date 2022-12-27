if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches == true) {
    document.body.innerHTML = document.body.innerHTML.replace(/light/g, 'dark');
    document.body.innerHTML = document.body.innerHTML.replace(/white/g, 'dark');
}//VERY unstable!