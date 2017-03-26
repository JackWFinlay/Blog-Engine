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
                "title": "Placeholder Blog",
                "body": "Hello, World!",
                "tags": ["first", "blog", "hello"],
                "author": "Jack"
            }]
        },

        mounted: function mounted() {

            this.getBlogs();
        },


        methods: {
            getBlogs: function getBlogs() {
                var _this = this;

                console.log('getting blogs');
                // GET /blogs/all
                this.$http.get('/blogs/all').then(function (response) {
                    console.log("got blogs");
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