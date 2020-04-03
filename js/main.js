$('document').ready(function(){

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);


    var dataIniziale = moment('2018-01-01');
    console.log(dataIniziale);

    var giorniMese = dataIniziale.daysInMonth();
    console.log(giorniMese);

    var nomeMese = dataIniziale.format('MMMM');
    console.log(nomeMese);

    for (var i = 1; i <= giorniMese; i++) {
        var giornoDaInserire = {
            day: i + ' ' + nomeMese
        }
        var templateFinale = templateGiorno(giornoDaInserire);
        $('#calendar').append(templateFinale);
    };


});
