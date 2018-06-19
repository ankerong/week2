define([
    'jquery',
    'handlebars'
], function($, Handlebars) {
    // alert(1);
    $.ajax({
        url: '/api/index',
        dateType: 'json',
        success: function(data) {
            console.log(data);
        }
    })
});