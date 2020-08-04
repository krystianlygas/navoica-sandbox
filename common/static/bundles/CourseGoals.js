(function(e, a) { for(var i in a) e[i] = a[i]; }(window, webpackJsonp([26],{

/***/ "./openedx/features/course_experience/static/course_experience/js/CourseGoals.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CourseGoals", function() { return CourseGoals; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* globals gettext */

var CourseGoals = // eslint-disable-line import/prefer-default-export

function CourseGoals(options) {
  _classCallCheck(this, CourseGoals);

  $('.goal-option').click(function (e) {
    var goalKey = $(e.target).data().choice;
    $.ajax({
      method: 'POST',
      url: options.goalApiUrl,
      headers: { 'X-CSRFToken': $.cookie('csrftoken') },
      data: {
        goal_key: goalKey,
        course_key: options.courseId,
        user: options.username
      },
      dataType: 'json',
      success: function success(data) {
        // LEARNER-2522 will address the success message
        $('.section-goals').slideDown();
        $('.section-goals .goal .text').text(data.goal_text);
        $('.section-goals select').val(data.goal_key);
        var successMsg = gettext('Thank you for setting your course goal to ' + data.goal_text.toLowerCase() + '!');
        if (!data.is_unsure) {
          // xss-lint: disable=javascript-jquery-html
          $('.message-content').html('<div class="success-message">' + successMsg + '</div>');
        } else {
          $('.message-content').parent().hide();
        }
      },
      error: function error() {
        // LEARNER-2522 will address the error message
        var errorMsg = gettext('There was an error in setting your goal, please reload the page and try again.');
        // xss-lint: disable=javascript-jquery-html
        $('.message-content').html('<div class="error-message"> ' + errorMsg + ' </div>');
      }
    });
  });

  // Allow goal selection with an enter press for accessibility purposes
  $('.goal-option').keypress(function (e) {
    if (e.which === 13) {
      $(e.target).click();
    }
  });
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

(function() { module.exports = window["jQuery"]; }());

/***/ })

},["./openedx/features/course_experience/static/course_experience/js/CourseGoals.js"])));
//# sourceMappingURL=CourseGoals.js.map