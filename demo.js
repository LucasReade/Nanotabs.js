const tc = new NanoTabs('tabBar', 'tabContent', {showAddBtn: true});

tc.addEventListener('tab-added', (tab, content) => {
    console.log('tab added', tab, content);
    tab.querySelector('.closeBtn').addEventListener('click', () => {
        tc.removeTab(tab.id);
    }, false);
});

tc.addEventListener('tab-selected', (tab, content) => {
    console.log('tab selected', tab, content);
});

tc.addEventListener('tab-removed', () => {
    console.log('tab removed');
});

tc.addEventListener('tab-allRemoved', () => {
    console.log('all tabs removed');
});