var $ = require('jquery');
let lastScrollTop = 0;

$(window)
    .on('scroll', function() {

        let pos   = $(this).scrollTop(),
            $body = $('body');

        if (pos > 100) {
            $body.addClass('moving');
            $body.addClass('header--on');

            if (pos > lastScrollTop) {
                if(!$body.hasClass('moving--down')) {
                    $body.addClass('moving--down');
                }
            } else {
                $body.removeClass('moving--down');
            }

            lastScrollTop = pos;

        } else {
            $body.removeClass('moving');
            $body.removeClass('header--on');
        }
    });


$(document)
    .ready(function () {

      var $menu        = $('.menu'),
          $modalButton = $('.modal-button'),
          $modal       = $('.modal'),
          $closeModal  = $('.modal__close');

      if($modalButton.length > 0) {
        $modalButton.on('click', function(){
          $('body').addClass('modal--on');
          $('.modal--' + $(this).data('target')).addClass('modal--on');
        });
      }

      if($modal.length > 0) {
        $modal.on('click', function(e){
          if($(e.target).hasClass('modal')) {
            $('body').removeClass('modal--on');
            $(this).removeClass('modal--on');
          }
        });
      }


      if($closeModal.length > 0) {
        $closeModal.on('click', function(){
          $('body').removeClass('modal--on');
          $(this).parents('.modal').removeClass('modal--on');
        });
      }

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
