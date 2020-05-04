class tabbable {
    events = [];
    constructor(tabBar_id, tabContent_id, opts = {}) {
        this.tabBar = document.getElementById(tabBar_id);
        this.tabContent = document.getElementById(tabContent_id);
        this.tabTemplate = this.tabBar.querySelector('template');
        this.contentTemplate = this.tabContent.querySelector('template');
        
        this.tabBar.setAttribute('role', 'tablist');
        this.tabBar.setAttribute('aria-label', 'Tabs list');

        this.tabList = document.createElement('div');
        this.tabList.setAttribute('role', 'tablist');
        this.tabList.setAttribute('aria-label', 'Tabs list');
        this.tabList.classList.add('tabbable_tabList');
        let tabFocus = 0;
        this.tabList.addEventListener('keydown', e => {
            const tabs = this.tabList.querySelectorAll('[role="tab"]');
            if (e.keyCode === 39 || e.keyCode === 37) {
                tabs[tabFocus].setAttribute('tabindex', -1);
                if (e.keyCode === 39) {
                    tabFocus++;
                    if (tabFocus >= tabs.length) {
                        tabFocus = 0;
                    }
                } else if (e.keyCode === 37) {
                    tabFocus--;
                    if (tabFocus < 0) {
                      tabFocus = tabs.length - 1;
                    }
                }
                tabs[tabFocus].setAttribute("tabindex", 0);
                tabs[tabFocus].focus();
            }
        });

        this.tabBar.appendChild(this.tabList);

        let addBtn = document.createElement('button');
        addBtn.addEventListener('click', () => {
            this.add({selected: true});
        });
        addBtn.textContent = '+';
        addBtn.classList.add('tabbable_addBtn');

        if(opts.hasOwnProperty('showAddBtn')){
            if(opts.showAddBtn){
                this.tabBar.appendChild(addBtn);
            }
        } else {
            this.tabBar.appendChild(addBtn);
        } 
    }
    get count() {
        return this.tabList.querySelectorAll('[role="tab"]').length;
    }
    add(opts = {}) {
        const uId= ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));        
        let newT = this.tabTemplate.content.cloneNode(true);
        let newC = this.contentTemplate.content.cloneNode(true);
        // new tab
        let newTab = newT.firstChild;
        newTab.id  = `t_${uId}`;
        newTab.setAttribute('role', 'tab');
        newTab.setAttribute('aria-selected', false);
        newTab.setAttribute('aria-controls', `c_${uId}`);
        newTab.setAttribute('tabindex', 1);
        newTab.addEventListener('click', (e) => {
            this.select(`t_${uId}`);
        });

        // new content
        let newContent = newC.firstChild;
        newContent.id  = `c_${uId}`;
        newContent.setAttribute('role', 'tabpanel');
        newContent.setAttribute('tabindex', 0);
        newContent.setAttribute('aria-labelledby', `t_${uId}`);
        newContent.setAttribute('hidden', true);
        
        this.tabList.appendChild(newT);
        this.tabContent.appendChild(newC);
        this.events.filter(e => e.event === 'add').forEach(e => e.func(newTab, newContent));

        this.select(`t_${uId}`, true);
    }
    remove(t_id) {
        event.stopPropagation();
        const targetTab = this.tabList.querySelector(`#${t_id}`);
        const targetContent = this.tabContent.querySelector(`[aria-labelledby="${t_id}"]`);

        if (targetTab.getAttribute('aria-selected') === 'true') {
            //select next tab
            if(targetTab.nextSibling){
                this.select(targetTab.nextSibling.id);
            } else if (targetTab.previousSibling) {
                this.select(targetTab.previousSibling.id);
            }
        }

        this.tabList.removeChild(targetTab);
        this.tabContent.removeChild(targetContent);

        this.events.filter(e => e.event === 'remove').forEach(e => e.func());

        if(this.count === 0) {
            this.events.filter(e => e.event === 'allRemoved').forEach(e => e.func());
        }
    }
    /**
     * 
     * @param {string} t_id id of the tab you want to select
     * @param {boolean} muffleEvent send selected event after tab selected?
     */
    select(t_id, muffleEvent = false) {
        const targetTab = this.tabList.querySelector(`#${t_id}`);
        const targetContent = this.tabContent.querySelector(`[aria-labelledby="${t_id}"]`);

        if (targetTab.getAttribute('aria-selected') !== 'true')  {
            this.tabList.querySelectorAll('[aria-selected="true"]').forEach(t => t.setAttribute("aria-selected", false));
            targetTab.setAttribute("aria-selected", true);
    
            this.tabContent.querySelectorAll('[role="tabpanel"]').forEach(p => p.setAttribute("hidden", true));
            targetContent.removeAttribute('hidden');
            
            if (!muffleEvent) this.events.filter(e => e.event === 'select').forEach(e => e.func(targetTab, targetContent));
        }
    }
    /**
     * 
     * @param {'select'|'add'|'remove'|'allRemoved'} event name of event
     * @param {void} func event function
     */
    addEventListener(event, func){
        this.events.push({event, func})
    }
}