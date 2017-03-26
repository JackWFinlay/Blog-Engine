// app.js
'use strict';

window.onload = function(){

    var Blog = {
        props: ['blog'],
        template:   `<div>
                        <div>
                            <p>{{blog.author}}</p>
                            <p>{{blog.title}}</p>
                            <p>{{blog.body}}</p>
                        </div>
                    </div>`
    }
    var blog = new Vue({
        el: "#blog-target",

        components: {
            'blog': Blog
        },

        data: {
            blogs: [{
                        "id": "1",
                        "title": "First Blog",
                        "body": "Hello, World!",
                        "tags": [
                            "first",
                            "blog",
                            "hello"
                        ],
                        "author": "Jack"
                    }]
        },

        ready: function(){
            this.getBlogs();
        },

        methods: {
            getBlogs: function() {
                // GET /blogs/all
                this.$http.get('/blogs/all').then(response => {

                    // get body data
                    this.blogs = response.body;

                }, response => {
                    // error callback
                    console.log(error);
                });
            }

        }

    })
};