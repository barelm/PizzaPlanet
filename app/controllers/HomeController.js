/**
 * Created by natanor on 09/08/2017.
 */
app.controller('HomeController', function () {

    init();

    function init() {

        $('.carousel').carousel({
            interval: 5000
        })
    }
});