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

    if($('.footer').length){
        $('.footer').scrollJack({class:'inverse',mobileOffset: 90, desktopOffset: 350});
    }

    if($('.keynote').length){
        $('.keynote').scrollJack({class:'hide-slider', mobileOffset: 90, desktopOffset: 250});
    }

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
            if($(window).width() < 768) {
                $.each(slider.find('.owl-item'), function(i, el) {
                    var bg = $(el).find('.slide').find('.background');
                    var posX = (bg.data('pos-x'))? bg.data('pos-x'): 'center';
                    var posY = (bg.data('pos-y'))? bg.data('pos-y'): 'center';
                    bg.css('background-position-x', posX);
                    bg.css('background-position-y', posY);
                });
            }
            if($.browser.chrome == true && $(window).width() >= 768) {
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

        if($('body.works-page').length){
            var screenWidth = $(window).width();
            var screenHeight = $(window).height();
            var worksArticles = $('section.works').find('.article');

            $.each(worksArticles, function(index, article){
                var articleBlock = $(article).find('.row');

                $(window).on('scroll', function(e) {
                    if(screenWidth>=768 && isScrolledIntoView(articleBlock) ) {
                        $(article).addClass('visible');
                    } else {
                        $(article).removeClass('visible');
                    }
                });
            });

            function isScrolledIntoView(elem) {
                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + $(window).height();

                var elemTop = $(elem).offset().top;
                var elemBottom = elemTop + $(elem).height();

                return ((elemTop <= docViewBottom));
            }
           
            
        }

        $('input').on('focus', function() {
            if(!$(this).val()){
                $(this).prev('.label').css('display','none');
                $(this).css('background-color','rgba(255, 255, 255, 0.8)');
            }
        });

        $('input').on('blur', function() {
            if(!$(this).val()){
                $(this).prev('.label').css('display','block');
                $(this).css('background-color','transparent');
            }
        });

    });

})(jQuery);