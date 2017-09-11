var map, baseProjection, googleProjection;
function initmap(id, callback) {
    window.baseProjection = new OpenLayers.Projection("EPSG:4326");
    window.googleProjection = new OpenLayers.Projection("EPSG:900913");
    var navigation = new OpenLayers.Control.Navigation();
    navigation.defaultDblClick = function (evt) {
        var newCenter = this.map.getLonLatFromViewPortPx(evt.xy);
        if (this.map.zoom > 13) {
            this.map.setCenter(newCenter);
        } else {
            this.map.setCenter(newCenter, this.map.zoom + 1);
        }
    };
    var options = { controls: [new OpenLayers.Control.PanZoom(), new OpenLayers.Control.ArgParser(), new OpenLayers.Control.ScaleLine(), navigation, new OpenLayers.Control.Attribution(), new OpenLayers.Control.LayerSwitcher()], projection: window.baseProjection, displayProjection: window.googleProjection };
    window.map = new OpenLayers.Map(id, options);
    if (callback) {
        callback();
    }
}
function initCompactMap(id, callback) {
    window.baseProjection = new OpenLayers.Projection("EPSG:4326");
    window.googleProjection = new OpenLayers.Projection("EPSG:900913");
    var options = { controls: [new OpenLayers.Control.PanZoom(), new OpenLayers.Control.ArgParser(), new OpenLayers.Control.ScaleLine(), new OpenLayers.Control.Navigation(), new OpenLayers.Control.Attribution()], projection: window.baseProjection, displayProjection: window.googleProjection };
    window.map = new OpenLayers.Map(id, options);
    if (callback) {
        callback();
    }
}
function setupMap() {
    var googleStreet = new OpenLayers.Layer.Google("Google Streets", { numZoomLevels: 20, sphericalMercator: true });
    //var googlePhysical = new OpenLayers.Layer.Google("Google Physical", { type: google.maps.MapTypeId.TERRAIN, numZoomLevels: 20 });
    //var googleHybrid = new OpenLayers.Layer.Google("Google Hybrid", { type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20 });
    //var googleSatellite = new OpenLayers.Layer.Google("Google Satellite", { type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 20 });
    // map.addLayers([googleStreet, googlePhysical, googleHybrid, googleSatellite]);
    map.addLayers([googleStreet]);
}
function setupVmMap() {
    if (window.VIETMAP_TILED > 0) {
        var name = 'Google';
        var url = "http://s20.quanlyxe.vn/map-service/ImgHandler.ashx?action=tile&z=${z}&x=${x}&y=${y}";
        var option = { 'layername': 'basic', 'type': 'png', sphericalMercator: true, numZoomLevels: 19, projection: window.baseProjector, displayProjection: window.googleProjector };
        var layer = new OpenLayers.Layer.XYZ(name, url, option);
        map.addLayers([layer]);
    }
    if (window.GOOGLE_MAP > 0) {
        setupMap();
    }
}
function setupCompactMap() {
    var googleStreet = new OpenLayers.Layer.Google("Google Streets", { numZoomLevels: 20, sphericalMercator: true });
    map.addLayers([googleStreet]);
}
function getLonLatTransform(lon, lat) {
    var lonlat = new OpenLayers.LonLat(lon / 1e6, lat / 1e6);
    lonlat.transform(baseProjection, googleProjection);
    return lonlat;
}
function getPointTransform(lon, lat) {
    var point = new OpenLayers.Geometry.Point(lon / 1e6, lat / 1e6);
    point.transform(baseProjection, googleProjection);
    return point;
}
function getPointFromGoogleLatLon(lat, lon) {
    var point = new OpenLayers.Geometry.Point(lon, lat);
    point.transform(baseProjection, googleProjection);
    return point;
}
function getLonLatGoogleLatLon(lat, lon) {
    var lonlat = new OpenLayers.LonLat(lon, lat);
    return lonlat.transform(baseProjection, googleProjection);
}
function convertPointtoLonlat(point) { return new OpenLayers.LonLat(point.x, point.y); }
function convertLonLattoPoint(point) { return new OpenLayers.Geometry.Point(point.lon, point.lat); }
function getGoogleLonlatFromPoint(point) {
    var tmp = new OpenLayers.LonLat(point.x, point.y);
    return tmp.transform(googleProjection, baseProjection);
}
function getGoogleLonlatFromLonlat(lonlat) { return lonlat.transform(googleProjection, baseProjection); }
function setRotatePlate() {
    var imgs = document.getElementsByTagName('image');
    for (var i = 0; i < imgs.length; i++) {
        var item = imgs.item(i);
        if (item.getAttribute('id') != null && item.getAttribute('id').indexOf('background') != -1) {
            item.setAttribute('transform', 'rotate(0)');
        }
    }
}
function setCenter(point) {
    resetZoom();
    map.setCenter(convertPointtoLonlat(point));
}
function resetZoom() {
    map.zoomTo(15);
}
function removeCurrentPopup() {
    if (window.curPopU && window.curPopU != null) {
        map.removePopup(window.curPopU);
        window.curPopU = null;
    }
}
function setCurrentPopup(popup) { window.curPopU = popup; }
function updateMap() {
    setTimeout(function () {
        if (window.map) {
            window.map.updateSize();
        }
    }, 500);
}
function resetMap() {
    if (window.vector) {
        window.vector.removeAllFeatures();
    }
    removeCurrentPopup();
}
function zoomToBounds(data) {
    var bounds = new OpenLayers.Bounds();
    var s = data.split(';');
    for (var i = 0; i < s.length; i++) {
        if (s[i].length > 0) {
            var temp = s[i].split(',');
            var point = getPointTransform(temp[0], temp[1]);
            bounds.extend(point);
        }
    }
    map.zoomToExtent(bounds, true);
    map.zoomOut();
}
// ----------------------------------------------------------------------------
function paddingDisplay2Number(value) {
    value = parseInt(value);
    if (value < 10) {
        return '0' + value;
    }
    return value;
}
function getTimeFromJson(tick) {
    if (tick) {
        if (tick > 0) {
            return new Date(tick);
        }
    }
    return null;
}
function getTime(seconds) {
    if (seconds == 0) {
        return '';
    }
    var date = getBaseTime();
    date.setSeconds(seconds);
    return date;
}
function getBaseTime() { return new Date(2010, 0, 1, 0, 0, 0, 0); }
function getSecounds2Dates(date1, date2) { return parseInt((date1.getTime() - date2.getTime()) / 1000); }
function formatDateTime(value) {
    if (value) {
        return paddingDisplay2Number(value.getDate()) + '-' + paddingDisplay2Number(value.getMonth() + 1) + ' ' + paddingDisplay2Number(value.getHours()) + ':' + paddingDisplay2Number(value.getMinutes()) + ':' + paddingDisplay2Number(value.getSeconds());
    }
    return '';
}
function formatDate(value) {
    if (value) {
        return paddingDisplay2Number(value.getDate()) + '-' + paddingDisplay2Number(value.getMonth() + 1) + '-' + paddingDisplay2Number(value.getYear());
    }
    return '';
}
function formatTime(value) {
    if (value) {
        return paddingDisplay2Number(value.getHours()) + ':' + paddingDisplay2Number(value.getMinutes()) + ':' + paddingDisplay2Number(value.getSeconds());
    }
    return '';
}
function formatTime2(value) {
    if (value) {
        return paddingDisplay2Number(value.getHours()) + ':' + paddingDisplay2Number(value.getMinutes());
    }
    return '';
}
function getDuration(value) {
    if (value[17] > 0) {
        var results = '';
        if (value[9][3] > 0) {
            var days = value[9][3] / 1440;
            var pad = value[9][3] % 1440;
            if (days > 0) {
                results = days + ' d';
            }
            results = results + paddingDisplay2Number(pad / 60) + ':' + paddingDisplay2Number(pad % 60);
        } else {
            results = '00:00';
        }
        return results;
    }
    return '00:00';
}
var regions = [];
function getRegionById(id, pad) {
    if (regions[id]) {
        return regions[id] + pad;
    }
    return '' + pad;
}
function getRegion(regionId) { return getRegionById(regionId & 16777215, ' ') + getRegionById(regionId & 65535, ' ') + getRegionById(regionId & 255, ''); }
var regions2 = [];
function getRegionById2(id, pad) {
    if (regions2[id]) {
        return regions2[id] + pad;
    }
    return '' + pad;
}
function getRegion2(regionId) { return getRegionById2(regionId & 16777215, ' ') + getRegionById2(regionId & 65535, ' ') + getRegionById2(regionId & 255, ''); }
function Gis() { }
Gis.deg2Rad = function (deg) { return (deg * Math.PI / 180.0); };
Gis.getDistance = function (x1, y1, x2, y2) { return this.getDistances(x1 / 1e6, y1 / 1e6, x2 / 1e6, y2 / 1e6); };
Gis.getDistances = function (x1, y1, x2, y2) {
    var Rk = 6373;
    var lat1 = this.deg2Rad(y1);
    var lon1 = this.deg2Rad(x1);
    var lat2 = this.deg2Rad(y2);
    var lon2 = this.deg2Rad(x2);
    var dlat = lat2 - lat1;
    var dlon = lon2 - lon1;
    var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseInt(c * Rk * 1000);
};
function formatString(value) {
    if (value) {
        return value;
    }
    return '';
}
function formatDistance(value) {
    if (value > 1000) {
        return Util.number.format(parseInt(value / 100) / 10) + ' Km';
    }
    return Util.number.format(parseInt(value)) + ' m';
}
function getLonLatBaseOnAddress(address, callback) {
    $.get('http://maps.googleapis.com/maps/api/geocode/json', { sensor: false, language: 'vi-VN', address: address + ' ' + window.baseCity + ' Viet Nam' }, function (data) {
        if (callback != null) {
            callback(data);
        }
    });
}
function getLonLatBaseOnAddress2(address, callback) {
    $.get('http://maps.googleapis.com/maps/api/geocode/json', { sensor: false, language: 'vi-VN', address: address + ' Viet Nam' }, function (data) {
        if (callback != null) {
            callback(data);
        }
    });
}
function getLonlatBaseAdd(address, callback) {
    $.post(Url.get('Monitor/Geocode'), { address: address }, function (data) {
        if (callback != null) {
            callback(data);
        }
    });
}
function getAddressBaseOnLonLat(lon, lat) { }
function formatDistanceNoUnit(e) {
    if (e) {
        if (e > 0) {
            return Util.number.format(parseInt(e / 10) / 10);
        }
    }
    return 0;
}
function formatGPSDistanceNoUnit(e) {
    if (e) {
        if (e > 0) {
            return Util.number.format(parseInt(e / 100) / 10);
        }
    }
    return 0;
}
function getMapFreeLineColor() {
    if (window.mapFreeLineColor)
        return window.mapFreeLineColor;
    return 'red';
}
function getMapPassengerLineColor() {
    if (window.mapPassengerLineColor)
        return window.mapPassengerLineColor;
    return 'green';
}
function angleFromCoordinate(lat1, long1, lat2, long2) {
    return Math.atan2(lat2 - lat1, long2 - long1) * 180 / Math.PI;
}