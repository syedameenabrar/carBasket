function loaderA() {
    $("#ctn-preloader").fadeOut(), $("#preloader").delay(350).fadeOut("slow"), $("body").delay(350).css({
        overflow: "visible"
    }), new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !0,
        live: !0
    }).init();
    var a = $(".fancybox");
    if (a.length && a.fancybox({
            arrows: !0,
            buttons: ["zoom", "slideShow", "thumbs", "close"],
            animationEffect: "zoom-in-out",
            transitionEffect: "zoom-in-out"
        }), $("#isotop-gallery-wrapper").length) {
        var b = $("#isotop-gallery-wrapper").isotope({
            itemSelector: ".isotop-item",
            percentPosition: !0,
            masonry: {
                columnWidth: ".grid-sizer"
            }
        });
        $(".isotop-menu-wrapper").on("click", "li", function() {
            var a = $(this).attr("data-filter");
            b.isotope({
                filter: a
            })
        }), $(".isotop-menu-wrapper").each(function(c, a) {
            var b = $(a);
            b.on("click", "li", function() {
                b.find(".is-checked").removeClass("is-checked"), $(this).addClass("is-checked")
            })
        })
    }
}