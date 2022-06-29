var sumtutar = 0;
$(document).ready(function () {
    $(document).on("click", ".select", function () {

        var Id = $('#mtable > tbody > #' + this.id + ' > td:nth-child(1)').text();
        var AdSoyad = $('#mtable > tbody > #' + this.id + ' > td:nth-child(2)').text();
        var FirmaIsmi = $('#mtable > tbody > #' + this.id + ' > td:nth-child(3)').text();
        var Telefon = $('#mtable > tbody > #' + this.id + ' > td:nth-child(4)').text();
        var Adres = $('#mtable > tbody > #' + this.id + ' > td:nth-child(5)').text();

        $('#Id').val(Id);
        $('#AdSoyad').val(AdSoyad);
        $('#telefon').val(Telefon);
        $('#firmaismi').val(FirmaIsmi);
        $('#adres').val(Adres);

        $.ajax({
            url: "/Panel/FaturaListele",
            type: "GET",
            data: { musteriId: Id },
            success: function (response) {
                console.log(response);
                $("#faturatbody").empty();
                var table = "";

                for (i = 0; i < response.length; i++) {


                    table += "<tr class=\"faturaselecting\" id=\"" + response[i]['id'] + "\">" +
                        "<td class=\"gocheck\">" + response[i]['uiId'] + "</td>" +
                        "<td>" + response[i]['tarih'] + "</td>" +
                        "<td>" + response[i]['guncellenmeTarihi'] + "</td>" +
                        "<td>" + response[i]['toplamFiyat'] + "</td>" +
                        "<td>" + response[i]['musteri']['adSoyad'] + "</td>" +
                        "</tr>";
                    $("#faturatbody").empty().append(table);
                }
            }, timeout: 2000
        });


    });
    $(document).on("click", ".selectTable", function () {

        var Id = $('.table > tbody > #' + this.id + ' > td:nth-child(1)').text();

        var Isim = $('.table > tbody > #' + this.id + ' > td:nth-child(3)').text();
        var Adet = $('.table > tbody > #' + this.id + ' > td:nth-child(4)').text();
        var Fiyat = $('.table > tbody > #' + this.id + ' > td:nth-child(5)').text();
        console.log("asd");
        $('#UrunId').val(Id);
        $('#UrunIsim').val(Isim);
        $('#UrunAdet').val(Adet);
        $('#UrunFiyat').val(Fiyat);

    });


    $("#rowekle").on("click", function () {

        var row = $('#faturaurunlist').children("tr").html();
        var fiyat = $('#faturaurunlist').children("tr").children(".UrunFiyati").html();
        var Idss = $('#faturaurunlist').children("tr").children(".adetinput").children(".spanId").html();
        console.log(fiyat + " asd");
        var count = $('#faturaurunlist').children("tr").length;
        row = row.replace(">1<", ">" + (count + 1) + "<");
        row = row.replace("urunId1", "urunId" + (count + 1));
        row = row.replace("adetId1", "adetId" + (count + 1));
        row = row.replace("<td class=\"UrunFiyati\">" + fiyat + "</td>", "<td class=\"UrunFiyati\">0</td>");
        row = row.replace("<span class=\"spanId\" style=\"display:none;\">" + Idss + "</span>", "<span class=\"spanId\" style=\"display:none;\"></span>");

        $('#faturaurunlist').append("<tr id=" + (count + 1) + ">" + row + "</tr>")

    });

    $(document).on("click", ".rowdelete", function () {
        var count = $(this).parent().parent().parent().parent().children("tr").length;
        var cont = $(this);
        var adet = cont.parent().parent().parent().children(".adetinput").children("input").val();
        var fiyat = cont.parent().parent().parent().children(".UrunFiyati").html();
        var deger = fiyat * adet;
        if (count > 1) {

            sumtutar -= deger;
            $("#toplamtutar").html("Toplam Tutar: " + sumtutar + " TL");
            $(this).parent().parent().parent().remove();

        }


    });

    $(document).on("click", ".gocheck", function () {
        $(location).attr('href', '/Panel/FaturaIslemleri')


    });
    $(document).on("change", ".urunId", function () {
        var cont = $(this);
        var proName = $(this).val();
        var value = $('#urun option').filter(function () {
            return this.value == proName;
        }).data('value');
        var UrunId = value ? value : '0';

        var fiyat = 0;
        $.ajax({
            url: "/Panel/UrunFiyatiniAl",
            type: "GET",
            data: { urunId: UrunId },
            success: function (response) {
                console.log(response.fiyat);
                cont.parent().parent().children("tr .UrunFiyati").html(response.fiyat);
            }, timeout: 2000
        });



    });

    $(document).on("change", ".adetId", function () {
        var tutar = 0;
        var cont = $(this).parent().parent().parent().children("tr").each(function (index, tr) {

            var adet = $(tr).children(".adetinput").children("input").val();
            var fiyat = $(tr).children(".UrunFiyati").html();

            tutar += (fiyat * adet);

        });
        sumtutar = tutar;
        $("#toplamtutar").html("Toplam Tutar: " + sumtutar + " TL");

    });


    $(document).on("click", "#faturakes", function () {
        console.log("asdasd");
        var list = [];
        var faturadetay = [];
        var mId = $("#musteriId").val();
        var val = $('#musteri option').filter(function () {
            return this.value == mId;
        }).data('value');
        var muId = val ? val : '0';

        var cont = $("#faturaurunlist tr").each(function (index, tr) {
            var adet = $(tr).children(".adetinput").children("input").val();
            var detayId = $(tr).children(".adetinput").children(".spanId").html();
            var fiyat = $(tr).children(".UrunFiyati").html();
            var proName = $(tr).children(".urunidinput").children("input").val();
            var value = $('#urun option').filter(function () {
                return this.value == proName;
            }).data('value');
            var UrunId = value ? value : '0';

            list.push({
                "id": detayId,
                'urunId': UrunId,
                'urunAdi': proName,
                'adet': adet,
                'fiyat': (fiyat * adet),
                'musteriId': muId
            });


        });

        var fUid = $("#FaturaUiId").html();

        faturadetay.push({
            'uiId': fUid,
            'musteriId': muId,
            'faturaDetay': list
        });
        $.ajax({
            url: "/Panel/FaturaGir",
            type: "POST",
            data: { faturaDetay: list, musteriId: muId, uiId: fUid },
            success: function (response) {
                console.log(response);
                if(response.success){
                    swal("Başarılı!","", "success");
                }else{
                    swal("Başarısız","", "error");
                }
            }, timeout: 200
        });
        console.log(faturadetay);

    });

    $("#GetFatura").on("click", function () {
        var faturaId = $("#FaturaUniq").val();
        $.ajax({
            url: "/Panel/FaturaSorgulama",
            type: "POST",
            data: { faturaUiId: faturaId },
            success: function (response) {
                if (response.success) {
                    console.log(response.data);
                    response = response.data;
                    $("#modal-faturaId").html("FaturaId : " + response.uiId);
                    $("#modal-faturaTarih").html("FaturaTarih : " + response.tarih);
                    $("#modal-faturaSonTarih").html("FaturaGuncellemeTarih : " + response.guncellenmeTarihi);
                    $("#modal-faturaFiyat").html("FaturaToplamFiyat : " + response.toplamFiyat);
                    $("#modal-faturaFiyat").html("FaturaSahibi : " + response.musteri.adSoyad);
                    $("#modal-bilgi").html("");
                } else {
                    $("#modal-faturaId").html("");
                    $("#modal-faturaTarih").html("");
                    $("#modal-faturaSonTarih").html("");
                    $("#modal-faturaFiyat").html("");
                    $("#modal-faturaFiyat").html("");
                    $("#modal-bilgi").html("Boyle bir fatura bulunmamaktadir.");
                }


            }, timeout: 2000
        });

    });

    $(".guncelle").on("click", function () {


        var faturaId = $("#FaturaUniq").val();

        $.ajax({
            url: "/Panel/FaturaSorgulama",
            type: "POST",
            data: { faturaUiId: faturaId },
            success: function (response) {
                console.log(response);
                response = response.data;
                $("#musteriId").val(response.musteri.adSoyad);
                $("#FaturaUiId").css("display", "block");
                $("#FaturaUiId").html(response.uiId);

                var uruns = response.faturaDetay;

                for (var i = 0; i < uruns.length - 1; i++) {
                    var row = $('#faturaurunlist').children("tr").html();
                    var count = $('#faturaurunlist').children("tr").length;
                    if (uruns.length > count) {

                        row = row.replace(">1<", ">" + (count + 1) + "<");
                        row = row.replace("urunId1", "urunId" + (count + 1));
                        row = row.replace("adetId1", "adetId" + (count + 1));
                        $('#faturaurunlist').append("<tr id=" + (count + 1) + ">" + row + "</tr>");
                    }

                }
                console.log();

                $.each(uruns, function (k, v) {

                    $("#urunId" + (k + 1)).val(v.urunAdi).change();
                    $("#adetId" + (k + 1)).val(v.adet).change();
                    $("#adetId" + (k + 1)).parent().children(".spanId").html(v.id);
                    console.log(v)
                });
                sumtutar = response.toplamFiyat
                $("#toplamtutar").html("Toplam Tutar: " + sumtutar + " TL");

            }, timeout: 200
        });

    });


});




