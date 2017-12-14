$j(document)
    .ready(function () {
        // document.ready
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