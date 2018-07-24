let lastScrollTop = 0;

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



    })
    .on('ajaxComplete', function(resp){
        // Safe ajax completed
        // Dispara após completar com sucesso qualquer requisição Ajax, e trás a resposta do Ajax.
    });
