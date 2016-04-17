(function($){

    $(function() {

        // Closes the sidebar menu
        $("#menu-close, .menu-item").on('click', function(e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
        });

        // Opens the sidebar menu
        $("#menu-toggle").on('click', function(e) {
            e.preventDefault();
            $("#sidebar-wrapper").toggleClass("active");
        });

        // Scrolls to the selected menu item on the page
        $('a[href*=#]:not([href=#])').on('click', function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });

        // set copyright date
        var date = new Date();
        $('#copyRightYear').html(date.getFullYear('YYYY'));

        $('.portfolio-item-info').on('click touch', function( e ){

            e.preventDefault();
            var $els = $('.portfolio-item-info')
                $el = $(e.currentTarget);

            if ( $el.hasClass('active') ) {
                $els.removeClass('active');
            } else {
                $els.removeClass('active');
                $el.addClass("active");
            }


        });
        
    });

})(jQuery)
