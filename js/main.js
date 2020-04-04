$('document').ready(function(){

    var htmlGiorno = $('#calendar-template').html();
    var templateGiorno = Handlebars.compile(htmlGiorno);


    var dataIniziale = moment('2018-01-01');
    var meseIniziale = dataIniziale.month();
    stampaGiorniMese(dataIniziale);
    stampaFestivi(meseIniziale);

    $('.mese-succ').click(function(){
        dataIniziale.add(1, 'months');
        var mese = dataIniziale.month();
        stampaGiorniMese(dataIniziale);
        stampaFestivi(mese);
        if (mese.format('YYYY') == 2019) {
            alert('non puoi accedere al 2017!');
        }
    });

    $('.mese-prec').click(function(){
        dataIniziale.subtract(1, 'months');
        var mese = dataIniziale.month();
        stampaGiorniMese(dataIniziale);
        stampaFestivi(mese);
    });

    function stampaFestivi(mese) {
        $.ajax({
            url: 'https://flynn.boolean.careers/exercises/api/holidays?',
            method: 'GET',
            data: {
                year: 2018,
                month: mese
            },
            success: function (data){
                var giorniFestivi = data.response;
                for (var i = 0; i < giorniFestivi.length; i++) {
                    var giornoFestivo = giorniFestivi[i]
                    var nomeFestivo = giornoFestivo.name;
                    var dataFestivo = giornoFestivo.date;
                    $('#calendar li[data-day="' + dataFestivo + '"]').addClass('festivo').append('-' + nomeFestivo);
                }
            }
        });
    };


    function stampaGiorniMese (meseDaStampare){
        $('#calendar').empty();
        var standardDay = meseDaStampare.clone();
        var giorniMese = meseDaStampare.daysInMonth();
        var nomeMese = meseDaStampare.format('MMMM');
        $('#nome-mese').text(nomeMese);
        for (var i = 1; i <= giorniMese; i++) {
            var giornoDaInserire = {
                day: i + ' ' + nomeMese,
                dataDay: standardDay.format('YYYY-MM-DD')
            }
            var templateFinale = templateGiorno(giornoDaInserire);
            $('#calendar').append(templateFinale);
            standardDay.add(1,'day');
        };
    };

});
