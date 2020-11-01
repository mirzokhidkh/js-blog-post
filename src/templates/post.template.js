export function renderPost(post, option = {}) {
    const tag = post.type === 'news'
        ? `<span class="badge badge-pill  badge-info float-right">News</span>`
        : `<span class="badge badge-pill  badge-secondary float-right">Note</span>`;

    const favorites = JSON.parse(localStorage.getItem('posts-favorites')) || [];
    const candidate = favorites.find(p => p.id === post.id);

    const button = candidate
        ? ` <button class="btn-sm btn-danger" 
 data-id="${post.id}" data-title="${post.title}">Delete</button>`
        : ` <button class="btn-sm btn-primary" 
 data-id="${post.id}" data-title="${post.title}">Save</button>`;

    return `
<div class="card mb-3 ">
                <div class="card-header">
                    <h3 class="">${post.title}</h3>
                    <h5>${tag}</h5>
                </div>
                <div class="card-body">
                   <p>${post.fulltext}</p>
                </div>
                <div class="card-footer">
                    <span>${post.date}</span>
                   ${option.withButton ? button : ''}
                </div>
            </div>
`
}