//thay doi css menu
$(function(){
    var $menu = $('.menu-sp>li');
    $menu.each(function(i){
        var $self = $(this),  companylist, companycontainer,
        companycontainer = $self.find('.company-list');
        companylist = $self.find('.company-list>li');
        if (9-i<companylist.length){
            var x = (companylist.length-1)*61;
            companycontainer.css('top', -x +'px');    
          
        }

        if(companylist.length>=4){
            var menuheight= companylist.length*61-1;
            var padding = (menuheight-200)/2; 
            menuheight = menuheight+'px';                
            padding= padding +'px';
            var pad='padding-top'      
            var chieucao='height'
            $self.find('.menu-product-show').each(function(){
                $(this).css({
                    'left':'360px',
                    'top':'0',
                    'width':'360px'                   
                }); 
               
                $(this).css(chieucao,menuheight);
                $(this).find('img').css(pad,padding);
            })
        }        else  if (i>=4){
                var top = companylist.length*61;
                $self.find('.menu-product-show').css({
                    'top':'-244px'
                })
            }
    })
});