
var inactiveText = '--';


function isSectionInView(id, target) {
    var section = $("#section-container-" + id);
    //Scroll position
    var offset = section.offset().top - section.parent().offset().top;
    console.log(target.clientHeight);
    console.log(id + ' section position ' + offset);
    console.log(offset > (target.clientHeight / 2));
    //If the middle is in view then true
    if ((offset < (target.clientHeight / 2)) && (offset >)) {
        return true;
    } else {
        return false;
    }
}

function updateEventListeners() {
    //Remove all event listeners
    $(".active").off();

    //Reassign event listeners based on which markers are active or not
    $(".inactive").on('mouseenter', function () {
        var id = $(this).attr('id').match(/\d+/g);
        $(this).html(parseInt(id));
    });
    $(".inactive").on('mouseleave', function () {
        $(this).html(inactiveText);
    });

    //(re-)add event listeners to inactive page markers to scroll to element on click
    $(".inactive").click(function () {
        scrollToSection($(this), true);
    });
}

function makeMarkerActive(id) {
    $('#page-marker-' + id).removeClass('inactive').addClass('active').html(parseInt(id));
}

//Vice versa
function makeMarkerInactive(id) {
    $('#page-marker-' + id).removeClass('active').addClass('inactive').html(inactiveText);
}


function updateMarkers(target) {
    var active = '';
    var markers = $('.section-marker');
    //Select the marker to be made active
    markers.each(function () {
        //Get current section id number
        var id = $(this).attr('id').match(/\d+/g);
        //Select active
        if (isSectionInView(id, target)) {
            active = id;
        }
    });
    if ($('#page-marker-' + active).hasClass("inactive")) {
        //If the selected marker was previously inactive, clear all markers
        markers.each(function () {
            var id = $(this).attr('id').match(/\d+/g);
            makeMarkerInactive(id);
        });
        //Apply active style to selected marker
        makeMarkerActive(active);
    }

    //Update click listeners
    updateEventListeners();
}


$(".section-container").each(function (index) {
    $("#section-scroller").append('<p id="section-marker' + (index + 1) + '" class="section-marker inactive">' + inactiveText + '</p>')
});

$('.add-section-scroller').scroll(function (event) {
    updateMarkers(event.target);
});