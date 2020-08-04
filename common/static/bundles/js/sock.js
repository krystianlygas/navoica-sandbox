(function(e, a) { for(var i in a) e[i] = a[i]; }(window, webpackJsonp([29],{

/***/ "./cms/static/js/sock.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./common/static/js/vendor/domReady.js"), __webpack_require__(0), __webpack_require__("./common/static/js/vendor/jquery.smooth-scroll.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (domReady, $) {
    'use strict';

    var toggleSock = function toggleSock(e) {
        e.preventDefault();

        var $btnShowSockLabel = $(this).find('.copy-show');
        var $btnHideSockLabel = $(this).find('.copy-hide');
        var $sock = $('.wrapper-sock');
        var $sockContent = $sock.find('.wrapper-inner');

        if ($sock.hasClass('is-shown')) {
            $sock.removeClass('is-shown');
            $sockContent.hide('fast');
            $btnHideSockLabel.removeClass('is-shown').addClass('is-hidden');
            $btnShowSockLabel.removeClass('is-hidden').addClass('is-shown');
        } else {
            $sock.addClass('is-shown');
            $sockContent.show('fast');
            $btnHideSockLabel.removeClass('is-hidden').addClass('is-shown');
            $btnShowSockLabel.removeClass('is-shown').addClass('is-hidden');
        }

        $.smoothScroll({
            offset: -200,
            easing: 'swing',
            speed: 1000,
            scrollElement: null,
            scrollTarget: $sock
        });
    };

    domReady(function () {
        // toggling footer additional support
        $('.cta-show-sock').bind('click', toggleSock);
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

(function() { module.exports = window["jQuery"]; }());

/***/ })

},["./cms/static/js/sock.js"])));
//# sourceMappingURL=sock.js.map