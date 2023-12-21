$(e => {
    //Number counter
    let initNumbers = true;
    $(window).scroll(function() {
        var s = $(window).scrollTop();
    
        if (s > 1400 && initNumbers) {
            console.log('start counters')
            let stat1 = $('#stat1');
            $({someValue: 0}).animate({someValue: 120}, {
                duration: 3000,
                easing:'swing', // can be anything
                step: function() { // called on every step
                    // Update the element's text with rounded-up value:
                    stat1.text(Math.round(this.someValue) + 'm');
                }
            });

            let stat2 = $('#stat2');
            $({someValue: 0}).animate({someValue: 10000}, {
                duration: 3000,
                easing:'swing', // can be anything
                step: function() { // called on every step
                    // Update the element's text with rounded-up value:
                    stat2.text(Math.round(this.someValue));
                }
            });

            let stat3 = $('#stat3');
            $({someValue: 0}).animate({someValue: 240}, {
                duration: 3000,
                easing:'swing', // can be anything
                step: function() { // called on every step
                    // Update the element's text with rounded-up value:
                    stat3.text(Math.round(this.someValue));
                }
            });

            initNumbers = false;
        }
    });

    //Carousel
    $('.carousel').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1, 
        arrows: false,
    });

    //Gestion du menu mobile/desktop
    $('.burger-icon').on('click', e => {
        e.preventDefault();
        e.stopPropagation();

        $('#nav-small-device').css('display', 'flex');
    });

    $(document).on('click', function (e) {
        if ($(e.target).closest("#nav-small-device").length === 0) {
            $("#nav-small-device").hide();
        }
    });
});