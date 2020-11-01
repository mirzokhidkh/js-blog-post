import {Component} from "../core/component";
import {changeTabsToFixed} from "../core/auxiliary";

export class NavigationComponent extends Component {
    constructor(id) {
        super(id);
        this.tabs = [] ;
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this));
        window.onscroll = function () {changeTabsToFixed();}
    }

    registerTabs(tabs) {
        this.tabs = tabs;
    }
}

function tabClickHandler(event) {
    const {$el, tabs} = this;
    event.preventDefault();
    if (event.target.classList.contains('tab')) {
        Array.from($el.querySelectorAll('.tab')).forEach(tab => {
            tab.classList.remove('active', 'disabled')
        });

        event.target.classList.add('active', 'disabled');

        const activeTab = tabs.find(t => t.name === event.target.dataset.name);
        tabs.forEach(t => t.component.hide());
        activeTab.component.show();

    }
}

