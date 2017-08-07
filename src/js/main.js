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
                var navItems = $(menuid).find('.nav-item');

                $.each(navItems, function(i, el){
                    $(el).stop(true, true).removeClass('animateIn');
                    
                    if($(menuid).hasClass('show')) {
                        setTimeout(function(){
                            $(el).addClass('animateIn');
                        },500 + ( i * 600 ));
                    }
                });
            }

            return this;
        },
        scrollJack: function(options) {

            var self = this;
            var topOffset = $(self).offset().top;

            $(window).on('scroll', function(e) {
                if( $(this).scrollTop() > (topOffset-70) ) {
                    $('body').addClass(options.class);
                } else {
                    $('body').removeClass(options.class);
                }
            });

            return this;
        },
    })

    $('.nav-menu-toggle').hamburger();

    $('.footer').scrollJack({class:'inverse'});

    $(document).ready(function(){

        var slider = $('.owl-carousel');

        slider.owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            animateOut: 'fadeOut',
            autoplayTimeout: 8000,
            onInitialized: animateLayers,
            onTranslated: animateLayers,
            onTranslate: animateLayers
        });

        function animateLayers(e) {
            var currentSlide = $(e.target).find('.owl-item').eq(e.item.index).find('.slide');
            var title = currentSlide.find('.title');
            var subtitle = currentSlide.find('.subtitle');

            if(e.type == 'translate') {
                title.removeClass('animated fadeInUp');
                subtitle.removeClass('animated fadeInUp');
            }
             else {
                title.addClass('animated fadeInUp');
                setTimeout(function(){
                    subtitle.addClass('animated fadeInUp');
                }, 1000)
            }

        }

    });

})(jQuery);