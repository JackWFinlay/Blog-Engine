// app.js
'use strict';

window.onload = function () {

    var Blog = {
        props: ['blog'],
        template: '<div>\n                        <div>\n                            <p>{{blog.author}}</p>\n                            <p>{{blog.title}}</p>\n                            <p>{{blog.body}}</p>\n                        </div>\n                    </div>'
    };
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
                "tags": ["first", "blog", "hello"],
                "author": "Jack"
            }]
        },

        ready: function ready() {
            this.getBlogs();
        },

        methods: {
            getBlogs: function getBlogs() {
                var _this = this;

                // GET /blogs/all
                this.$http.get('/blogs/all').then(function (response) {

                    // get body data
                    _this.blogs = response.body;
                }, function (response) {
                    // error callback
                    console.log(error);
                });
            }

        }

    });
};