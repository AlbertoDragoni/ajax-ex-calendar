$('document').ready(function(){

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);


    var dataIniziale = moment('2018-01-01');
    stampaGiorniMese(dataIniziale);

    $('.mese-succ').click(function(){
        dataIniziale.add(1, 'months');
        stampaGiorniMese(dataIniziale);
    });

    $('.mese-prec').click(function(){
        dataIniziale.subtract(1, 'months');
        stampaGiorniMese(dataIniziale);
    });

    function stampaGiorniMese (meseDaStampare){
        $('#calendar').empty();
        var giorniMese = meseDaStampare.daysInMonth();
        var nomeMese = meseDaStampare.format('MMMM');
        $('#nome-mese').text(nomeMese);
        for (var i = 1; i <= giorniMese; i++) {
            var giornoDaInserire = {
                day: i + ' ' + nomeMese
            }
            var templateFinale = templateGiorno(giornoDaInserire);
            $('#calendar').append(templateFinale);
        };
    };

});
