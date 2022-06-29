$(document).ready(function () {
$(document).on("click", ".select", function () {

    var Id = $('#mtable > tbody > #' + this.id + ' > td:nth-child(1)').text();
    var AdSoyad = $('#mtable > tbody > #' + this.id + ' > td:nth-child(3)').text();
    var FirmaIsmi = $('#mtable > tbody > #' + this.id + ' > td:nth-child(5)').text();
    var Telefon = $('#mtable > tbody > #' + this.id + ' > td:nth-child(4)').text();
    var Adres = $('#mtable > tbody > #' + this.id + ' > td:nth-child(6)').text();

    $('#Id').empty().val(Id);
    $('#AdSoyad').empty().val(AdSoyad);
    $('#telefon').empty().val(Telefon);
    $('#firmaismi').empty().val(FirmaIsmi);
    $('#adres').empty().val(Adres);
    });
});