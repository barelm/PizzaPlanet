/**
 * Created by natanor on 09/08/2017.
 */
app.controller('HomeController', function () {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {

        $('.carousel').carousel({
            interval: 5000
        })
    }
});