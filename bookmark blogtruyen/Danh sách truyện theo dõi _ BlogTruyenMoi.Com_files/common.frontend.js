var sidebarOrder = $.cookie("BTSidebarOrder");
var hiddenSidebarWidget = $.cookie("BTHiddenSidebarWidget");
if (hiddenSidebarWidget == undefined) { hiddenSidebarWidget = ""; }

var loading = '<div class="overlay-content-property">\
                <img src="/Content/images/loading.gif" class="img-load" alt="loading..." />\
                <p>Đang tải...</p>\
            </div>';

function readIntToString(number) {
    if (Number(number) > 1000000000)
        return (Number(number) / 1000000000).toFixed(1) + "b";
    else if (Number(number) > 1000000)
        return (Number(number) / 1000000).toFixed(1) + "m";
    else if (Number(number) > 1000)
        return (Number(number) / 1000).toFixed(1) + "k";
    else
        return number.toFixed(0);
}
function ShowLoading() {
    $('#loadingWithOverlay').show();
}

function HideLoading() {
    $('#loadingWithOverlay').hide();
}

$('.btChangeView').on('click', function () {
    var val = $(this).data('type');
    if (val != undefined && val != '') {
        // $.cookie("bt_view_type", val, { path: '/' });
		setCookie("bt_view_type", val, 365*24*60);
        window.location.href = window.location.href;
    }
});

function setCookie(cname, cvalue, exmins) {
    const d = new Date();
    d.setTime(d.getTime() + (exmins * 6e4));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function autoResizeIframe(element, height) {
    var iframe = $('iframe', $(element));
    $(element).height(height);
    $(iframe).height(height);
}

window.addEventListener('message', function (event) {
    try {
        var jsonResult = event.data;
        switch (jsonResult.Function) {
            case 'autoResizeIframe':
                autoResizeIframe(jsonResult.element, jsonResult.height);
                break;
        }
    }
    catch (e) {
        //console.log("error: " + e);
    };
});

$(document).mouseup(function (e) {
    var container = $('#notifyPopup');
    if (container.length > 0) {
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.remove();
        }
    }

});

// Plugin Spoiler - TinyMce
function jsSpoiler($this) {
    $that = $($this).parent().next();
    $($that).slideToggle('slow', function () {
        if ($(this).is(':visible')) {
            $($this).text('Click vào đây để ẩn nội dung')
        }
        else {
            $($this).text('Click vào đây để hiện nội dung')
        }
    });
}

$('.ajax-paging').on('click', '.pagination a', function () {
    var container = $(this).closest('.ajax-paging');
    //alert(container);
    container.load($(this).attr('href').replace(' ', '%20'), function () { });
    return false;
})

$('.ajax-content').each(function (e) {
    $(this).load($(this).attr("data-url"), function () { });
})

$('.mobile-menu').click(function () {
    $('.top-menu').toggle();
});

$('.nav-headermenu .iconc').click(function () {
    $('.menu').toggle();
});

$(".arrow-orderby").click(function () {
    listChapters = $('#list-chapters');
    listChapters.children().each(function (i, row) { listChapters.prepend(row) })

    if ($(this).hasClass("icon-circle-arrows-top")) {
        $(this).removeClass("icon-circle-arrows-top");
        $(this).addClass("icon-circle-arrows-bottom");
    }
    else {
        $(this).removeClass("icon-circle-arrows-bottom");
        $(this).addClass("icon-circle-arrows-top");
    }
});

//------------ tiptip -----------//
$(".tiptip").removeAttr("title");
if ($.fn.tipTip) $(".tiptip").each(function () {
    var tiptipid = $(this).attr("data-tiptip");
    var content = $("#" + tiptipid).html();
    $(this).tipTip({
        defaultPosition: "right",
        maxWidth: "500px",
        content: content
    });
});

function LoadTooltip() {
    $(".tiptip a").removeAttr("title");
    if ($.fn.tipTip) $(".tiptip").each(function () {
        var tiptipid = $(this).attr("data-tiptip");
        var content = $("#" + tiptipid).html();
        $(this).tipTip({
            maxWidth: "500px",
            content: content,
            defaultPosition: "right"
        });
    });
}

