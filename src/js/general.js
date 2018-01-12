var lastScrollTop = 0;

$j(window)
    .on('scroll', function() {

        let pos   = $j(this).scrollTop(),
            $body = $j('body');

        if (pos > 100) {
            $body.addClass('moving');

            if (pos > lastScrollTop) {
                if(!$body.hasClass('moving--down')) {
                    $body.addClass('moving--down');
                }
            } else {
                $body.removeClass('moving--down');
            }

            lastScrollTop = pos;

        } else {
            $body.removeClass('moving')
        }
    });


$j(document)
    .ready(function () {

        let $myCart           = $j('.mycart:not(.mycart--empty)'),
            $menuCenter       = $j('.menu-lane__center'),
            $headerContainer  = $j('.header-container'),
            $searchInput      = $j('.search__input'),
            $jointsalesRow    = $j('.jointsales__row'),
            $seeMore          = $j('.see-more'),
            $priceClose       = $j('.price-floater__close'),
            $parent0          = $j('.categories .li--0.parent'),
            $menuBtn          = $j('.menu--mobile__btn'),
            $menuEnv          = $j('.menu--mobile__env'),
            $btnBack          = $j('.btn--back');


        if($myCart.length > 0) {

            $myCart.on('mouseenter', function(){
                $headerContainer.addClass('mask--on');
            });

            $myCart.on('mouseleave', function(){
                $headerContainer.removeClass('mask--on');
            });
        }

        if($menuCenter.length > 0) {

            $menuCenter.on('mouseenter', function(){
                $headerContainer.addClass('mask--on');
            });

            $menuCenter.on('mouseleave', function(){
                $headerContainer.removeClass('mask--on');
            });
        }

        if($searchInput.length > 0) {
            $searchInput.on('focus', function() {
                $j(this).parents('.search').addClass('search--on');
            });

            $searchInput.on('blur', function() {
                $j(this).parents('.search').removeClass('search--on');
            });
        }

        if($jointsalesRow.length > 0) {
            let $row;

            $j.each($jointsalesRow, function() {
                $j(this).append('<div class="jointsales__values"></div>');
            });


            $j.each($j('.jointsales__values'), function() {
                $row = $j(this).parents('.jointsales__row');

                $row.find('.comprando-junto').after($row.find('.jointsales__payments'));
                $j(this).append($row.find('.jointsales__totals'));
                $j(this).append($row.find('.jointsales__action'));
            });
        }

        if($seeMore.length > 0) {
            $seeMore.on('click', function(){
                $j('html, body').animate({scrollTop: $j('.product__description').offset().top - 100}, 500);
            });
        }

        if($priceClose.length > 0) {
            $priceClose.on('click', function(){
                if($j(this).parents('.price-floater').hasClass('price-floater--closed')) {
                    $j(this).parents('.price-floater').removeClass('price-floater--closed')
                } else {
                    $j(this).parents('.price-floater').addClass('price-floater--closed')
                }

            });
        }

        if($parent0.length > 0) {
            $parent0.on('click', function(e){
                if($j(window).width() < 1200) {

                    if($j(e.target).hasClass('li--0')) {
                        if($j(this).hasClass('li--0open')) {
                            $j(this).removeClass('li--0open');
                            $j(this).find('.box--1').slideUp(150);
                        } else {
                            $j(this).addClass('li--0open');
                            $j(this).find('.box--1').slideDown(150);
                        }
                    }

                }
            });
        }

        if($menuBtn.length > 0) {
            $menuBtn.on('click', function() {
                if($j(window).width() < 1200) {
                    $j('body').addClass('modal--on');
                    $menuEnv.addClass('modal--left');
                }
            });
        }


        if($btnBack.length > 0) {
            $btnBack.on('click', function() {
                if($j(window).width() < 1200) {
                    $j('body').removeClass('modal--on');
                    $j(this).parent().removeClass('modal--left');
                    $j(this).parent().removeClass('modal--right');
                }
            });
        }

    })
    .on('resizeStop', function(e){
        // Safe window.resize
        // Dispara após o último movimento de resize parar no navegador.
    })
    .on('scrollStop', function(e){
        if($j('.price-floater').length > 0) {

            if($j(window).scrollTop() > ($j('.product-essential').offset().top + ($j('.product-essential').height() / 2)) && $j(window).scrollTop() < $j('.footer-container').offset().top - 300) {
                $j('.price-floater').addClass('price-floater--on');
            } else {
                $j('.price-floater').removeClass('price-floater--on');
            }

        }
    })

    .on('ajaxComplete', function(resp){
        // Safe ajax completed
        // Dispara após completar com sucesso qualquer requisição Ajax, e trás a resposta do Ajax.
    });
