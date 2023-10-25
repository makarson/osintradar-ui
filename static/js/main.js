$(document).ready(function () {
    $('.result-modal').on('show.bs.modal', function (event) {
        var inputValue= $("#search").val()

        if (inputValue.length > 5){
            $("#alert").empty();
            var formData = {
            keyword: inputValue,

        };
        $("#loading").show();
        $("#modalContent").hide();


        $.ajax({
            url: '/api/search',
            type: 'POST',
            data: formData,
            dataType: "json",
            encode: true,
            success: function (response) {
                $("#loading").hide();
                $("#modalContent").show();
                $("#assetName").text(inputValue);

                let tr_tags = "";
                for (let i = 0; i < response.length; i++) {
                    if (response[i]['result'] == 'clean'){
                        tr_tags += '<tr><td><span class="font-weight-bold text-uppercase">'+ response[i]['source'] +'</span></td><td><span class="badge badge-success text-capitalize">'+ response[i]['result'] +'</span></td></tr>';
                    }else {
                        tr_tags += '<tr><td><span class="font-weight-bold text-uppercase">'+ response[i]['source'] +'</span></td><td><span class="badge badge-danger text-capitalize">'+ response[i]['result'] +'</span></td></tr>';

                    }

                }
                $("#resultContent").html(tr_tags);
            },
            error: function () {
                $("#loading").hide();
                $("#modalContent").show();
                document.getElementById("modalContent").innerHTML = 'Fail, Content Not Loaded!';

            },
        })

        }else {
            $("#modalContent").hide();
            $("#alert").text('Please enter minimum 5 letter.');

        }


    })

});