//------------ search -----------//
$(".frm-q-search").submit(function (e) {
    e.preventDefault();
    QuickSearch();
});
$(".frm-q-search input[type=text]").keyup(function () {
    QuickSearch();
});
function QuickSearch() {
    var keyword = $(".frm-q-search input[type=text]").val();
    if (keyword.length > 0) {
        $(".frm-q-search .result").show();
        setTimeout(function () {
            if (keyword == $(".frm-q-search input[type=text]").val()) {
                $.post("/ajax/Search/AjaxQuickSearch", { keyword: keyword }, function (data) {
                    $(".frm-q-search .result").html(data);
                });
            }
        }, 500);
    }
    else {
        $(".frm-q-search .result").hide();
    }
}
// ---------- tab --------------//
$(".tabs > div").hide();
$(".tabs > div:first").show();
$(".tabs > ul > li:first").addClass("active");
$(".tabs > ul > li > a").click(function (e) {
    e.preventDefault();
    var TabContentID = $(this).attr("href");

    $(".tabs > ul > li").removeClass("active");
    $(this).parent().addClass("active");

    $(this).parent().parent().parent().find("> div").hide();
    $(TabContentID).show();
});

/* ---------- Show Comments ---------- */
$(".tab-comment").click(function (e) {
    e.preventDefault();
    if (!$(this).hasClass("selected")) {
        var tab_id = $(this).attr("href");
        $.cookie(_CookieKeyCommentType, tab_id.replace('#', ''))

        $("section.comments > div").hide();
        $(tab_id).show();

        $(".selected").removeClass("selected");
        $(this).addClass("selected");
    }
});

//#region Xem truyện

//$('.manga-detail').on('click', '.btLike', function (e) {
//    var that = $(this);
//    e.preventDefault();
//    $.post("/ajax/Manga/AjaxLike", { mangaId: $(that).data('id') }, function (data) {
//        if (data.status) {
//            var total = Number($('#totalLike').data('total'));
//            if ($(that).hasClass('active')) {
//                $('#totalLike').text(' ' + readIntToString(Number(total - 1)));
//                $(that).removeClass('active').attr('title', 'Like');
//                $('#totalLike').data('total', Number(total - 1))
//            } else {
//                $('#totalLike').text(' ' + readIntToString(Number(total + 1)));
//                $(that).addClass('active').attr('title', 'Un Like');
//                $('#totalLike').data('total', Number(total + 1))
//            }
//        }
//        else {
//            alert(data.message);
//        }
//    });
//});

//$('.manga-detail').on('click', '.btDisLike', function (e) {
//    var that = $(this);
//    e.preventDefault();
//    $.post("/ajax/Manga/AjaxDisLike", { mangaId: $(that).data('id') }, function (data) {
//        if (data.status) {
//            var total = Number($('#totalDislike').data('total'));
//            if ($(that).hasClass('active')) {
//                $('#totalDislike').text(' ' + readIntToString(Number(total - 1)));
//                $(that).removeClass('active').attr('title', 'DisLike');
//                $('#totalDislike').data('total', Number(total - 1))
//            } else {$('#totalDislike').data('total')
//                $('#totalDislike').text(' ' + readIntToString(Number(total + 1)));
//                $(that).addClass('active').attr('title', 'Un DisLike');
//                $('#totalDislike').data('total', Number(total + 1))
//            }
//        }
//        else {
//            alert(data.message);
//        }
//    });
//});

//var app = angular.module('mangaDetail', []);
//app.controller('mangaVoteCtrl', function ($scope) {
//    var percent = $scope.TotalLike * 100 / $scope.TotalLikeOrDisLike

//    $scope.PercentValue = percent;
//});
//var app = angular.module('myApp', []);
//app.controller('myCtrl', function ($scope) {
//    $scope.firstName = "John";
//    $scope.lastName = "Doe";
//});


//#endregion

/**Cate*/
$('.listMangaByCate').on('click', '.reOrderManga', function () {
    var that = $(this);
    var orderBy = $(that).data('type');
    var cateId = $(that).data('id');

    if ($(that).hasClass('selected') == false) {
        $('#CateId').val(cateId);
        $('#OrderBy').val(orderBy);
        LoadMangaPage(1);
    }
});

function LoadMangaPage(p) {
    var orderBy = $('#OrderBy').val();
    var cateId = $('#CateId').val();

    $.get('/ajax/Category/AjaxLoadMangaByCategory?id=' + cateId + '&orderBy=' + orderBy + '&p=' + p, function (data) {
        $('.listMangaByCate').html(data);
        LoadTooltip();
    });
}

//#region Author

