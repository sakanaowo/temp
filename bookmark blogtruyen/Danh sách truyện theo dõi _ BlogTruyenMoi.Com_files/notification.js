
var angularApp = angular.module('angularApp', []);

if (_tokenUser.length > 0) {
    angularApp.controller('notificationCtrl', function ($scope, $http) {
        $scope.notiMessage = 0;
        $scope.notiInformation = 0;
        $scope.notiBookmark = 0;

        $scope.pushNumberNotify = function(type, number) {
            if (type == "message")
                $scope.notiMessage += number;
            else if (type == "information")
                $scope.notiInformation += number;
            else 
                $scope.notiBookmark += number;
        };
    });

    $.connection.hub.url = _signalRUrl;
    var notification = $.connection.chatHub;

    notification.client.recieveNotify = function (type) {
        angular.element($('#toolbar .notification')).scope().pushNumberNotify(type, 1);
        angular.element($('#toolbar .notification')).scope().$apply();
    };

    $.connection.hub.start().done(function () {
        notification.server.addClient(_tokenUser, false);
    });

    $('#btnNotifyBookmark').click(function (event) {
        event.preventDefault();
        HideNotifyPopup();
        var iframeUrl = $(this).data('iframeurl');
        var thisUrl = $(this).data('url');
        ShowNotifyPopup("THEO DÕI TRUYỆN", iframeUrl, thisUrl);
    });

    $('#btnNotifyInfo').click(function (event) {
        event.preventDefault();
        HideNotifyPopup();
        var iframeUrl = $(this).data('iframeurl');
        ShowNotifyPopup("THÔNG BÁO", iframeUrl, '');

        var notifyCount = $('span', $(this)).text();
        angular.element($('#toolbar .notification')).scope().pushNumberNotify('information', -notifyCount);
        angular.element($('#toolbar .notification')).scope().$apply();
    });

    function ShowNotifyPopup(title, iframeUrl, thisUrl) {
        var popupContent = '';
        if (thisUrl != '') {
            popupContent = '<div id="notifyPopup" class="alpha60"><a href=' + thisUrl + '><h3>' + title + '</h3></a><div id="notifyPopupIframeWrapper"><iframe src="' + iframeUrl + '" height="30"></iframe></div></div>';
        }
        else {
            popupContent = '<div id="notifyPopup" class="alpha60"><h3>' + title + '</h3><div id="notifyPopupIframeWrapper"><iframe src="' + iframeUrl + '" onLoad="autoResizeIframe(\'#notifyPopupIframeWrapper\')" height="30"></iframe></div></div>';
        }
        $('.notification #notifyPopup').remove();
        $('.notification').append(popupContent);
    }

    function HideNotifyPopup() {
        $('#notifyPopup').remove();
    }

    //#region

    notification.client.clearSession = function () {
        $.post("/Account/JsonClearSession", function (data) {  });
    };   

    //#endregion

    $(function () {
        $.ajax({
            url: _urlGetNotify,
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            success: function (resObj) {
                angular.element($('#toolbar .notification')).scope().pushNumberNotify('message', resObj.CountMessage);
                angular.element($('#toolbar .notification')).scope().pushNumberNotify('information', resObj.CountNotify);
                angular.element($('#toolbar .notification')).scope().pushNumberNotify('bookmark', resObj.CountBookmark);
                angular.element($('#toolbar .notification')).scope().$apply();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    });
}

//#region Manga Vote

angularApp.controller('MangaDetailCtrl', function ($scope) {

    $scope.FlagLike = 0;
    $scope.FlagDisLike = 0;

    $scope.TotalLike = 0;
    $scope.TotalDisLike = 0;

    $scope.isLike = 0;
    $scope.isDislike = 0;

    $scope.$watch("TotalLike", function () {
        $scope.cTotalLike = readIntToString($scope.TotalLike);
    });
    $scope.$watch("TotalDisLike", function () {
        $scope.cTotalDisLike = readIntToString($scope.TotalDisLike);
    });
    $scope.$watch("TotalLikeOrDisLike", function () {
        $scope.cTotalLikeOrDisLike = readIntToString($scope.TotalLikeOrDisLike);
    });

    $scope.$watch("isLike", function () {
        //$scope.isLike = $scope.isLike;
        //console.log($scope.isLike);
    });
    $scope.$watch("isDislike", function () {
        //$scope.isDislike = $scope.isDislike;
        //console.log($scope.isDislike);
    });

    $scope.clkLike = function ($event)
    {
        var that = angular.element($event.currentTarget);
        $.post("/ajax/Manga/AjaxLike", { mangaId: $(that).data('id') }, function (data) {
            if (data.status) {
                if ($(that).hasClass('active')) {
                    $(that).removeClass('active').attr('title', 'Like');
                    $scope.TotalLike = $scope.TotalLike - 1;
                    $scope.isLike = 0;
                } else {
                    $(that).addClass('active').attr('title', 'Un Like');
                    $scope.TotalLike = $scope.TotalLike + 1;
                    $scope.isLike = 1;

                    //Ktra nếu có DisLike => Hủy DisLike (-1)
                    if ($scope.isDislike == 1) {
                        $(that).siblings('.bt-dislike').removeClass('active').attr('title', 'DisLike');
                        $scope.TotalDisLike = $scope.TotalDisLike - 1;
                    }
                }
                $scope.TotalLikeOrDisLike = $scope.TotalLike + $scope.TotalDisLike;
                $scope.cTotalLikeOrDisLike = readIntToString($scope.TotalLikeOrDisLike);
                $scope.$apply();
            }
            else {
                alert(data.message);
            }
        });
        
    }

    $scope.clkDisLike = function ($event) {
        var that = angular.element($event.currentTarget);
        $.post("/ajax/Manga/AjaxDisLike", { mangaId: $(that).data('id') }, function (data) {
            if (data.status) {
                if ($(that).hasClass('active')) {
                    $(that).removeClass('active').attr('title', 'DisLike');
                    $scope.TotalDisLike = $scope.TotalDisLike - 1;
                    $scope.isDislike = 0;
                } else {
                    $(that).addClass('active').attr('title', 'Un DisLike');
                    $scope.TotalDisLike = $scope.TotalDisLike + 1;
                    $scope.isDislike = 1;

                    //Ktra nếu có Like => Hủy LIke (-1)
                    if($scope.isLike == 1)
                    {
                        $(that).siblings('.bt-like').removeClass('active').attr('title', 'Like');
                        $scope.TotalLike = $scope.TotalLike - 1;
                    }
                }
                $scope.TotalLikeOrDisLike = $scope.TotalLike + $scope.TotalDisLike;
                $scope.cTotalLikeOrDisLike = readIntToString($scope.TotalLikeOrDisLike);
                $scope.$apply();
            }
            else {
                alert(data.message);
            }
        });
    }
});

//#endregion