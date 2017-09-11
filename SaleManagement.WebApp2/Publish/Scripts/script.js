var moneyFormat = '#,##0';
var distanceFormat = '#,##0.#';
function incrementChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}
function nextChartExcel(c) {
    if (c.length == 0) {
        return 'B';
    }
    else if (c.length == 1) {
        if (c != 'Z')
            return incrementChar(c);
        else
            return 'AA';
    }
    else if (c.length == 2) {
        var chars = c.split('');
        if (chars[1] == 'Z') {
            if (chars[0] == 'Z') {
                return 'AAA';
            }
            else
                return incrementChar(chars[0]) + 'A';
        }
        else
            return chars[0] + incrementChar(chars[1]);
    }
    else
        return c;
}
function getRandomColor() {
    var colours = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
    var digit = new Array(5);
    var colour = '#';
    for (var i = 0; i < 6; i++) {
        var j = Math.round(Math.random() * 16);
        digit[i] = colours[j == 0 ? j : j - 1];
        colour = colour + digit[i];
    }
    return colour;
}
var rightBar = false;
function isTouchDevice() {
    var result = true;
    try {
        document.createEvent("TouchEvent");
    } catch (e) {
        result = false;
    }
    var ua = navigator.userAgent;
    if (result || ua.match(/(iPhone|iPod|iPad)/) || ua.match(/BlackBerry/) || ua.match(/Android/)) {
        result = true;
    }
    else {
        result = false;
    }
    return result;
}
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    var html = $('.notification-box').html();
    if (html) {
        if (html.length > 0) {
            showNotification($.parseJSON(html));
            $('.notification-box').html('');
        }
    }
    $('.tab-content').css('display', 'none');
    $('.tab li').on('click', function () {
        var obj = $(this);
        if (obj.hasClass('active')) {
        }
        else {
            var id = $(this).parent().attr('id');
            var items = $('#' + id + ' li');
            for (var i = 0; i < items.length; i++) {
                var item = $(items[i]);
                item.removeClass('active');
                $('#' + item.attr('tab')).css('display', 'none');
            }
            obj.addClass('active');
            $('#' + obj.attr('tab')).css('display', '');
        }
    });
    if ($('.tab .active').length == 0) {
        var tabs = $('.tab');
        for (var j = 0; j < tabs.length; j++) {
            var tab = $(tabs[j]);
            var lis = $('#' + tab.attr('id') + ' li');
            if (lis.length > 0) {
                var li = $(lis[0]);
                li.addClass('active');
                $('#' + li.attr('tab')).css('display', '');
            }
        }
    }
    else {
        var li = $($('.tab .active')[0]);
        $('#' + li.attr('tab')).css('display', '');
    }
    if (window.setupClient) {
        setupClient(function () {
            if (client) {
                client.client.reloadCompanyStateCallback = function (code, data) {
                    if (code == window.uiCode) {
                        var s = data.split(';');
                        $('.pasgerRunning').html(s[0]);
                        $('.pasgerStop').html(s[1]);
                        $('.freeRunnung').html(s[2]);
                        $('.freeStop').html(s[3]);
                        $('.freeOff').html(s[4]);
                        if (s[5] >= 0) {
                            window.Reminder = s[5];
                            $('.alert-reminder .summary').html(s[5]);
                        }
                        if (s[6] >= 0) {
                            $('.alert-schedule .summary').html(s[6]);
                        }
                    }
                };
                client.client.authorizeCallback = function () {
                    window.clientConnected = true;
                    setTimeout(reloadState, 1000);
                    if (window.connectedCallback) {
                        window.connectedCallback();
                    }
                };
                if (window.setupConfiguration) {
                    window.setupConfiguration(client.client);
                }
            }
        });
    }
    if (window.documentReadyCallback) {
        window.documentReadyCallback();
    }
    createPopOverTopMenu();
});
function reloadState() {
    setTimeout(reloadState, 10000);
    if (window.clientConnected) {
        window.client.server.reloadCompanyState(window.uiCode);
    }
}
function showNotification(data) {
    if (data.length == 0) {
        return;
    }
    var icon = '';
    if (data.lv == 1) {
        icon = 'success';
    }
    else if (data.lv == 2) {
        icon = 'info';
    }
    else if (data.lv == 3) {
        icon = 'warning';
    }
    else if (data.lv == 4) {
        icon = 'danger';
    }
    $.notify({
            // options
            message: '<table cellpadding="3" cellspacing="3"><tr><td nowrap="nowrap">Cập nhật lúc :</td><td nowrap="nowrap"><i>' + Util.date.formatDateTime(new Date()) + '</i></td></tr>' + '<tr><td nowrap="nowrap">Nội dung :</td><td nowrap="nowrap">' + getMessage(data.msg) + '</td></tr></table>'
        }, {
            // settings
            type: icon,
            placement: {
                    from: 'bottom',
                    align: 'right',
                    animate: {
                            enter: 'animated fadeInDown',
                            exit: 'animated fadeOutUp'
                        }
                }
        });
}
function showNotificationSuccess() {
    showNotification({ lv: 1, msg: "[\"Cập nhật thành công.\"]" });
}
function getMessage(msg) {
    var obj = $.parseJSON(msg);
    var result = '';
    for (var i = 0; i < obj.length; i++) {
        result += obj[0] + "<br/>";
    }
    return result;
}
function paddingDisplay2Number(value) {
    if (value < 10) {
        return '0' + value;
    }
    return value;
}
function request(url, data, success, fail) { $.post(url, data, success).fail(fail); }
function setCookie(key, value) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString() + ";path=/web";
}
function getCookie(key) {
    var keyValue = document.cookie.match('(^|;)?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}
function sortbyProperty(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}
function sortbyIndex(index) {
    var sortOrder = 1;
    if (index < 0) {
        sortOrder = -1;
        index = Math.abs(index);
    }
    return function (a, b) {
        var result = (a[index - 1] < b[index - 1]) ? -1 : (a[index - 1] > b[index - 1]) ? 1 : 0;
        return result * sortOrder;
    };
}
var Util = {
        distance: {
                meter: {
                        formatNoUnit: function (e) {
                            if (e) {
                                if (e > 0) {
                                    return Util.number.format(parseInt(e / 10) / 10);
                                }
                            }
                            return 0;
                        },
                        getDistance: function (e) {
                            if (e) {
                                if (e > 0) {
                                    return parseInt(e / 10) / 10;
                                }
                            }
                            return 0;
                        }
                    },
                gps: {
                        formatNoUnit: function (e) {
                            if (e) {
                                if (e > 0) {
                                    return Util.number.format(parseInt(e / 100) / 10);
                                }
                            }
                            return 0;
                        },
                        getDistance: function (e) {
                            if (e) {
                                if (e > 0) {
                                    return parseInt(e / 100) / 10;
                                }
                            }
                            return 0;
                        }
                    }
            },
        number: {
                format: function (e) {
                    if (e > 0) {
                        e.toFixed(1);
                        e += "";
                        var t = e.split(".");
                        var n = t[0];
                        var r = t.length > 1 ? "." + t[1] : "";
                        var i = /(\d+)(\d{3})/;
                        while (i.test(n)) {
                            n = n.replace(i, "$1" + "," + "$2");
                        }
                        return n + r;
                    }
                    return e;
                },
                format2: function (e) {
                    if (e == 0) {
                        return '';
                    }
                    if (e > 0) {
                        e.toFixed(1);
                        e += "";
                        var t = e.split(".");
                        var n = t[0];
                        var r = t.length > 1 ? "." + t[1] : "";
                        var i = /(\d+)(\d{3})/;
                        while (i.test(n)) {
                            n = n.replace(i, "$1" + "," + "$2");
                        }
                        return n + r;
                    }
                    return e;
                },
                format3: function (e) {
                    if (e == 0) {
                        return '';
                    }
                    if (e > 0) {
                        e.toFixed(1);
                        e += "";
                        var t = e.split(".");
                        var n = t[0];
                        var r = t.length > 1 ? "." + t[1] : "";
                        var i = /(\d+)(\d{3})/;
                        while (i.test(n)) {
                            n = n.replace(i, "$1" + "," + "$2");
                        }
                        return n + r;
                    }
                    if (e < 0) {
                        var o = 0 - e;
                        o.toFixed(1);
                        o += "";
                        var t1 = o.split(".");
                        var n1 = t1[0];
                        var r1 = t1.length > 1 ? "." + t1[1] : "";
                        var i1 = /(\d+)(\d{3})/;
                        while (i1.test(n1)) {
                            n1 = n1.replace(i1, "$1" + "," + "$2");
                        }
                        return '-' + n1 + r1;
                    }
                    return e;
                }
            },
        string: {
                format: function (s) {
                    if (s) {
                        return s;
                    }
                    return '';
                },
                formatBoolean: function (s) {
                    if (s == true) return 'Có';
                    else return '';
                }
            },
        date: {
                baseDateTime: function () { return new Date(2010, 0, 1, 0, 0, 0, 0); },
                getSeconds: function (value) {
                    if (value) return parseInt((value.getTime() - this.baseDateTime().getTime()) / 1000);
                    return 0;
                },
                getDuration: function (date1, date2) { return parseInt((date1.getTime() - date2.getTime()) / 1000); },
                getDuration2: function (date1, date2) { return this.formatTimeFromSeconds(Math.abs(this.getDuration(date1, date2))); },
                getTime: function (seconds) {
                    if (seconds == 0) {
                        return '';
                    }
                    var date = this.baseDateTime();
                    date.setSeconds(seconds);
                    return date;
                },
                getTime2: function (minutes) {
                    if (minutes == 0) {
                        return '';
                    }
                    var date = this.baseDateTime();
                    date.setMinutes(minutes);
                    return date;
                },
                formatDateTime: function (value) {
                    if (value) {
                        return paddingDisplay2Number(value.getMonth() + 1) + '-' + paddingDisplay2Number(value.getDate()) + ' ' + paddingDisplay2Number(value.getHours()) + ':' + paddingDisplay2Number(value.getMinutes()) + ':' + paddingDisplay2Number(value.getSeconds());
                    }
                    return '';
                },
                formatDateTime2: function (value) {
                    if (value) {
                        if (value > 0) {
                            return this.formatDateTime(this.getTime(value));
                        }
                    }
                    return '';
                },
                formatDateTime3: function (value) {
                    if (value) {
                        return paddingDisplay2Number((value.getYear() + 1900) + '-' + paddingDisplay2Number(value.getMonth() + 1) + '-' + paddingDisplay2Number(value.getDate()) + ' ' + paddingDisplay2Number(value.getHours()) + ':' + paddingDisplay2Number(value.getMinutes()));
                    }
                    return '';
                },
                formatDateTime4: function (value) {
                    if (value) {
                        if (value > 0) {
                            return this.formatDateTime3(this.getTime(value));
                        }
                    }
                    return '';
                },
                formatDateTime5: function (value) {
                    if (value) {
                        return paddingDisplay2Number(value.getMonth() + 1) + '-' + paddingDisplay2Number(value.getDate()) + ' ' + paddingDisplay2Number(value.getHours()) + ':' + paddingDisplay2Number(value.getMinutes());
                    }
                    return '';
                },
                formatMeterTime: function (value) {
                    if (value) {
                        if (value > 0) {
                            return this.formatDateTime5(this.getTime(value));
                        }
                    }
                    return '';
                },
                formatDate: function (value) {
                    if (value) {
                        return paddingDisplay2Number(value.getYear() + 1900) + '-' + paddingDisplay2Number(value.getMonth() + 1) + '-' + paddingDisplay2Number(value.getDate());
                    }
                    return '';
                },
                formatDate2: function (value) {
                    if (value) {
                        var date = new Date(value);
                        return paddingDisplay2Number(date.getYear() + 1900) + '-' + paddingDisplay2Number(date.getMonth() + 1) + '-' + paddingDisplay2Number(date.getDate());
                    }
                    return '';
                },
                formatDate3: function (value) {
                    if (value) {
                        var date = Util.date.getTime(value);
                        return paddingDisplay2Number(date.getYear() + 1900) + '-' + paddingDisplay2Number(date.getMonth() + 1) + '-' + paddingDisplay2Number(date.getDate());
                    }
                    return '';
                },
                formatTime: function (value) {
                    if (value) {
                        return paddingDisplay2Number(value.getHours()) + ':' + paddingDisplay2Number(value.getMinutes()) + ':' + paddingDisplay2Number(value.getSeconds());
                    }
                    return '';
                },
                formatTime2: function (value) {
                    if (value) {
                        return paddingDisplay2Number(value.getHours()) + ':' + paddingDisplay2Number(value.getMinutes());
                    }
                    return '';
                },
                formatTime3: function (seconds) {
                    return this.formatTime2(this.getTime(seconds));
                },
                formatTime4: function (minutes) {
                    return this.formatTime2(this.getTime2(minutes));
                },
                formatTimeFromSeconds: function (value) {
                    if (value > 0) {
                        var results = '';
                        var days = parseInt(value / 86400);
                        var pad = value % 86400;
                        if (days > 0) {
                            results = days + 'd ';
                        }
                        results = results + paddingDisplay2Number(parseInt(pad / 3600)) + ':' + paddingDisplay2Number(parseInt((pad % 3600) / 60)) + ':' + paddingDisplay2Number(parseInt((pad % 3600) % 60));
                        return results;
                    }
                    return '';
                },
                formatTimeFromSeconds2: function (value) {
                    if (value > 0) {
                        var results = '';
                        var days = parseInt(value / 86400);
                        var pad = value % 86400;
                        if (days > 0) {
                            results = days + 'd ';
                        }
                        results = results + paddingDisplay2Number(parseInt(pad / 3600)) + ':' + paddingDisplay2Number(parseInt((pad % 3600) / 60));
                        return results;
                    }
                    return '';
                }
            }
    };
function createPopOverTopMenu() {
    $('.top-menu a.pasgerRunning').on('click', function () {
        $.get(Url.get("Home/GetVehiclePassengerRunningForTopbar"), null, function (data) {
            var html = '<div class="content"><table class="popover-table table-striped"><tr class="title"><td>Số hiệu xe</td><td>Mã tài</td><td>Vận tốc(Km/h)</td><td>Quãng đường</td><td>Số tiền</td><td>Số cuốc</td><td>Doanh thu</td></tr>';
            data = data.sort(sortbyIndex(2));
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    html += '<tr><td>' + data[i][1] + '</td><td title="' + Util.string.format(data[i][3]) + '">' + Util.string.format(data[i][2]) + '</td><td>' + parseInt(data[i][4] / 100) + '</td><td>' + Util.distance.gps.formatNoUnit(data[i][5]) + '</td><td>' + Util.number.format(data[i][6]) + '</td><td>' + data[i][7] + '</td><td>' + Util.number.format(data[i][8]) + '</td></tr>';
                }
            }
            html += '</table></div>';
            $('.div-pasgerRunning').html(html);
        });
    });
    $('.top-menu a.pasgerStop').on('click', function () {
        $.get(Url.get("Home/GetVehiclePassengerIdleForTopbar"), null, function (data) {
            var html = '<div class="content"><table class="popover-table table-striped"><tr class="title"><td>Số hiệu xe</td><td>Mã tài</td><td>Tg dừng</td><td>Quãng đường</td><td>Số tiền</td><td>Số cuốc</td><td>Doanh thu</td></tr>';
            data = data.sort(sortbyIndex(2));
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    html += '<tr><td>' + data[i][1] + '</td><td title="' + Util.string.format(data[i][3]) + '">' + Util.string.format(data[i][2]) + '</td><td>' + Util.date.formatDateTime2(data[i][4]) + '</td><td>' + Util.distance.gps.formatNoUnit(data[i][5]) + '</td><td>' + Util.number.format(data[i][6]) + '</td><td>' + data[i][7] + '</td><td>' + Util.number.format(data[i][8]) + '</td></tr>';
                }
            }
            html += '</table></div>';
            $('.div-pasgerStop').html(html);
        });
    });
    $('.top-menu a.freeRunnung').on('click', function () {
        $.get(Url.get("Home/GetVehicleFreeRunningForTopbar"), null, function (data) {
            var html = '<div class="content"><table class="popover-table table-striped"><tr class="title"><td>Số hiệu xe</td><td>Mã tài</td><td>Vận tốc(Km/h)</td><td>QĐ không khách</td><td>TG trả khách</td><td>Số cuốc</td><td>Doanh thu</td></tr>';
            data = data.sort(sortbyIndex(2));
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    html += '<tr><td>' + data[i][1] + '</td><td title="' + Util.string.format(data[i][3]) + '">' + Util.string.format(data[i][2]) + '</td><td>' + parseInt(data[i][4] / 100) + '</td><td>' + Util.distance.gps.formatNoUnit(data[i][5]) + '</td><td>' + Util.date.formatDateTime2(data[i][6]) + '</td><td>' + data[i][7] + '</td><td>' + Util.number.format(data[i][8]) + '</td></tr>';
                }
            }
            html += '</table></div>';
            $('.div-freeRunnung').html(html);
        });
    });
    $('.top-menu a.freeStop').on('click', function () {
        $.get(Url.get("Home/GetVehicleFreeIdleForTopbar"), null, function (data) {
            var html = '<div class="content"><table class="popover-table table-striped"><tr class="title"><td>Số hiệu xe</td><td>Mã tài</td><td>TG dừng</td><td>TG trả khách</td><td>Số cuốc</td><td>Doanh thu</td></tr>';
            data = data.sort(sortbyIndex(2));
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    html += '<tr><td>' + data[i][1] + '</td><td title="' + Util.string.format(data[i][3]) + '">' + Util.string.format(data[i][2]) + '</td><td>' + Util.date.formatDateTime2(data[i][4]) + '</td><td>' + Util.date.formatDateTime2(data[i][5]) + '</td><td>' + data[i][6] + '</td><td>' + Util.number.format(data[i][7]) + '</td></tr>';
                }
            }
            html += '</table></div>';
            $('.div-freeStop').html(html);
        });
    });
    $('.top-menu a.freeOff').on('click', function () {
        $.get(Url.get("Home/GetVehicleFreePowerOffForTopbar"), null, function (data) {
            var html = '<div class="content"><table class="popover-table table-striped"><tr class="title"><td>Số hiệu xe</td><td>Mã tài</td><td>TG tắt máy</td><td>Tg trả khách</td><td>Số cuốc</td><td>Doanh thu</td></tr>';
            data = data.sort(sortbyIndex(2));
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    html += '<tr><td>' + data[i][1] + '</td><td title="' + Util.string.format(data[i][3]) + '">' + Util.string.format(data[i][2]) + '</td><td>' + Util.date.formatDateTime2(data[i][4]) + '</td><td>' + Util.date.formatDateTime2(data[i][5]) + '</td><td>' + data[i][6] + '</td><td>' + Util.number.format(data[i][7]) + '</td></tr>';
                }
            }
            html += '</table></div>';
            $('.div-freeOff').html(html);
        });
    });
}
function getBoolean(obj) {
    if (obj == null || obj == false) {
        return '<input type="checkbox" disabled="disabled" class="disabled" readonly/>';
    } else {
        return '<input type="checkbox" disabled="disabled" class="disabled" checked readonly/>';
    }
}

function getString(obj) {
    if (obj > 1)
        return 'Có';
    return '';
}
function formatValueNull(obj) {
    if (obj == null) {
        return '';
    }
    return obj;
}
function changeLanguage(id) {
    $.post(Url.get('Home/Language'), { id: id }, function () {
        setCookie('lan', id);
        document.location.href = document.location.href;
    });
}
function runningFormatter(value, row, index) {
    index++;
    return index;
}
function formatDateTime(e) {
    if(e) {
        var date = new Date(parseInt(e.substr(6)));
        return paddingDisplay2Number(date.getDate())+
            '-'+
            paddingDisplay2Number(date.getMonth()+1)+
            ' '+
            paddingDisplay2Number(date.getHours())+
            ':'+
            paddingDisplay2Number(date.getMinutes());
    }
    return '';
}