$('.listMangaByAuthor').on('click', '.reOrderManga', function () {
    var that = $(this);
    var orderBy = $(that).data('type');
    var authorId = $(that).data('id');

    if ($(that).hasClass('selected') == false) {
        $('#AuthorId').val(authorId);
        $('#OrderBy').val(orderBy);
        LoadMangaByAuthorPage(1);
    }
});

function LoadMangaByAuthorPage(p) {
    var orderBy = $('#OrderBy').val();
    var authorId = $('#AuthorId').val();

    $.get('/ajax/Author/AjaxLoadMangaByAuthor?id=' + authorId + '&orderBy=' + orderBy + '&p=' + p, function (data) {
        $('.listMangaByAuthor').html(data);
        LoadTooltip();
    });
}

//#endregion

//#region List Manga

/**Cate*/
$('.listManga').on('click', '.reOrderManga', function () {
    var that = $(this);
    var orderBy = $(that).data('type');
    var key = $(that).data('key');

    if ($(that).hasClass('selected') == false) {
        $('#Key').val(key);
        $('#OrderBy').val(orderBy);
        LoadListMangaPage(1);
    }
});

function LoadListMangaPage(p) {
    var orderBy = $('#OrderBy').val();
    var key = $('#Key').val();

    $.get('/ajax/Search/AjaxLoadListManga?key=' + key + '&orderBy=' + orderBy + '&p=' + p, function (data) {
        $('.listManga').html(data);
        LoadTooltip();
    });
}

//#endregion

/**Search*/
$(function () {
    $(".CategoryFilter .item").click(function () {
        var CategoryID = $(this).attr("data-id");
        var icon_ele = $(this).find("span");
        var cssclass = $(icon_ele).attr("class");
        var txtCategorySelected = $("input[name=CategorySelected]");
        var txtCategoryExcluded = $("input[name=CategoryExcluded]");

        if (cssclass == "icon-checkbox") {
            $(icon_ele).attr("class", "icon-tick");
            var ids = $(txtCategorySelected).val() + ',' + CategoryID;
            $(txtCategorySelected).val(ids.replace(/^,/, '').replace(/,$/, ''));
        }
        else if (cssclass == "icon-tick") {
            $(icon_ele).attr("class", "icon-cross");
            var ids = ',' + $(txtCategorySelected).val() + ',';
            ids = ids.replace(',' + CategoryID + ',', ',').replace(/^,/, '').replace(/,$/, '');
            $(txtCategorySelected).val(ids);

            ids = $(txtCategoryExcluded).val() + ',' + CategoryID;
            $(txtCategoryExcluded).val(ids.replace(/^,/, '').replace(/,$/, ''));
        }
        else {
            $(icon_ele).attr("class", "icon-checkbox");
            var ids = ',' + $(txtCategoryExcluded).val() + ',';
            ids = ids.replace(',' + CategoryID + ',', ',').replace(/^,/, '').replace(/,$/, '');
            $(txtCategoryExcluded).val(ids);
        }
    });

    $('a#ShowSearchForm').click(function () {
        var option = $(this).attr('data-option');
        if (option == 1) {
            $(this).text("Ẩn khung tìm kiếm");
            $('.advanced-search form').show();
            $(this).attr('data-option', 0);
        }
        else {
            $(this).text("Hiện khung tìm kiếm");
            $('.advanced-search form').hide();
            $(this).attr('data-option', 1);
        }
    });

    $('#themeChanger a').click(function (e) {
        var theme = $(this).data("theme-sysname");
        $.cookie("blogtruyen_theme", theme, { path: '/' });
        window.location.href = window.location.href;
    });



    $(".sidebar").sortable({
        connectWith: ".sidebar",
        handle: ".portlet-header",
        cancel: ".portlet-toggle",
        placeholder: "portlet-placeholder ui-corner-all",
        update: function () {
            var strCookieContent = "";

            $('.sidebar > div').each(function () {
                if (strCookieContent.length == 0)
                    strCookieContent += $(this).attr('data-cookie-id');
                else
                    strCookieContent += ',' + $(this).attr('data-cookie-id');
            });

            $.cookie("BTSidebarOrder", strCookieContent);
        }
    });

    $(".portlet")
      .find(".portlet-header")
        .addClass("ui-widget-header")
        .prepend("<span class='ui-icon ui-icon-plusthick portlet-toggle'></span>");

    $(".portlet-toggle").click(function () {
        PortletToggleClick($(this));
    });
    
    if (sidebarOrder !== undefined && sidebarOrder.length > 0)
    {
        var widgets = sidebarOrder.split(',');
        for (var i = 0; i < widgets.length; i++)
        {
            $('.sidebar').append($('.sidebar > div[data-cookie-id="' + widgets[i] + '"]'));
        }
    }

    $('.sidebar > div').each(function () {
        var widgetId = $(this).attr('data-cookie-id');
        if (hiddenSidebarWidget.indexOf(',' + widgetId) < 0)
        {
            PortletToggleClick($(this).find(".portlet-toggle"));
        }
    });
});

