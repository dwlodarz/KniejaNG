$(document).ready(function() {
    var google;

    function init() {
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var home = new google.maps.LatLng(50.503389, 18.662105);
        var ambona1 = new google.maps.LatLng(50.499827, 18.692759);
        var ambona2 = new google.maps.LatLng(50.500713, 18.683193);
        var pasnik = new google.maps.LatLng(50.516564, 18.681343);

        var mapOptions = {
            zoom: 11,
            center: home,
            mapTypeId: 'hybrid',
            scrollwheel: true,
            styles: [{ "featureType": "administrative.land_parcel", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "visibility": "simplified" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "hue": "#f49935" }] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "hue": "#fad959" }] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "labels", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "visibility": "off" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#a1cdfc" }, { "saturation": 30 }, { "lightness": 49 }] }]
        };
        var mapElement = $('.map')[0];
        var map = new google.maps.Map(mapElement, mapOptions);
        var bermudaTriangle = new google.maps.Polygon({
            paths: triangleCoords,
            strokeColor: '#4286f4',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#fff654',
            fillOpacity: 0.10
        });
        bermudaTriangle.setMap(map);

        var markerHome = new MarkerWithLabel({
            position: home,
            map: map,
            draggable: false,
            labelAnchor: new google.maps.Point(15, 65),
            labelClass: "labels", // the CSS class for the label
            icon: 'images/home_icon2.png'
        });

        var markerAmbona1 = new MarkerWithLabel({
            position: ambona1,
            map: map,
            draggable: false,
            labelAnchor: new google.maps.Point(15, 65),
            labelClass: "labels", // the CSS class for the label
            icon: 'images/lookout_icon2.png'
        });

        var markerAmbona2 = new MarkerWithLabel({
            position: ambona2,
            map: map,
            draggable: false,
            labelAnchor: new google.maps.Point(15, 65),
            labelClass: "labels", // the CSS class for the label
            icon: 'images/lookout_icon2.png'
        });

        var markerPasnik = new MarkerWithLabel({
            position: pasnik,
            map: map,
            draggable: false,
            labelAnchor: new google.maps.Point(15, 65),
            labelClass: "labels", // the CSS class for the label
            icon: 'images/rack_icon.png'
        });

        var windowInfo = [];

        windowInfo.push({
            window: new google.maps.InfoWindow({
                content: "<div><img src='images/obrazy/ambona1.jpg'><p>Lorem ipsum...</p></div>"
            }),
            marker: markerAmbona1
        });

        windowInfo.push({
            window: new google.maps.InfoWindow({
                content: "<div><img src='images/obrazy/home.jpg'><p>Lorem ipsum...</p></div>"
            }),
            marker: markerHome
        });

        windowInfo.push({
            window: new google.maps.InfoWindow({
                content: "<div><img src='images/obrazy/ambona2.jpg'><p>Lorem ipsum...</p></div>"
            }),
            marker: markerAmbona2
        });

        windowInfo.push({
            window: new google.maps.InfoWindow({
                content: "<div><img src='images/obrazy/pasnik.jpg'><p>Lorem ipsum...</p></div>"
            }),
            marker: markerPasnik
        });

        google.maps.event.addListener(windowInfo[1].marker, "click", function(e) {
            closeAllWindows(windowInfo);
            windowInfo[1].window.open(map, this);
        });
        google.maps.event.addListener(windowInfo[0].marker, "click", function(e) {
            closeAllWindows(windowInfo);
            windowInfo[0].window.open(map, this);
        });
        google.maps.event.addListener(windowInfo[2].marker, "click", function(e) {
            closeAllWindows(windowInfo);
            windowInfo[2].window.open(map, this);
        });
        google.maps.event.addListener(windowInfo[3].marker, "click", function(e) {
            closeAllWindows(windowInfo);
            windowInfo[3].window.open(map, this);
        });
    }

    function closeAllWindows(windowInfo) {
        for (var i = 0; i < windowInfo.length; i++) {
            windowInfo[i].window.close();
        }
    }

    function pinSymbol(color) {
        return {
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 2,
            scale: 2
        };
    }
    google.maps.event.addDomListener(window, 'load', init);
    //init();
});