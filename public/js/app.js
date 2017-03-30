// app.js
'use strict';

window.onload = function(){

    var Blog = {
        props: ['blog'],
        template:   `<div>
                        <p>{{blog.author}}</p>
                        <p>{{blog.title}}</p>
                        <p>{{blog.body}}</p>
                        <p class="display-inline-block">Tags:&nbsp;</p>
                        <div v-for="(tag, index) in blog.tags" v-bind:key="index" v-bind:tags="blog.tags">
                            <a class="button">{{tag}}</a>
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
                        "title": "Placeholder Blog",
                        "body": "Hello, World!",
                        "tags": [
                            "first",
                            "blog",
                            "hello"
                        ],
                        "author": "Jack"
                    }]
        },

        mounted(){

            this.getBlogs();
        },

        methods: {
            getBlogs: function() {
                console.log('getting blogs');
                // GET /blogs/all
                this.$http.get('/blogs/all').then(response => {
                    console.log("got blogs");
                    // get body data
                    if (response.body != {}) {
                        this.blogs = response.body;
                    }

                }, response => {
                    // error callback
                    console.log(error);
                });
            }

        }

    })
};