function PortletToggleClick(element) {
    var icon = $(element);
    var widgetId = icon.closest(".portlet").attr('data-cookie-id');
    var widgetContent = icon.closest(".portlet").find(".portlet-content");

    if (widgetContent.is(':visible')) {
        hiddenSidebarWidget += ',' + widgetId;
    }
    else {
        hiddenSidebarWidget = hiddenSidebarWidget.replace(',' + widgetId, '');
    }

    icon.toggleClass("ui-icon-plusthick ui-icon-minusthick");
    widgetContent.toggle();

    $.cookie("BTHiddenSidebarWidget", hiddenSidebarWidget);
}

//#region Trang thành viên
function AjaxLoadTruyenDaDang(p) {
    var UserID = $('#UserId').val();
    $.get('/ajax/Member/AjaxLoadMangaCreated?id=' + UserID + '&p=' + p, function (data) {
        $("#truyendadang").html(data);
        LoadTooltip();
    });
}
function AjaxLoadTruyenUpdate(p) {
    var UserID = $('#UserId').val();
    $.get('/ajax/Member/AjaxLoadMangaShared?id=' + UserID + '&p=' + p, function (data) {
        $("#truyenupdate").html(data);
        LoadTooltip();
    });
}
function AjaxLoadForumPost(p) {// Load pài viết diễn đàn
    var UserID = $('#UserId').val();
    $.get('/ajax/Member/AjaxLoadForumPost?id=' + UserID + '&p=' + p, function (data) {
        $("#forumpost").html(data);
        LoadTooltip();
    });
}

function AjaxLoadChapDaDang(p) {
    var UserID = $('#UserId').val();
    $.get('/ajax/Member/AjaxLoadChapterCreated?id=' + UserID + '&p=' + p, function (data) {
        $("#chuongdadang").html(data);
        LoadTooltip();
    });
}

$('#ajaxTruyenUpdate').click(function () {
    if ($('#truyenupdate').has("div.overlay-content").length > 0) {
        AjaxLoadTruyenUpdate(1);
    }
});
$('#ajaxForumPost').click(function () {
    if ($('#forumpost').has("div.overlay-content").length > 0) {
        AjaxLoadForumPost(1);
    }
});
$('#ajaxChuongDaDang').click(function () {
    if ($('#chuongdadang').has("div.overlay-content").length > 0) {
        AjaxLoadChapDaDang(1);
    }
});

function LoadChapterHistoryDetail(date) {
    $("#modalChapter").html(loading);
    $('#text_header_chapter').text('BlogTruyen.Com - Chương đã đăng trong ngày ' + date);
    $('#modalChapterDetail').modal('show');
    var userId = $('#UserId').val();
    $.get('/ajax/Member/AjaxGetChapterByDateFromUserId?userId=' + userId + "&date=" + date, function (data) {
        $('#modalChapter').html(data);
    });
}

//#endregion

//#region Trang nhóm dịch

$('.translateTeamPage').on('click', '.btnApprove', function () {
    var that = $(this);
    var teamId = $(that).data('teamid');
    var userId = $(that).data('userid');
    var approve = $(that).data('approve');
    var transrole = $(that).data('transrole');

    $.post("/ajax/TranslateTeam/AjaxApprove", {
        teamId: teamId,
        userId: userId,
        approve: approve,
        transrole: transrole
    }, function (data) {
        if (data.status) {
            alert('Thành công!');
            if (approve) {
                window.location.href = window.location.href;
            }
            else {
                $('.user-' + userId).remove();
            }
        }
        else {
            alert(data.message);
        }
    });
})
$('.translateTeamPage').on('click', '.btnLeaveGroup', function () {
    if (confirm('Bạn có chắc không?'))
    {
        var that = $(this);
        var teamId = $(that).data('id');

        $.post("/ajax/TranslateTeam/AjaxLeaveGroup", {
            teamId: teamId
        }, function (data) {
            if (data.status) {
                window.location.href = window.location.href;
            }
            else {
                alert(data.message);
            }
        });
    }
})

