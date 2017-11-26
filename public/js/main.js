"use strict"
$("document").ready(() => {
    $('.row-mansory').masonry({
        itemSelector: '.col-mansory'
    });

    /////////////////////////////////////////////
    //APPEND ALERTS
    let alertMessage = (ele,type, icon, message) => {
        if ($(`.${ele}`).length > 0) {
            $(`.${ele}`).empty();
        }
        if (type) {
            $(`.${ele}`).append(`<div class="alert alert-${type}" role="alert">
            ${icon} ${message}
          </div>`);
        }
    }

    /////////////////////////////////////////////
    //CHECK IMAGE
    let checkImg = () => {
        $(".img-thumbnail").on("error", function () {
            let defaultLink = "http://cdn4.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg"
            this.src = defaultLink;
            $("#image-link").val(defaultLink);
            alertMessage('alerts_modal','info', '<i class="fa fa-info-circle" aria-hidden="true"></i>', 'Invalid url changed to default');
        });
    }

    /////////////////////////////////////////////
    //ADD POST IMAGE LINK CHANGE
    $("#image-link").change(function () {
        let input = $(this).val();
        $(".img-thumbnail").attr("src", input);
        $(".preview").css("display", "block").hide().fadeIn();
        alertMessage('alerts_modal');
        checkImg();
    }); 

    /////////////////////////////////////////////
    //ADD POST CHECK IMG STATE
    $(".add").on("click", () => {
        checkImg();
    });


    /////////////////////////////////////////////
    //CLEAR ADD POST INPUT
    $(".clear").on("click", () => {
        $("#image-link").val('');
        $("#description").val('');
        $(".preview").fadeOut();
        alertMessage('alerts_modal');
    });

    /////////////////////////////////////////////
    //DELETE POST
    $(".remove").on("click", function () {
        let id = $(this).attr("data-id");
        $.getJSON(`/user/delete/${id}`, ((data) => {
            if (data) {
                $(`[data-post="${id}"]`).fadeOut();
                alertMessage('alerts','success', '<i class="fa fa-check-circle" aria-hidden="true"></i>', data.message);
            }
        }));
    });

    /////////////////////////////////////////////
    //LIKE ON POST
    $(".thumbUp.active").on("click", function () {
        let id = $(this).attr("id");
        $.getJSON(`/like/${id}`, ((data) => {
            if (data) {
                $(`[data-id="${id}"]`).text("likes "+data.change);
            }
        }));
    });
});