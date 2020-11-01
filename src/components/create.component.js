import {Component} from "../core/component";
import {Form} from "../core/form"
import {Validators} from "../core/validators";
import {apiService} from "../services/api.service";


export class CreateComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this));

        this.form = new Form(this.$el, {
            title: [Validators.required],
            fulltext: [Validators.required, Validators.minLength(10)]
        });

    }

    onShow() {
        super.onShow();
    }

    onHide() {
        super.onHide();
        this.$el.classList.remove('was-validated')
    }

    show() {
        super.show();

    }

    hide() {
        super.hide();
    }
}

async function submitHandler(event) {
    event.preventDefault();

    if (this.form.isValid()) {
        const formData = {
            type: this.$el.type.value,
            date: new Date().toLocaleDateString(),
            ...this.form.value()
        }

        await apiService.createPost(formData);
        alert('Record created in database')
        this.form.clear();
    } else {
        this.$el.classList.add('was-validated')
    }
}