$('#btn-registy-leader').click(function (e) {
    var that = $(this);
    e.preventDefault();
    $.post("/ajax/TranslateTeam/AjaxRegistryLeader", { teamId: $(that).data('teamid') }, function (data) {
        if (data.status) {
            alert('Xác nhận thành công! Vui lòng chờ BQT duyệt lại!');
            window.location.href = window.location.href;
        }
        else {
            alert(data.message);
        }
    });
});

$('#btn-registy-member').click(function (e) {
    var that = $(this);
    e.preventDefault();
    $.post("/ajax/TranslateTeam/AjaxRegistryMember", { teamId: $(that).data('teamid') }, function (data) {
        if (data.status) {
            alert('Nộp đơn thành công! Vui lòng chờ leader duyệt lại!');
            window.location.href = window.location.href;
        }
        else {
            alert(data.message);
        }
    });
});

function LoadStory(p) {
    $.get('/ajax/TranslateTeam/AjaxLoadMangaByTranslateTeam?id=' + GroupID + '&p=' + p, function (data) {
        $(".ListStoryPage").html(data);
        LoadTooltip();
    });
}

$('.btnShowChangeLeader').on('click', function () {
    $('#modalChangeLeader').modal('show');
});

$('#btnSubmitChangeLeader').on('click', function () {
    if (confirm('Bạn có chắc không?')) {
        var that = $(this);
        var userId = $('#txtChangeLeader').val();
        if(userId != '' && userId != null)
        {
            $.post("/ajax/TranslateTeam/AjaxChangeLeader", { teamId: $(that).data('teamid'), userId: userId }
                ,function (data) {
                if (data.status) {
                    window.location.href = window.location.href;
                }
                else {
                    alert(data.message);
                }
            });
        }
    }
});

//#endregion

//#region Bookmart

$('#btnBookmart').on('click', '.titleClick', function () {
    var that = $(this);
    var type = $(that).data('id');
    $(that).hide().siblings('.titleClick').show();
    if (type == 1)//choose-folder
    {
        $('.bookmart-create').hide();
        $('.bookmart-choose').show();
    } else {//create-folder
        $('.bookmart-create').show();
        $('.bookmart-choose').hide();
    }
});

$('#btnBookmart').on('click', '.btnCreateFolder', function () {
    var that = $(this);
    var txtFolder = $(that).siblings('.txtCreateFolder');

    if (txtFolder.val() == '') {
        alert('Vui lòng nhập tên thư mục');
        txtFolder.focus();
        return false;
    }


    $.post("/ajax/Manga/AjaxInsertBookmarkFolderName", { mangaId: $('#MangaId').val(), folderName: txtFolder.val() }, function (data) {
        if (data.status) {
            alert('Đã thêm vào bookmark thành công!');
            $(that).closest('.bookmart-area').html(loading).hide();
        }
        else {
            alert(data.message);
        }
    });

    return false;
});

$('#btnBookmart').on('change', '.lstfolder .mangachoose', function () {
    var that = $(this);
    var _val = $(this).val();

    $(that).closest('.bookmart-choose').find('#btnUpdateChoose').show();
});

$('#btnBookmart').on('click', '#btnUpdateChoose', function () {
    var that = $(this);
    var _val = $(that).siblings('.lstfolder').find('input[name="mangachoose"]:checked').val();

    $.post("/ajax/Manga/AjaxInsertBookmark", { mangaId: $('#MangaId').val(), folderId: _val }, function (data) {
        if (data.status) {
            //alert('Đã thêm vào bookmark thành công!');
            var htmlBookmark = '<span class="hideBookmart" data-folderid="' + _val + '"><i class="fa fa-bookmark red"></i> Xóa khỏi bookmark</span>';
            $(that).closest('.like-buttons').find('#btnBookmart').addClass('hidde-bookmark').html(htmlBookmark);
            $(that).closest('.bookmart-area').html(loading).hide();
        }
        else {
            alert(data.message);
        }
    });
});

