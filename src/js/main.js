;(function($){
    $.fn.extend({
        hamburger: function(){
            $(this).click(function(){
                $(this).toggleClass('expanded');
                $('body').toggleClass('menu-visible');
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
            var screenWidth = $(window).width();
            var screenHeight = $(window).height();

            $(window).on('scroll', function(e) {
                if( (screenWidth < 768 && $(this).scrollTop() > (topOffset-options.mobileOffset)) || (screenWidth >= 768 && $(this).scrollTop() > (topOffset-options.desktopOffset) ) ) {
                    $('body').addClass(options.class);
                } else {
                    $('body').removeClass(options.class);
                }
            });

            return this;
        },
    })

    $('.nav-menu-toggle').hamburger();

    $('.footer').scrollJack({class:'inverse',mobileOffset: 90, desktopOffset: 300});

    $('.keynote').scrollJack({class:'hide-slider', mobileOffset: 90, desktopOffset: 250});

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

            var owlStage = $(e.target).find('.owl-stage');
            var owlStageX = owlStage.css('transform').split(',')[4];            

            var currentSlide = $(e.target).find('.owl-item').eq(e.item.index).find('.slide');
            var title = currentSlide.find('.title');
            var subtitle = currentSlide.find('.subtitle');
            var background = currentSlide.find('.background');

            
            if(e.type == 'translate') {
                title.removeClass('animated fadeInUp');
                subtitle.removeClass('animated fadeInUp');
            }
             else {
                 if(e.type == 'initialized' ){
                    repositionSlideBg( $(e.target) );
                 }
                title.addClass('animated fadeInUp');
                setTimeout(function(){
                    subtitle.addClass('animated fadeInUp');
                }, 1000)
            }

        }

        function repositionSlideBg (slider) {
            if($(window).width() >= 768) {
                $.each(slider.find('.owl-item'), function(i, el) {
                    var slideWidth = $(el).css('width');
                    var bg = $(el).find('.slide').find('.background');
                    var slideOffset = parseInt(slideWidth)*(i);
                    bg.css('background-position', Math.abs(slideOffset)+'px center');
                });
            }
        }

        $(window).on('resize', function() {
            repositionSlideBg(slider);
        });

    });

})(jQuery);