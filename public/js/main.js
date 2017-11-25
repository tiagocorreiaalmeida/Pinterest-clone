$("document").ready(() => {
    $('.row-mansory').masonry({
        itemSelector: '.col-mansory'
    });

    /////////////////////////////////////////////
    //APPEND ALERTS
    let alertMessage = (type, icon, message) => {
        if ($(".alerts").length > 0) {
            $(".alerts").empty();
        }
        if (type) {
            $(".alerts").append(`<div class="alert alert-${type}" role="alert">
            ${icon} ${message}
          </div>`);
        }
    }

    /////////////////////////////////////////////
    //ADD POST IMAGE LINK CHANGE
    $("#image-link").change(function () {
        let input = $(this).val();
        $(".img-thumbnail").attr("src", input);
        $(".preview").css("display", "block").hide().fadeIn();
        alertMessage();
        $(".img-thumbnail").on("error", function () {
            let defaultLink = "https://pplware.sapo.pt/wp-content/uploads/2017/06/google_fotos.jpg"
            this.src = defaultLink;
            $("#image-link").val(defaultLink);
            alertMessage('info', '<i class="fa fa-info-circle" aria-hidden="true"></i>', 'Invalid url changed to default');
        });
    });

    /////////////////////////////////////////////
    //CLEAR INPUT
    $(".clear").on("click", () => {
        $("#image-link").val('');
        $("#description").val('');
        $(".preview").fadeOut();
        alertMessage();
    });
});