exports = module.exports = function() {
    return '<div class="top-nav">' +
        '<nav class="navbar navbar-default">' +
            '<div class="container-fluid">' +
                '<div class="navbar-header">' +
                    '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-opt">' +
                        '<span class="sr-only">Toggle navigation</span>' +
                        '<span class="icon-bar"></span>' +
                        '<span class="icon-bar"></span>' +
                        '<span class="icon-bar"></span>' +
                    '</button>' +
                    '<a class="navbar-brand" href="/">WhatYaListen</a>' +
                '</div>' +
                '<div id="navbar-opt" class="navbar-collapse collapse">' +
                    '<ul class="nav navbar-nav">' +
                        '<< replace_links >>' +
                    '</ul>' +
                '</div>' +
            '</div>' +
        '</nav>' +
    '</div>';
};