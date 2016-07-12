$(document).ready(function() {
    //HAMBURGER MENU
    $('button').click(function() {
        $(this).toggleClass('expanded').siblings('div').slideToggle();
    });
})

