import {Component} from "../core/component";
import {renderPost} from "../templates/post.template";
import {apiService} from "../services/api.service";

export class FavoriteComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this));
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('posts-favorites'));
        const html = renderList(favorites);
        this.$el.insertAdjacentHTML('afterbegin', html)


    }

    onHide() {
        this.loader.hide();
        this.$el.innerHTML = '';
    }

    show() {
        super.show();
    }

    hide() {
        super.hide();
    }
}


async function linkClickHandler(event) {
    event.preventDefault();

    if (event.target.classList.contains('js-link')) {
        const postId = event.target.dataset.id;
        this.$el.innerHTML = '';
        this.loader.show();
        const post = await apiService.fetchPostId(postId);
        this.loader.hide();
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false}));
    }

}

function renderList(list = []) {
    if (list && list.length) {
        return `
        <ul class="">
        ${list.map(i => `<li><a href="#" class="js-link" data-id="${i.id}">${i.title}</a></li>`).join(' ')}
        </ul>
        `
    }

    return `<p class="text-center">You haven't added anything yet</p>`

}