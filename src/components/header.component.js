import {Component} from "../core/component";

export class HeaderComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.$el.addEventListener('click', HeaderBtnClickHandler.bind(this))
    }

    show() {

    }

    hide() {

    }
}

function HeaderBtnClickHandler(event) {
    event.preventDefault();
    const tabs = document.getElementById('navigation')
    if (event.target.classList.contains('header-start')) {
        tabs.scrollIntoView();
    }
}


