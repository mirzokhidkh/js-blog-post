import {Component} from "../core/component";
import {apiService} from "../services/api.service";
import {TransformService} from "../services/transform.service";
import {renderPost} from "../templates/post.template";

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this));
    }

    async onShow() {

        this.loader.show();
        const data = await apiService.fetchPost();
        const posts = TransformService.objectToArray(data);
        const html = posts.map(post => renderPost(post, {withButton: true}));
        this.loader.hide();
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));

    }

    onHide() {
        this.loader.hide();
        this.$el.innerText = '';
    }

    show() {
        super.show();
    }

    hide() {
        super.hide();
    }
}

function buttonHandler(event) {
    const $el = event.target;
    const id = $el.dataset.id;
    const title = $el.dataset.title;

    if (id) {
        let favorites = JSON.parse(localStorage.getItem('posts-favorites')) || [];
        const candidate = favorites.find(p => p.id === id);

        if (candidate) {

            $el.textContent = 'Save';
            $el.classList.add('btn-primary');
            $el.classList.remove('btn-danger');
            favorites = favorites.filter(p => p.id !== id);
        } else {

            $el.classList.add('btn-danger');
            $el.classList.remove('btn-primary');
            $el.textContent = 'Delete'
            favorites.push({id, title})
        }
        localStorage.setItem('posts-favorites',JSON.stringify(favorites))
    }

}