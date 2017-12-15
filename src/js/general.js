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

        let $myCart          = $j('.mycart:not(.mycart--empty)'),
            $menuCenter      = $j('.menu-lane__center'),
            $headerContainer = $j('.header-container'),
            $searchInput     = $j('.search__input');

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


    })
    .on('resizeStop', function(e){
        // Safe window.resize
        // Dispara após o último movimento de resize parar no navegador.
    })
    .on('scrollStop', function(e){
        // Safe window.scroll
        // Dispara após o último movimento de scroll parar no navegador.
    })
    .on('ajaxComplete', function(resp){
        // Safe ajax completed
        // Dispara após completar com sucesso qualquer requisição Ajax, e trás a resposta do Ajax.
    });