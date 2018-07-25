var $ = require('jquery');
let lastScrollTop = 0;

$(window)
    .on('scroll', function() {

        let pos   = $(this).scrollTop(),
            $body = $('body'),
            $banners = $('.banners-extras').offset().top;

        if (pos > 100) {
            $body.addClass('moving');

            if (pos > lastScrollTop) {
                if(!$body.hasClass('moving--down')) {
                    $body.addClass('moving--down');
                }
            } else {
                $body.removeClass('moving--down');
            }

            if(pos > $banners - 80) {
              $body.addClass('header--on');
            } else {
              $body.removeClass('header--on');
            }

            lastScrollTop = pos;

        } else {
            $body.removeClass('moving');
            $body.removeClass('header--on');
        }
    });


$(document)
    .ready(function () {

      var $menu = $('.menu');

      if($menu.length > 0) {
        $menu.on('click', function(e){
          if($(e.target).hasClass('menu__button') || $(e.target).hasClass('menu__stick')) {
            $menu.toggleClass('menu--on');
          }
        });
      }

    })
    .on('ajaxComplete', function(resp){
        // Safe ajax completed
        // Dispara após completar com sucesso qualquer requisição Ajax, e trás a resposta do Ajax.
    });
