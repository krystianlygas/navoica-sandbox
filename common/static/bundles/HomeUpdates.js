(function(e, a) { for(var i in a) e[i] = a[i]; }(window, webpackJsonp([20],{

/***/ "./openedx/features/course_experience/static/course_experience/js/HomeUpdates.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeUpdates", function() { return HomeUpdates; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery_cookie__ = __webpack_require__("./common/static/js/vendor/jquery.cookie.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery_cookie___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery_cookie__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* globals $ */


var HomeUpdates = // eslint-disable-line import/prefer-default-export
function HomeUpdates(options) {
    _classCallCheck(this, HomeUpdates);

    var pastDate = new Date();
    var cookieExpiresInDays = 14;
    pastDate.setDate(pastDate.getDate() - cookieExpiresInDays);
    $(options.messageContainer).each(function (index, target) {
        var updateDateString = $(target).find($('.localized-datetime')).data('datetime');
        var updateDate = Date.parse(updateDateString);
        if (pastDate.getTime() > updateDate) {
            $(target).hide();
        }
    });

    var cookieElements = $.cookie('update-message');
    if (cookieElements) {
        var cookieElementList = cookieElements.split(',');
        cookieElementList.forEach(function (id) {
            $('#update-message-' + id).hide();
        });
    }
    $(options.dismissButton).click(function (event) {
        var updateMessageId = $(event.target).closest($('.update-message')).data('id');
        var cookieElementsBuilder = $.cookie('update-message');
        if (cookieElementsBuilder) {
            cookieElementsBuilder = cookieElementsBuilder + ',' + updateMessageId;
        } else {
            cookieElementsBuilder = updateMessageId;
        }
        $.cookie('update-message', cookieElementsBuilder, { expires: cookieExpiresInDays });
        $('#update-message-' + updateMessageId).hide();
    });
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

(function() { module.exports = window["jQuery"]; }());

/***/ })

},["./openedx/features/course_experience/static/course_experience/js/HomeUpdates.js"])));
//# sourceMappingURL=HomeUpdates.js.map