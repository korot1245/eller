const animateCSS = (element, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        // const node = document.querySelector(element);

        element.addClass(`${prefix}animated ` + animationName, );

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            element.removeClass(`${prefix}animated ` + animationName);
            resolve('Animation ended');
        }

        element[0].addEventListener('animationend', handleAnimationEnd, { once: true });
    });

var isload = false;
var animateBlocks = [
    "section-animate"
];
document.body.onload = function() {

    $("[scroll]").on("click", function(e) {
        e.preventDefault();
        let $to = $(this).attr("to");

        $('body,html').animate({
            scrollTop: $("#"+$to).offset().top - 75,
        }, 500);

    });

    $(".mouse-icon").on("click", function() {
        $('body,html').animate({
            scrollTop: $("#about").offset().top - 75,
        }, 500);
    });

    $(".go-top").on("click", function() {
        $('body,html').animate({
            scrollTop: 0,
        }, 500);
    });


    $(window).scroll(function() {
        if ($(this).scrollTop() > $(window).height() * 0.8) $('.go-top').addClass('visible')
        else $('.go-top').removeClass('visible');
    });


    $(".header__mnu").on("click", "li", function(e) {
        e.preventDefault();

        const link = $(this).find("a").attr("href");
        $('body,html').animate({
            scrollTop: $(link).offset().top - 75,
        }, 500);

    });


    $("#send_email").on("submit", function(e) {
        e.preventDefault();
        let form = $(this);

        $("#form-error").empty();
        $("#form-success").hide();

        let errorFields = [];
        let data = $(this).serializeArray();

        data.forEach(function(item) {
            if (item.value.trim() === '') {
                errorFields.push(item.name);
            }
        });
        if (errorFields.length) {


            errorFields.forEach((item) => $("[name='" + item + "']").addClass("error"));
            return false;
        }


        $.ajax({
            method: "POST",
            url: "mail.php",
            data: $(this).serialize(),
            success: function(response) {
                console.log(response)
                let res;
                typeof response === "string" ?
                    (res = $.parseJSON(response)) :
                    (res = response);
                if (res.success) {
                    $("#form-success").show().html("Спасибо за заявку! Мы скоро свяжемся с вами :)")
                    form.trigger("reset");
                }
            },
            error(xhr, status, error) {
                $("#form-error").show().html("К сожалению, мы не смогли отправить сообщение :(")
                throw new Error(error)
            },

        });


        return true;
    });



    $(window).scroll(function() {
        let header = $(".header");
        let headerHeight = header.height();
        if ($(this).scrollTop() > headerHeight * 0) {
            $(".header").addClass("sticky");
            $(".header-wrapper").css({ height: headerHeight + "px" })
        } else {
            $(".header").removeClass("sticky")

        }
    })


    var $container = $(".masonry-container");
    // $container.imagesLoaded(function() {

    //     // $container.masonry({
    //     //     columnWidth: ".item",
    //     //     itemSelector: ".item",
    //     //     initLayout: false,

    //     // });

    // });


    let container = $("body");
    container.imagesLoaded(function() {
        $container.find(".item").imagefill();
        setTimeout(function() {
            let preloader = $(".preloader");
            if (!preloader.hasClass("done")) {
                preloader.addClass("done")

                renderAnimation();
            }
        }, 500);
    });

    function renderAnimation() {
        animateCSS($(".main__text--large"), "backInDown");
        animateCSS($(".main__text--medium"), "backInDown");
        animateCSS($(".mouse-icon"), "backInUp");

        // $(window).scroll(function() {
        //     // console.log($(this).scrollTop());
        // });

    }

    $("[modal-open]").on("click", function(e) {

        e.preventDefault();
        modalOpen($(this), $(this).offset().top);
    });


    $(".close-button").on("click", function() {
        let modalOverlay = $(this).closest(".modal-overlay");
        let modal = $(this).closest(".modal");
        let scrollTop = parseInt($("html").css("top"), 10);
        $("html").removeClass("is-modal-open");

        enableScroll(scrollTop);

        modalOverlay.removeClass("active")
        modal.remove("active");
        modalOverlay.css({ "overflow-y": "hidden" })
        modal.css({ "overflow-y": "hidden" })

    });

    function modalOpen(element, height = 0) {
        if ($("html").hasClass("is-modal-open")) {
            return false;
        }

        let modalId = "#" + element.attr("modal-id");
        if (modalId && $(modalId)) {
            // let scrollTop = parseInt($("html").css("top"), 10);
            let modal = $(modalId);
            let modalOverlay = $(modalId).closest(".modal-overlay");



            modalOverlay.addClass("active")
            modal.addClass("active");

            animateCSS(modalOverlay, "backInUp").then((message) => {
                modalOverlay.css({ "overflow-y": "auto" })
            });
            animateCSS(modal, "backInUp").then((message) => {
                modal.css({ "overflow-y": "auto" })
            });
            disableScroll();

            $("html").addClass("is-modal-open");


            return true;
        }
        throw new Error("ID Modal not is correct")



    }

    function enableScroll(scrollTop) {
        scrollTop = scrollTop || parseInt($("html").css("top"), 10);
        if ($(document).height() > $(window).height()) {
            $("html")
                .css("top", "");
            $(window).scrollTop(-scrollTop);
        }
    }

    function disableScroll(scrollTop) {
        scrollTop = scrollTop || $(window).scrollTop();
        if ($(document).height() > $(window).height()) {
            $("html")
                .css("top", -scrollTop);
        }
    }



    var hamburger = $(".hamburger");
    var mnu = $("#header__mnu");
    var html = $("html");

    hamburger.on("click", function(e) {
        e.preventDefault();
        let isClass = mnu.hasClass("is-active");
        let right = !isClass ? "0px" : '-100%';
        console.log(right);
        html.toggleClass("overlay");
        $(this).toggleClass("is-active");
        mnu.toggleClass("is-active");
        mnu.animate({
            right: right
        }, 100);
    })
    $(document).on('click', function(e) {
        if ($(e.target).hasClass("overlay")) {

            html.toggleClass("overlay");
            hamburger.toggleClass("is-active");
            mnu.toggleClass("is-active");
            mnu.animate({
                right: "-100%"
            }, 100);
            // if (menu.hasClass("is-active")) {
            //     menu.animate({
            //         right: "-100%"
            //     }, 250);

            //     menu.removeClass("active")
            //     $("html").removeClass("is-active");

            // }

        }


    });
    // if (hamburgers.length > 0) {

    //     forEach(hamburgers, function(hamburger) {
    //         hamburger.addEventListener("click", function() {
    //             let isClass = $("#header__mnu").hasClass("active");
    //             this.classList.toggle("is-active");
    //             mnu.classList.toggle("is-active")
    //             let right = !isClass ? "0px" : '-100%';


    //         }, false);
    //     });
    // }

}