$('.showBookmart').on('click', function () {
    var that = $(this);
    var auth = $(that).data('auth');
    if (auth == 0)
    {
        alert('Vui lòng đăng nhập để thực hiện chức năng này!');
        return false;
    }

    $(this).siblings('.bookmart-area').toggle();
    var mangaId = $('#MangaId').val();

    if ($(this).siblings('.bookmart-area').find('.overlay-content-property').length > 0) {
        $.get('/ajax/manga/LoadFolderBookmart?mangaId=' + mangaId, function (data) {
            $(that).siblings('.bookmart-area').html(data);
        });
    }
});

$('#btnBookmart').on('click', '.hideBookmart', function () {
    var that = $(this);
    if (confirm('Bạn có muốn xóa không?')) {
        var that = $(this);

        var mangaId = $('#MangaId').val();
        var folderId = $(that).data('folderid');

        $.post("/ajax/Manga/AjaxRemoveMangaBookmark", { mangaId: mangaId, folderId: folderId },
            function (data) {
                if (data.status) {
                    window.location.href = window.location.href
                }
                else {
                    alert(data.message);
                }
            });
    }
});

//#endregion

//#region Bookmark

$('.listBookmark').on('click', '.removeMangaBookmark', function () {

    if (confirm('Bạn có muốn xóa không?')) {
        ShowLoading();
        var that = $(this);

        var mangaId = $(that).data('mangid');
        var folderId = $(that).data('folderid');

        $.post("/ajax/Manga/AjaxRemoveMangaBookmark", { mangaId: mangaId, folderId: folderId },
            function (data) {
                HideLoading();

                if (data.status) {
                    $(that).closest('tr').hide().remove();
                }
                else {
                    alert(data.message);
                }
            });
    }
});

function UpdateBookmarkFolder(that) {
    var folderId = $(that).data('folderid');

    alert('Chức năng đang thực hiện');
}

$('#btn_save_bookmark_folder').on('click', function () {
    var folderName = $('#mBookmarkFolderName').val();
    var folderId = $('#mBookmarkFolderId').val();
    ShowLoading();

    $.post("/ajax/Manga/AjaxUpdateBookmarkFolder", { folderId: folderId, folderName: folderName },
            function (data) {
                HideLoading();
                if (data.status) {
                    alert('Đã cập nhật thành công!');
                    //window.location.reload();
                    window.location.href = window.location.href;
                }
                else {
                    alert(data.message);
                }
            });

    return false;
});


$('#btnSaveToBookmarkFolder').on('click', function () {
    var mangaIds = $('#mMangaIds').val();
    var newFolderId = $('#MoveToFolderId').val();
    var oldFolderId = $('#MoveFromFolderId').val();
    ShowLoading();

    $.post("/ajax/Manga/AjaxMoveMangaToBookmarkFolder", { oldFolderId: oldFolderId, newFolderId: newFolderId, ids: mangaIds },
            function (data) {
                $('#modal_move_manga_to_bookmark_folder').modal('hide');
                HideLoading();
                if (data.status) {
                    //alert('Đã cập nhật thành công!');
                    window.location.href = window.location.href;
                }
                else {
                    alert(data.message);
                }
            });

    return false;
});

$('#btnCreateBookmarkFolder').on('click', function () {
    $('#modalTitle').text('Thêm mới folder');
    $('#modal_change_bookmark_folder').modal('show');
});

//$('#btnSaveBookmarkFolder').on('click', function () {

//    var array = [];

//    $(".bookmarkFolderItem").each(function () {
//        var folderId = $(this).data('folderid');
//        var mangaIds = [];

//        $(this).find('.file').each(function () {
//            var mangaId = $(this).data('mangid');
//            mangaIds.push(mangaId);
//        });

//        array.push(folderId + ';' + mangaIds.join(','));

//    });

//    ShowLoading();

//    $.post("/ajax/Manga/AjaxUpdateMoveMangaInBookmarkFolder", { strData: array.join('-') },
//        function (data) {
//            HideLoading();
//            if (data.status) {

//            }
//            else {
//                alert(data.message);
//            }
//        });

//    //window.location.href = window.location.href;
//});

$('.selectAll').change(function () {
    var that = $(this).closest('table');

    $(that).find('input:checkbox[id^=' + this.value + ']').prop('checked', this.checked).change();
});

$('input:checkbox[id^=Bookmarks]').change(function () {
    var that = $(this).closest('.bookmarkFolder');
    if ($(that).find('input:checkbox[id^=Bookmarks]:checked').length > 0) {
        $(that).find('.btnActionBookmark').removeAttr('disabled');
    } else {
        $(that).find('.btnActionBookmark').attr('disabled', 'disabled');
    }
});

