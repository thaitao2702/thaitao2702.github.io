$(function(){
    //Ajax
    var header_btn = $('.header-btn');
    var footer_btn = $('.footer-btn');
    var header_email = $('.header-email');
    var footer_email = $('.footer-email');
    var footer_name = $('.name');
    header_btn.on('click',function(){
        $.post("http://59e57ad3f99ad90012268277.mockapi.io/event",
        {
          email: $('.header-email').val()     
        },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });
    footer_btn.on('click',function(){
        $.post("http://59e57ad3f99ad90012268277.mockapi.io/event",
        {
          name: $('.name').val(),
          email: $('.footer-email').val()         
        },
        function(data,status){
            alert("Data: " + data + "\nStatus: " + status);
        });
    });

    //galery
    $.fn.slide= function(setting){
        var defaults = {
                time : 5000,
                direction : 1,
                animtime: 300
        };
        var settings = $.extend(defaults, setting);
        var slidewrapper = $(this),
            slide = slidewrapper.find('ul'),
            items = slide.find('li'),
            current = 1,
            first   = items.filter(':first'),
            last    = items.filter(':last'),
            len     = items.length,                        
            triggers = slidewrapper.find('.btn');
            total_elems = items.length+2;
            w_w		= $(window).innerWidth();
          
            
            
        var setWidths	= function(){                                      
					/*
					the width of the slider is the windows width
					times the total number of elements in the slider
					 */
                    var allitems = slide.find('li');
					var slide_w	= w_w * total_elems;
					slide.width(slide_w + 'px');
					//each element will have a width = windows width
                    allitems.width(w_w + 'px');
                    var slide_height = slide.find('img').height();                    
                    slidewrapper.height(slide_height+'px');                     
	    }
        
            

        var show_slide = function(direction,w_w){           
            slide.animate({ left: "+=" + (-w_w * direction)+'px' },settings.animtime, function() {
                var previous = current-1;
                current += direction;                  
                
                /**
                 * we're cycling the slider when the the value of "current"
                 * variable (after increment/decrement) is 0 or when it exceeds
                 * the initial gallery length
                 */
                cycle = !!(current === 0 || current > len);

                if (cycle) {
                    /* we switched from image 1 to 4-cloned or
                     from image 4 to 1-cloned */
                    current = (current === 0)? len : 1;
                    slide.css({left:  -w_w * current });
                    
                }                             
            });
        };
        var picTimer = setInterval(function() {
                    show_slide(settings.direction,w_w);
                },
                settings.time*10);
        return this.each(function(){ 
            slide.css({'left':-w_w}); 
            setWidths();          
            
            /* 1. Cloning first and last item */
            first.before(last.clone(true));            
            last.after(first.clone(true));
            /* thay doi width khi window resize */
            $(window).resize(function(){
                w_w	= $(window).innerWidth();                
                setWidths();
                slide.css('left', -current*w_w+'px');
            });


            /* 2. Set button handlers */
            triggers.on('click', function() {
                if (slide.is(':not(:animated)')) {

                    var cycle = false;
                    settings.direction = ($(this).hasClass('prev'))? -1 : 1;
                    /* in the example buttons have id "prev" or "next" */
                    show_slide(settings.direction,w_w);
                }
                clearInterval(picTimer);
                picTimer = setInterval(function() {
                            show_slide(settings.direction,w_w);
                        },
                        settings.time*10);
            });

           
            /* hover show arrows*/           

            
        });
    };

    $('.slide-wrapper').slide();

    //countdown timer
    var countDownDate = new Date("Jan 1, 2018 00:00:00").getTime();
    countdowntime();
    function countdowntime() {
        
          // Get todays date and time
          var now = new Date().getTime();
        
          // Find the distance between now an the count down date
          var distance = countDownDate - now;
        
          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24)) <10? "0" +Math.floor(distance / (1000 * 60 * 60 * 24)):Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))<10 ? "0"+Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)): Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))<=10? "0"+Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)):Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000)<10? "0"+Math.floor((distance % (1000 * 60)) / 1000):Math.floor((distance % (1000 * 60)) / 1000);
         
           
          $('.days').html("<span class='countdown-text'>DAYS </span>" +days);
          $('.hours').html("<span class='countdown-text'>HOURS </span>" +hours);
          $('.minutes').html("<span class='countdown-text'>MINUTES </span>" +minutes);
          $('.seconds').html("<span class='countdown-text'>SECONDS </span>" +seconds);        
        }
    
    // Update the count down every 1 second
    var x = setInterval(countdowntime, 1000);
})