(function($){

var loadGoogleMap = function(){
    var $this = $(this), markers = [], coord = function(pos){
        return new google.maps.LatLng(pos[0], pos[1]);
    };
    var params = $.extend({
        zoom       : 14,
        type       : 'ROADMAP',
        center     : null,
        markerIcon : null,
        showInfo   : true
    }, eval('(' + ($this.data('google-map-params') || '{}') + ')'));
    $this.find('.mbr-google-map__marker').each(function(){
        var coord = $(this).data('coordinates');
        if (coord){
            markers.push({
                coord    : coord.split(/\s*,\s*/),
                icon     : $(this).data('icon') || params.markerIcon,
                content  : $(this).html(),
                template : $(this).html('{{content}}').removeAttr('data-coordinates data-icon')[0].outerHTML
            });
        }
    }).end().html('').addClass('mbr-google-map--loaded');
    if (markers.length){
        var map = this.Map = new google.maps.Map(this, {
            scrollwheel : false,
            // prevent draggable on mobile devices
            draggable   : !$.isMobile(),
            zoom        : params.zoom,
            mapTypeId   : google.maps.MapTypeId[params.type],
            center      : coord(params.center || markers[0].coord)
        });
        $(window).smartresize(function(){
           var center = map.getCenter();
           google.maps.event.trigger(map, 'resize');
           map.setCenter(center);
        });
        map.Geocoder = new google.maps.Geocoder;
        map.Markers = [];
        $.each(markers, function(i, item){
            var marker = new google.maps.Marker({
                map       : map,
                position  : coord(item.coord),
                icon      : item.icon,
                animation : google.maps.Animation.DROP
            });
            var info = marker.InfoWindow = new google.maps.InfoWindow();
            info._setContent = info.setContent;
            info.setContent = function(content){
                return this._setContent(content ? item.template.replace('{{content}}', content) : '');
            };
            info.setContent(item.content);
            google.maps.event.addListener(marker, 'click', function(){
                if (info.anchor && info.anchor.visible) info.close();
                else if (info.getContent()) info.open(map, marker);
            });
            if (item.content && params.showInfo){
                google.maps.event.addListenerOnce(marker, 'animation_changed', function(){
                    setTimeout(function(){
                        info.open(map, marker);
                    }, 350);
                });
            }
            map.Markers.push(marker);
        });
    }
};

$(document).on('add.cards', function(event){
    if (window.google && google.maps){
        $(event.target).outerFind('.mbr-google-map').each(function(){
            loadGoogleMap.call(this);
        });
    }
});

})(jQuery);
