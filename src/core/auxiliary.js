export function changeTabsToFixed() {
    var tabs = document.getElementById('navigation');
    var header = document.getElementById('header');

    var tabsScrollTop = tabs.offsetTop;
    var headerScrollTop = header.scrollHeight;

    if (window.pageYOffset>(tabsScrollTop+headerScrollTop)){
        tabs.classList.add('sticky')
    }else {
        tabs.classList.remove("sticky");
    }
}