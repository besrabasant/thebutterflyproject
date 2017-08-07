;(function($){
    $.fn.extend({
        hamburger: function(){
            $(this).click(function(){
                $(this).toggleClass('expanded');
                showMenu(this);
            })

            function showMenu(button) {
               var menuid = $(button).data('toggle');
                $(menuid).toggleClass('show');
            }

            return this;
        },
        scrollJack: function(class) {

            var self = this;
            var topOffset = $(self).offset().top;

            $(window).on('scroll', function(e) {
                if( $(this).scrollTop() > (topOffset-70) ) {
                    $('body').addClass(class);
                } else {
                    $('body').removeClass(class);
                }
            });

            return this;
        },
    })

    $('.nav-menu-toggle').hamburger();

    $('.footer').scrollJack('inverse');

    $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            animateOut: 'fadeOut',
            autoplayTimeout: 8000
        });
    });

})(jQuery);