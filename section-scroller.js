var inactiveText = '--';
var activeMarker;
var oldMarker;
//Scroll a specified section to the top of the view
function scrollToSection(target, smooth) {
    var id = $(target).attr('id').match(/\d+/g);
    var offset = $("#section-container-" + id).offset().top;

    $("#section-container-" + id).parent().stop().animate({
        scrollTop: ($(".add-section-scroller").scrollTop() + ($("#section-container-" + id).offset().top - $("#section-container-" + id).parent().offset().top))
    }, (smooth ? 600 : 0));
}

function isSectionInView(id, target) {
    var section = $("#section-container-" + id);
    //Scroll position
    var offset = section.offset().top - section.parent().offset().top;
    //If the middle is in view then true
    if ((offset < (target.clientHeight / 2)) && (offset > -1 * (target.clientHeight / 2))) {
        return true;
    } else {
        return false;
    }
}

function updateEventListeners() {
    //Remove all event listeners
    $(".marker-active").off();

    //Reassign event listeners based on which markers are active or not
    $(".marker-inactive").on('mouseenter', function () {
        var id = $(this).attr('id').match(/\d+/g);
        $(this).html(parseInt(id));
    });
    $(".marker-inactive").on('mouseleave', function () {
        $(this).html(inactiveText);
    });

    //(re-)add event listeners to inactive page markers to scroll to element on click
    $(".marker-inactive").click(function () {
        scrollToSection($(this), true);
    });
}

function makeMarkerActive(id) {
    $('#section-marker-' + id).removeClass('marker-inactive').addClass('marker-active').html(parseInt(id));
}

//Vice versa
function makeMarkerInactive(id) {
    $('#section-marker-' + id).removeClass('marker-active').addClass('marker-inactive').html(inactiveText);
}


function updateMarkers(target) {
    var markers = $('.section-marker');
    //Select the marker to be made active
    markers.each(function () {
        //Get current section id number
        var id = $(this).attr('id').match(/\d+/g)[0];
        //Select active
        if (isSectionInView(id, target)) {
            activeMarker = id;
        }
    });
    if ($('#section-marker-' + activeMarker).hasClass("marker-inactive")) {
        //If the selected marker was previously inactive, clear all markers
        markers.each(function () {
            var id = $(this).attr('id').match(/\d+/g);
            makeMarkerInactive(id);
        });
        //Apply active style to selected marker
        makeMarkerActive(activeMarker);
    }
    //Update click listeners
    updateEventListeners();
}


$(".section-container").each(function (index) {
    $("#section-scroller").append('<a id="section-marker-' + (index + 1) + '" class="section-marker marker-inactive">' + inactiveText + '</a>')
});

$('.add-section-scroller').scroll(function (event) {
    updateMarkers(event.target);
    showDescription(activeMarker);
});

updateMarkers($('.add-section-scroller')[0]);

$('.summary').each(function () {
    $(this).fadeOut(0);
});

// OTHER STUFF

function showDescription(id) {
    if (activeMarker !== oldMarker) {
        $('.summary').each(function () {
            $(this).fadeOut(300, function() {
                $('#project-summary-' + id).fadeIn(300);
            });
        });

    }
    oldMarker = activeMarker;
}