$('.listBookmark').on('click', '.chkIsRead', function () {
    var that = $(this);
    ShowLoading();

    var mangaId = $(this).data('mangid');
    var folderId = $(this).data('folderid');

    $.post("/ajax/Manga/AjaxCheckIsReadMangaBookmark", { mangaId: mangaId, folderId: folderId },
        function (data) {
            HideLoading();
            if (data.status) {
                if ($(that).closest('tr').find('.icon-file').hasClass('highlight')) {
                    $(that).closest('tr').find('.icon-file').removeClass('highlight');
                    $(that).attr('title', 'Đánh dấu chưa đọc');
                    $(that).children('.fa').removeClass('fa-check').removeClass('text-success').addClass('fa-eye-slash').addClass('text-black');
                } else {
                    $(that).closest('tr').find('.icon-file').addClass('highlight');
                    $(that).attr('title', 'Đánh dấu đã đọc');
                    $(that).children('.fa').removeClass('fa-eye-slash').removeClass('text-black').addClass('fa-check').addClass('text-success');
                }
            }
            else {
                alert(data.message);
            }
        });
});

$('.listBookmark').on('click', '.btnActionDeleteBookmark', function () {
    if (confirm('Bạn có muốn xóa không?')) {
        ShowLoading();
        var folderId = 0;
        $("li.bookmarkFolderId").each(function (index) {
            console.log($(this).hasClass('active'));
            if ($(this).hasClass('active')) {
                folderId = $(this).data('folderid');
            }
        });
        $.post("/ajax/Manga/AjaxDeleteBookmarkFolder", { folderId: folderId },
            function (data) {
                HideLoading();
                if (data.status) {
                    window.location.href = window.location.href;
                }
                else {
                    alert(data.message);
                }
            });
    }
});

$('.listBookmark').on('click', '.btnActionBookmark', function () {
    var that = $(this);
    var action = $(this).data('action');
    var folderId = $(this).closest('.bookmarkFolder').data('folderid');
    var dataArray = [];
    $('input:checkbox[id^=Bookmarks]').filter(':checked').each(function () {
        dataArray.push($(this).prev().val());
    });

    ShowLoading();
    if (action == 4)//move to new folder
    {
        if (dataArray.length == 0)
        {
            alert('Vui lòng chọn truyện để chuyển!');
            return;
        }

        //1. show popup 
        $('#modal_move_manga_to_bookmark_folder').modal('show');
        $('#MoveFromFolderId').val(folderId);
        $('#MoveToFolderId').val(folderId);
        $('#mMangaIds').val(dataArray.join(','));

        HideLoading();

        //2. choose folder and save data to folder is chose

    }else
    {
        //call ajax check is read or don't read or delete
        $.post("/ajax/Manga/AjaxActionExecuteMangaBookmark", { action: action, ids: dataArray.join(','), folderId: folderId },
            function (data) {
                HideLoading();
                if (data.status) {
                    window.location.href = window.location.href;
                }
                else {
                    alert(data.message);
                }
        });
    }
});


//#region

//------------ truyện 18+ -----------//
$('.story18').hover(function () {
    $(this).find(".imgBack").hide();
    $(this).find(".imgMain").show();
}, function () {
    $(this).find(".imgBack").show();
    $(this).find(".imgMain").hide();
});

$('.paging-new').on('change', 'select.slcPaging', function () {
    window.location.href = $(this).val()
});

$('.manga-detail .thumbnail img').removeAttr('onmouseover').removeAttr('onmouseout');


$('.qc-inner-move').each(function () {
    var str = $(this).html();

    var positionList = $(this).data('positionlist');
    var positionGrid = $(this).data('positiongrid');
    var positionChaper = $(this).data('positionchapter');

    if ($('.gridview').length > 0) {
        $($(this)).insertAfter('.gridview > .row > div:nth(' + positionGrid + ')');
    }
    else if ($('.listview').length > 0) {
        $($(this)).insertAfter('.listview > .row > div:nth(' + positionList + ')');
    }
});

loadSpoiler();
function loadSpoiler() {
    $('.spoiler').each(function (e) {
        if (!$(this).hasClass('loaded')) {
            $('<div class="top-spoiler"><a href="javascript:;" onclick="jsSpoiler(this)">Click vào đây để hiện nội dung</a></div>').insertBefore($(this));
        $(this).addClass('loaded');
        }
    })
}

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
