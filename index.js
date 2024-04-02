let postArray = [];
const body = document.getElementById('body');
const title = document.getElementById('title');
const form = document.getElementById('submit');


fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(res => res.json())
    .then(data => {
        
        if(postArray) postArray = data.slice(0, 5);
        renderPosts();
});

if (form) {
    form.addEventListener('click', (e) => {
        e.preventDefault();
    
        if(title.value || body.value) {
            const data = {title: '', body: ''};
        
            if (title.value) {
                data.title = title.value;
                clearInput(title);
            };
    
            if (body.value) {
                data.body = body.value;
                clearInput(body);
            };
            
            postData(data);
        }
    });
};

function clearInput(input){
    if(input.value) input.value = '';
};

function postData(dataToPost){
    const options = {
        method: 'POST',
        body: JSON.stringify(dataToPost),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
    .then(res => res.json())
    .then(data => {
        postArray?.unshift(data);
        renderPosts();
    })
};

function renderPosts(){
    let html = "";
    for (let post of postArray) {
        html += `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <hr />
        `
    };
    document.getElementById("blog-list").innerHTML = html;
}