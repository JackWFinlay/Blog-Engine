// app.js
'use strict';

window.onload = function(){

    var Blog = {
        template: ``
    }
    var blog = new Vue({
        el: "#blog-target",

        components: {
            'blog': Blog
        },

        data: {
            blogs: []
        },

        ready: function(){},

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