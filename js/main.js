$('document').ready(function(){

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);


    var dataIniziale = moment('2018-01-01');
    stampaGiorniMese(dataIniziale);
    stampaFestivi();

    $('.mese-succ').click(function(){
        dataIniziale.add(1, 'months');
        stampaGiorniMese(dataIniziale);
    });

    $('.mese-prec').click(function(){
        dataIniziale.subtract(1, 'months');
        stampaGiorniMese(dataIniziale);
    });

    function stampaFestivi() {
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays?',
            method: 'GET',
            data: {
                year: 2018,
                month: 0
            },
            success: function (data){
                var giorniFestivi = data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo = giorniFestivi[i]
                    var nomeFestivo = giornoFestivo.name;
                    var dataFestivo = giornoFestivo.date;
                    console.log(nomeFestivo);
                    console.log(dataFestivo);
                }
            }
        });
    };


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
