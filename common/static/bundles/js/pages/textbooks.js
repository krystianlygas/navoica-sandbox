(function(e, a) { for(var i in a) e[i] = a[i]; }(window, webpackJsonp([4],{

/***/ "./cms/static/js/base.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./common/static/js/vendor/domReady.js"), __webpack_require__(0), __webpack_require__(2), __webpack_require__(3), __webpack_require__("./common/static/common/js/components/views/feedback_notification.js"), __webpack_require__("./common/static/common/js/components/views/feedback_prompt.js"), __webpack_require__("./cms/static/js/utils/date_utils.js"), __webpack_require__("./cms/static/js/utils/module.js"), __webpack_require__("./cms/static/js/utils/handle_iframe_binding.js"), __webpack_require__("./node_modules/edx-ui-toolkit/src/js/dropdown-menu/dropdown-menu-view.js"), __webpack_require__("./common/static/js/vendor/jQuery-File-Upload/js/vendor/jquery.ui.widget.js"), __webpack_require__("./common/static/js/vendor/jquery.leanModal.js"), __webpack_require__("./common/static/js/vendor/jquery.form.js"), __webpack_require__("./common/static/js/vendor/jquery.smooth-scroll.min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (domReady, $, _, gettext, NotificationView, PromptView, DateUtils, ModuleUtils, IframeUtils, DropdownMenuView) {
    var $body;

    domReady(function () {
        var dropdownMenuView;

        $body = $('body');

        $body.on('click', '.embeddable-xml-input', function () {
            $(this).select();
        });

        $body.addClass('js');

        // alerts/notifications - manual close
        $('.action-alert-close, .alert.has-actions .nav-actions a').bind('click', hideAlert);
        $('.action-notification-close').bind('click', hideNotification);

        // nav - dropdown related
        $body.click(function (e) {
            $('.nav-dd .nav-item .wrapper-nav-sub').removeClass('is-shown');
            $('.nav-dd .nav-item .title').removeClass('is-selected');
        });

        $('.nav-dd .nav-item, .filterable-column .nav-item').click(function (e) {
            $subnav = $(this).find('.wrapper-nav-sub');
            $title = $(this).find('.title');

            if ($subnav.hasClass('is-shown')) {
                $subnav.removeClass('is-shown');
                $title.removeClass('is-selected');
            } else {
                $('.nav-dd .nav-item .title').removeClass('is-selected');
                $('.nav-dd .nav-item .wrapper-nav-sub').removeClass('is-shown');
                $title.addClass('is-selected');
                $subnav.addClass('is-shown');
                // if propagation is not stopped, the event will bubble up to the
                // body element, which will close the dropdown.
                e.stopPropagation();
            }
        });

        // general link management - new window/tab
        $('a[rel="external"]:not([title])').attr('title', gettext('This link will open in a new browser window/tab'));
        $('a[rel="external"]').attr('target', '_blank');

        // general link management - lean modal window
        $('a[rel="modal"]').attr('title', gettext('This link will open in a modal window')).leanModal({
            overlay: 0.50,
            closeButton: '.action-modal-close'
        });
        $('.action-modal-close').click(function (e) {
            e.preventDefault();
        });

        // general link management - smooth scrolling page links
        $('a[rel*="view"][href^="#"]').bind('click', smoothScrollLink);

        IframeUtils.iframeBinding();

        // disable ajax caching in IE so that backbone fetches work
        if ($.browser.msie) {
            $.ajaxSetup({ cache: false });
        }

        // Initiate the edx tool kit dropdown menu
        if ($('.js-header-user-menu').length) {
            dropdownMenuView = new DropdownMenuView({
                el: '.js-header-user-menu'
            });
            dropdownMenuView.postRender();
        }
    });

    function smoothScrollLink(e) {
        e.preventDefault();

        $.smoothScroll({
            offset: -200,
            easing: 'swing',
            speed: 1000,
            scrollElement: null,
            scrollTarget: $(this).attr('href')
        });
    }

    function smoothScrollTop(e) {
        e.preventDefault();

        $.smoothScroll({
            offset: -200,
            easing: 'swing',
            speed: 1000,
            scrollElement: null,
            scrollTarget: $('#view-top')
        });
    }

    function hideNotification(e) {
        e.preventDefault();
        $(this).closest('.wrapper-notification').removeClass('is-shown').addClass('is-hiding').attr('aria-hidden', 'true');
    }

    function hideAlert(e) {
        e.preventDefault();
        $(this).closest('.wrapper-alert').removeClass('is-shown');
    }
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // end require()

/***/ }),

/***/ "./cms/static/js/collections/chapter.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__("./cms/static/js/models/chapter.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, ChapterModel) {
    var ChapterCollection = Backbone.Collection.extend({
        model: ChapterModel,
        comparator: 'order',
        nextOrder: function nextOrder() {
            if (!this.length) return 1;
            return this.last().get('order') + 1;
        },
        isEmpty: function isEmpty() {
            return this.length === 0 || this.every(function (m) {
                return m.isEmpty();
            });
        }
    });
    return ChapterCollection;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/collections/textbook.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__("./cms/static/js/models/textbook.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, TextbookModel) {
    var TextbookCollection = Backbone.Collection.extend({
        model: TextbookModel,
        url: function url() {
            return CMS.URL.TEXTBOOKS;
        }
    });
    return TextbookCollection;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/factories/base.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./cms/static/js/base.js"), __webpack_require__("./cms/static/cms/js/main.js"), __webpack_require__("./common/static/js/src/logger.js"), __webpack_require__("./common/static/js/vendor/timepicker/datepair.js"), __webpack_require__("./common/static/js/src/accessibility_tools.js"), __webpack_require__("./common/static/js/src/ie_shim.js"), __webpack_require__("./common/static/js/src/tooltip_manager.js"), __webpack_require__("./common/static/js/src/lang_edx.js"), __webpack_require__("./cms/static/js/models/course.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    'use strict';
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/factories/textbooks.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__("./cms/static/js/models/section.js"), __webpack_require__("./cms/static/js/collections/textbook.js"), __webpack_require__("./cms/static/js/views/list_textbooks.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (gettext, Section, TextbookCollection, ListTextbooksView) {
    'use strict';

    return function (textbooksJson) {
        var textbooks = new TextbookCollection(textbooksJson, { parse: true }),
            tbView = new ListTextbooksView({ collection: textbooks });

        $('.content-primary').append(tbView.render().el);
        $('.nav-actions .new-button').click(function (event) {
            tbView.addOne(event);
        });
        $(window).on('beforeunload', function () {
            var dirty = textbooks.find(function (textbook) {
                return textbook.isDirty();
            });
            if (dirty) {
                return gettext('You have unsaved changes. Do you really want to leave this page?');
            }
        });
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./cms/static/js/models/chapter.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__("./node_modules/backbone-associations/backbone-associations-min.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, gettext) {
    var Chapter = Backbone.AssociatedModel.extend({
        defaults: function defaults() {
            return {
                name: '',
                asset_path: '',
                order: this.collection ? this.collection.nextOrder() : 1
            };
        },
        isEmpty: function isEmpty() {
            return !this.get('name') && !this.get('asset_path');
        },
        parse: function parse(response) {
            if ('title' in response && !('name' in response)) {
                response.name = response.title;
                delete response.title;
            }
            if ('url' in response && !('asset_path' in response)) {
                response.asset_path = response.url;
                delete response.url;
            }
            return response;
        },
        toJSON: function toJSON() {
            return {
                title: this.get('name'),
                url: this.get('asset_path')
            };
        },
        // NOTE: validation functions should return non-internationalized error
        // messages. The messages will be passed through gettext in the template.
        validate: function validate(attrs, options) {
            if (!attrs.name && !attrs.asset_path) {
                return {
                    message: gettext('Chapter name and asset_path are both required'),
                    attributes: { name: true, asset_path: true }
                };
            } else if (!attrs.name) {
                return {
                    message: gettext('Chapter name is required'),
                    attributes: { name: true }
                };
            } else if (!attrs.asset_path) {
                return {
                    message: gettext('asset_path is required'),
                    attributes: { asset_path: true }
                };
            }
        }
    });
    return Chapter;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/models/course.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone) {
    var Course = Backbone.Model.extend({
        defaults: {
            name: ''
        },
        validate: function validate(attrs, options) {
            if (!attrs.name) {
                return gettext('You must specify a name');
            }
        }
    });
    return Course;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/models/section.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(3), __webpack_require__("./common/static/common/js/components/views/feedback_notification.js"), __webpack_require__("./cms/static/js/utils/module.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, gettext, NotificationView, ModuleUtils) {
    var Section = Backbone.Model.extend({
        defaults: {
            name: ''
        },
        validate: function validate(attrs, options) {
            if (!attrs.name) {
                return gettext('You must specify a name');
            }
        },
        urlRoot: ModuleUtils.urlRoot,
        toJSON: function toJSON() {
            return {
                metadata: {
                    display_name: this.get('name')
                }
            };
        },
        initialize: function initialize() {
            this.listenTo(this, 'request', this.showNotification);
            this.listenTo(this, 'sync', this.hideNotification);
        },
        showNotification: function showNotification() {
            if (!this.msg) {
                this.msg = new NotificationView.Mini({
                    title: gettext('Saving')
                });
            }
            this.msg.show();
        },
        hideNotification: function hideNotification() {
            if (!this.msg) {
                return;
            }
            this.msg.hide();
        }
    });
    return Section;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/models/textbook.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__("./cms/static/js/models/chapter.js"), __webpack_require__("./cms/static/js/collections/chapter.js"), __webpack_require__("./node_modules/backbone-associations/backbone-associations-min.js"), __webpack_require__("./cms/static/cms/js/main.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, _, gettext, ChapterModel, ChapterCollection) {
    var Textbook = Backbone.AssociatedModel.extend({
        defaults: function defaults() {
            return {
                name: '',
                chapters: new ChapterCollection([{}]),
                showChapters: false,
                editing: false
            };
        },
        relations: [{
            type: Backbone.Many,
            key: 'chapters',
            relatedModel: ChapterModel,
            collectionType: ChapterCollection
        }],
        initialize: function initialize() {
            this.setOriginalAttributes();
            return this;
        },
        setOriginalAttributes: function setOriginalAttributes() {
            this._originalAttributes = this.parse(this.toJSON());
        },
        reset: function reset() {
            this.set(this._originalAttributes, { parse: true });
        },
        isDirty: function isDirty() {
            return !_.isEqual(this._originalAttributes, this.parse(this.toJSON()));
        },
        isEmpty: function isEmpty() {
            return !this.get('name') && this.get('chapters').isEmpty();
        },
        urlRoot: function urlRoot() {
            return CMS.URL.TEXTBOOKS;
        },
        parse: function parse(response) {
            var ret = $.extend(true, {}, response);
            if ('tab_title' in ret && !('name' in ret)) {
                ret.name = ret.tab_title;
                delete ret.tab_title;
            }
            if ('url' in ret && !('chapters' in ret)) {
                ret.chapters = { url: ret.url };
                delete ret.url;
            }
            _.each(ret.chapters, function (chapter, i) {
                chapter.order = chapter.order || i + 1;
            });
            return ret;
        },
        toJSON: function toJSON() {
            return {
                tab_title: this.get('name'),
                chapters: this.get('chapters').toJSON()
            };
        },
        // NOTE: validation functions should return non-internationalized error
        // messages. The messages will be passed through gettext in the template.
        validate: function validate(attrs, options) {
            if (!attrs.name) {
                return {
                    message: gettext('Textbook name is required'),
                    attributes: { name: true }
                };
            }
            if (attrs.chapters.length === 0) {
                return {
                    message: gettext('Please add at least one chapter'),
                    attributes: { chapters: true }
                };
            } else {
                // validate all chapters
                var invalidChapters = [];
                attrs.chapters.each(function (chapter) {
                    if (!chapter.isValid()) {
                        invalidChapters.push(chapter);
                    }
                });
                if (!_.isEmpty(invalidChapters)) {
                    return {
                        message: gettext('All chapters must have a name and asset'),
                        attributes: { chapters: invalidChapters }
                    };
                }
            }
        }
    });
    return Textbook;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./cms/static/js/models/uploads.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (Backbone, _, gettext) {
    var FileUpload = Backbone.Model.extend({
        defaults: {
            title: '',
            message: '',
            selectedFile: null,
            uploading: false,
            uploadedBytes: 0,
            totalBytes: 0,
            finished: false,
            mimeTypes: [],
            fileFormats: []
        },
        validate: function validate(attrs, options) {
            if (attrs.selectedFile && !this.checkTypeValidity(attrs.selectedFile)) {
                return {
                    message: _.template(gettext('Only <%= fileTypes %> files can be uploaded. Please select a file ending in <%= fileExtensions %> to upload.'))( // eslint-disable-line max-len
                    this.formatValidTypes()),
                    attributes: { selectedFile: true }
                };
            }
        },
        // Return a list of this uploader's valid file types
        fileTypes: function fileTypes() {
            var mimeTypes = _.map(this.attributes.mimeTypes, function (type) {
                return type.split('/')[1].toUpperCase();
            }),
                fileFormats = _.map(this.attributes.fileFormats, function (type) {
                return type.toUpperCase();
            });

            return mimeTypes.concat(fileFormats);
        },
        checkTypeValidity: function checkTypeValidity(file) {
            var attrs = this.attributes,
                getRegExp = function getRegExp(formats) {
                // Creates regular expression like: /(?:.+)\.(jpg|png|gif)$/i
                return RegExp('(?:.+)\\.(' + formats.join('|') + ')$', 'i');
            };

            return attrs.mimeTypes.length === 0 && attrs.fileFormats.length === 0 || _.contains(attrs.mimeTypes, file.type) || getRegExp(attrs.fileFormats).test(file.name);
        },
        // Return strings for the valid file types and extensions this
        // uploader accepts, formatted as natural language
        formatValidTypes: function formatValidTypes() {
            var attrs = this.attributes;

            if (attrs.mimeTypes.concat(attrs.fileFormats).length === 1) {
                return {
                    fileTypes: this.fileTypes()[0],
                    fileExtensions: '.' + this.fileTypes()[0].toLowerCase()
                };
            }
            var or = gettext('or');
            var formatTypes = function formatTypes(types) {
                return _.template('<%= initial %> <%= or %> <%= last %>')({
                    initial: _.initial(types).join(', '),
                    or: or,
                    last: _.last(types)
                });
            };
            return {
                fileTypes: formatTypes(this.fileTypes()),
                fileExtensions: formatTypes(_.map(this.fileTypes(), function (type) {
                    return '.' + type.toLowerCase();
                }))
            };
        }
    });

    return FileUpload;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // end define()

/***/ }),

/***/ "./cms/static/js/pages/course.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./cms/static/js/models/course.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (ContextCourse) {
    window.course = new ContextCourse(window.pageFactoryArguments.ContextCourse);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/pages/textbooks.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./cms/static/js/factories/textbooks.js"), __webpack_require__("./common/static/common/js/utils/page_factory.js"), __webpack_require__("./cms/static/js/factories/base.js"), __webpack_require__("./cms/static/js/pages/course.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (TextbooksFactory, invokePageFactory) {
    'use strict';

    invokePageFactory('TextbooksFactory', TextbooksFactory);
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/utils/change_on_enter.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
    // Trigger "Change" event on "Enter" keyup event
    var triggerChangeEventOnEnter = function triggerChangeEventOnEnter(e) {
        if (e.which == 13) {
            $(this).trigger('change').blur();
        }
    };

    return triggerChangeEventOnEnter;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/utils/date_utils.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__("./common/static/js/vendor/date.js"), __webpack_require__("./cms/static/js/utils/regional_pl.js"), __webpack_require__("./node_modules/moment/moment.js"), __webpack_require__("./cms/static/js/utils/change_on_enter.js"), __webpack_require__("./common/static/js/vendor/jQuery-File-Upload/js/vendor/jquery.ui.widget.js"), __webpack_require__("./common/static/js/vendor/timepicker/jquery.timepicker.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, date, RegionalPl, moment, TriggerChangeEventOnEnter) {
    'use strict';

    var setupDatePicker = function setupDatePicker(fieldName, view, index) {
        var cacheModel;
        var div;
        if (typeof index !== 'undefined' && view.hasOwnProperty('collection')) {
            cacheModel = view.collection.models[index];
            div = view.$el.find('#' + view.collectionSelector(cacheModel.cid));
        } else {
            cacheModel = view.model;
            div = view.$el.find('#' + view.fieldToSelectorMap[fieldName]);
        }
        var datefield = $(div).find('input.date');
        var timefield = $(div).find('input.time');
        var cacheview = view;
        var setfield = function setfield(event) {
            var newVal = getDate(datefield, timefield);
            // Setting to null clears the time as well, as date and time are linked.
            // Note also that the validation logic prevents us from clearing the start date
            // (start date is required by the back end).
            cacheview.clearValidationErrors();
            cacheview.setAndValidate(fieldName, newVal || null, event);
        };

        // instrument as date and time pickers
        timefield.timepicker({ timeFormat: 'H:i' });
        datefield.datepicker({ dateFormat: 'dd/mm/yy' });

        if ($("html").attr("lang") === 'pl') {
            $.datepicker.setDefaults(RegionalPl);
        } else {
            $.datepicker.setDefaults($.datepicker.regional['']);
        }

        // Using the change event causes setfield to be triggered twice, but it is necessary
        // to pick up when the date is typed directly in the field.
        datefield.change(setfield).keyup(TriggerChangeEventOnEnter);
        timefield.on('changeTime', setfield);
        timefield.on('input', setfield);

        var current_date = null;
        if (cacheModel) {
            current_date = cacheModel.get(fieldName);
        }
        // timepicker doesn't let us set null, so check that we have a time
        if (current_date) {
            setDate(datefield, timefield, current_date);
        } // but reset fields either way
        else {
                timefield.val('');
                datefield.val('');
            }
    };

    var getDate = function getDate(datepickerInput, timepickerInput) {
        // given a pair of inputs (datepicker and timepicker), return a JS Date
        // object that corresponds to the datetime.js that they represent. Assume
        // UTC timezone, NOT the timezone of the user's browser.
        var date = null,
            time = null;
        if (datepickerInput.length > 0) {
            date = $(datepickerInput).datepicker('getDate');
        }
        if (timepickerInput.length > 0) {
            time = $(timepickerInput).timepicker('getTime');
        }
        if (date && time) {
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes()));
        } else if (date) {
            return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        } else {
            return null;
        }
    };

    var setDate = function setDate(datepickerInput, timepickerInput, datetime) {
        // given a pair of inputs (datepicker and timepicker) and the date as an
        // ISO-formatted date string.
        datetime = date.parse(datetime);
        if (datetime) {
            $(datepickerInput).datepicker('setDate', datetime);
            if (timepickerInput.length > 0) {
                $(timepickerInput).timepicker('setTime', datetime);
            }
        }
    };

    var renderDate = function renderDate(dateArg) {
        // Render a localized date from an argument that can be passed to
        // the Date constructor (e.g. another Date or an ISO 8601 string)
        var date = new Date(dateArg);
        return date.toLocaleString([], { timeZone: 'UTC', timeZoneName: 'short' });
    };

    var parseDateFromString = function parseDateFromString(stringDate) {
        if (stringDate && typeof stringDate === 'string') {
            var parts = stringDate.split('/');
            return new Date(parts[2], parts[1] - 1, parts[0]);
        } else {
            return stringDate;
        }
    };

    var convertDateStringsToObjects = function convertDateStringsToObjects(obj, dateFields) {
        for (var i = 0; i < dateFields.length; i++) {
            if (obj[dateFields[i]]) {
                obj[dateFields[i]] = parseDateFromString(obj[dateFields[i]]);
            }
        }
        return obj;
    };

    return {
        getDate: getDate,
        setDate: setDate,
        renderDate: renderDate,
        convertDateStringsToObjects: convertDateStringsToObjects,
        parseDateFromString: parseDateFromString,
        setupDatePicker: setupDatePicker
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/utils/handle_iframe_binding.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {
    var iframeBinding = function iframeBinding(e) {
        var target_element = null;
        if (typeof e === 'undefined') {
            target_element = $('iframe, embed');
        } else {
            if (typeof e.nodeName !== 'undefined') {
                target_element = $(e).find('iframe, embed');
            } else {
                target_element = e.$('iframe, embed');
            }
        }
        modifyTagContent(target_element);
    };

    var modifyTagContent = function modifyTagContent(target_element) {
        target_element.each(function () {
            if ($(this).prop('tagName') === 'IFRAME') {
                var ifr_source = $(this).attr('src');

                // Modify iframe src only if it is not empty
                if (ifr_source) {
                    var wmode = 'wmode=transparent';
                    if (ifr_source.indexOf('?') !== -1) {
                        var getQString = ifr_source.split('?');
                        if (getQString[1].search('wmode=transparent') === -1) {
                            var oldString = getQString[1];
                            var newString = getQString[0];
                            $(this).attr('src', newString + '?' + wmode + '&' + oldString);
                        }
                    }
                    // The TinyMCE editor is hosted in an iframe, and before the iframe is
                    // removed we execute this code. To avoid throwing an error when setting the
                    // attr, check that the source doesn't start with the value specified by TinyMCE ('javascript:""').
                    else if (ifr_source.lastIndexOf('javascript:', 0) !== 0) {
                            $(this).attr('src', ifr_source + '?' + wmode);
                        }
                }
            } else {
                $(this).attr('wmode', 'transparent');
            }
        });
    };

    // Modify iframe/embed tags in provided html string
    // Use this method when provided data is just html sting not dom element
    // This method will only modify iframe (add wmode=transparent in url querystring) and embed (add wmode=transparent as attribute)
    // tags in html string so both tags will attach to dom and don't create z-index problem for other popups
    // Note: embed tags should be modified before rendering as they are static objects as compared to iframes
    // Note: this method can modify unintended html (invalid tags) while converting to dom object
    var iframeBindingHtml = function iframeBindingHtml(html_string) {
        if (html_string) {
            var target_element = null;
            var temp_content = document.createElement('div');
            $(temp_content).html(html_string);
            target_element = $(temp_content).find('iframe, embed');
            if (target_element.length > 0) {
                modifyTagContent(target_element);
                html_string = $(temp_content).html();
            }
        }
        return html_string;
    };

    return {
        iframeBinding: iframeBinding,
        iframeBindingHtml: iframeBindingHtml
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/utils/module.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Utilities for modules/xblocks.
 *
 * Returns:
 *
 * urlRoot: the root for creating/updating an xblock.
 * getUpdateUrl: a utility method that returns the xblock update URL, appending
 *               the location if passed in.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (_) {
    var urlRoot = '/xblock';

    var getUpdateUrl = function getUpdateUrl(locator) {
        if (_.isUndefined(locator)) {
            return urlRoot + '/';
        } else {
            return urlRoot + '/' + locator;
        }
    };
    return {
        urlRoot: urlRoot,
        getUpdateUrl: getUpdateUrl
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/utils/regional_pl.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {

    return {
        closeText: "Zamknij",
        prevText: "&#x3C;Poprzedni",
        nextText: "Następny&#x3E;",
        currentText: "Dziś",
        monthNames: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
        monthNamesShort: ["Sty", "Lu", "Mar", "Kw", "Maj", "Cze", "Lip", "Sie", "Wrz", "Pa", "Lis", "Gru"],
        dayNames: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"],
        dayNamesShort: ["Nie", "Pn", "Wt", "Śr", "Czw", "Pt", "So"],
        dayNamesMin: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
        weekHeader: "Tydz",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/utils/templates.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, _) {
    /**
     * Loads the named template from the page, or logs an error if it fails.
     * @param name The name of the template.
     * @returns The loaded template.
     */
    var loadTemplate = function loadTemplate(name) {
        var templateSelector = '#' + name + '-tpl',
            templateText = $(templateSelector).text();
        if (!templateText) {
            console.error('Failed to load ' + name + ' template');
        }
        return _.template(templateText);
    };

    return {
        loadTemplate: loadTemplate
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/views/baseview.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__(1), __webpack_require__(3), __webpack_require__("./cms/static/js/utils/handle_iframe_binding.js"), __webpack_require__("./cms/static/js/utils/templates.js"), __webpack_require__("./common/static/common/js/components/utils/view_utils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, _, Backbone, gettext, IframeUtils, TemplateUtils, ViewUtils) {
    /*
     This view is extended from backbone to provide useful functionality for all Studio views.
     This functionality includes:
     - automatic expand and collapse of elements with the 'ui-toggle-expansion' class specified
     - additional control of rendering by overriding 'beforeRender' or 'afterRender'
      Note: the default 'afterRender' function calls a utility function 'iframeBinding' which modifies
     iframe src urls on a page so that they are rendered as part of the DOM.
     */

    var BaseView = Backbone.View.extend({
        events: {
            'click .ui-toggle-expansion': 'toggleExpandCollapse'
        },

        options: {
            // UX is moving towards using 'is-collapsed' in preference over 'collapsed',
            // but use the old scheme as the default so that existing code doesn't need
            // to be rewritten.
            collapsedClass: 'collapsed'
        },

        // override the constructor function
        constructor: function constructor(options) {
            _.bindAll(this, 'beforeRender', 'render', 'afterRender');

            // Merge passed options and view's options property and
            // attach to the view's options property
            if (this.options) {
                options = _.extend({}, _.result(this, 'options'), options);
            }

            // trunc is not available in IE, and it provides polyfill for it.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
            if (!Math.trunc) {
                Math.trunc = function (v) {
                    v = +v; // eslint-disable-line no-param-reassign
                    return v - v % 1 || (!isFinite(v) || v === 0 ? v : v < 0 ? -0 : 0);
                };
            }
            this.options = options;

            var _this = this;
            this.render = _.wrap(this.render, function (render, options) {
                _this.beforeRender();
                render(options);
                _this.afterRender();
                return _this;
            });

            // call Backbone's own constructor
            Backbone.View.prototype.constructor.apply(this, arguments);
        },

        beforeRender: function beforeRender() {},

        render: function render() {
            return this;
        },

        afterRender: function afterRender() {
            IframeUtils.iframeBinding(this);
        },

        toggleExpandCollapse: function toggleExpandCollapse(event) {
            var $target = $(event.target);
            // Don't propagate the event as it is possible that two views will both contain
            // this element, e.g. clicking on the element of a child view container in a parent.
            event.stopPropagation();
            event.preventDefault();
            ViewUtils.toggleExpandCollapse($target, this.options.collapsedClass);
        },

        /**
         * Loads the named template from the page, or logs an error if it fails.
         * @param name The name of the template.
         * @returns The loaded template.
         */
        loadTemplate: function loadTemplate(name) {
            return TemplateUtils.loadTemplate(name);
        }
    });

    return BaseView;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/views/edit_chapter.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global course */

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2), __webpack_require__(0), __webpack_require__(3), __webpack_require__("./node_modules/edx-ui-toolkit/src/js/utils/html-utils.js"), __webpack_require__("./cms/static/js/views/baseview.js"), __webpack_require__("./cms/static/js/models/uploads.js"), __webpack_require__("./cms/static/js/views/uploads.js"), __webpack_require__("./cms/templates/js/edit-chapter.underscore")], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, $, gettext, HtmlUtils, BaseView, FileUploadModel, UploadDialogView, editChapterTemplate) {
    'use strict';

    var EditChapter = BaseView.extend({
        initialize: function initialize() {
            this.template = HtmlUtils.template(editChapterTemplate);
            this.listenTo(this.model, 'change', this.render);
        },
        tagName: 'li',
        className: function className() {
            return 'field-group chapter chapter' + this.model.get('order');
        },
        render: function render() {
            HtmlUtils.setHtml(this.$el, this.template({
                name: this.model.get('name'),
                asset_path: this.model.get('asset_path'),
                order: this.model.get('order'),
                error: this.model.validationError
            }));
            return this;
        },
        events: {
            'change .chapter-name': 'changeName',
            'change .chapter-asset-path': 'changeAssetPath',
            'click .action-close': 'removeChapter',
            'click .action-upload': 'openUploadDialog',
            submit: 'uploadAsset'
        },
        changeName: function changeName(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.model.set({
                name: this.$('.chapter-name').val()
            }, { silent: true });
            return this;
        },
        changeAssetPath: function changeAssetPath(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.model.set({
                asset_path: this.$('.chapter-asset-path').val()
            }, { silent: true });
            return this;
        },
        removeChapter: function removeChapter(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.model.collection.remove(this.model);
            return this.remove();
        },
        openUploadDialog: function openUploadDialog(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.model.set({
                name: this.$('input.chapter-name').val(),
                asset_path: this.$('input.chapter-asset-path').val()
            });
            var msg = new FileUploadModel({
                title: _.template(gettext('Upload a new PDF to “<%= name %>”'))({ name: course.escape('name') }),
                message: gettext('Please select a PDF file to upload.'),
                mimeTypes: ['application/pdf']
            });
            var that = this;
            var view = new UploadDialogView({
                model: msg,
                onSuccess: function onSuccess(response) {
                    var options = {};
                    if (!that.model.get('name')) {
                        options.name = response.asset.displayname;
                    }
                    options.asset_path = response.asset.portable_url;
                    that.model.set(options);
                }
            });
            view.show();
        }
    });

    return EditChapter;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/views/edit_textbook.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./cms/static/js/views/baseview.js"), __webpack_require__(2), __webpack_require__(0), __webpack_require__("./cms/static/js/views/edit_chapter.js"), __webpack_require__("./common/static/common/js/components/views/feedback_notification.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseView, _, $, EditChapterView, NotificationView) {
    var EditTextbook = BaseView.extend({
        initialize: function initialize() {
            this.template = this.loadTemplate('edit-textbook');
            this.listenTo(this.model, 'invalid', this.render);
            var chapters = this.model.get('chapters');
            this.listenTo(chapters, 'add', this.addOne);
            this.listenTo(chapters, 'reset', this.addAll);
            this.listenTo(chapters, 'all', this.render);
        },
        tagName: 'section',
        className: 'textbook',
        render: function render() {
            this.$el.html(this.template({
                name: this.model.get('name'),
                error: this.model.validationError
            }));
            this.addAll();
            return this;
        },
        events: {
            'change input[name=textbook-name]': 'setName',
            submit: 'setAndClose',
            'click .action-cancel': 'cancel',
            'click .action-add-chapter': 'createChapter'
        },
        addOne: function addOne(chapter) {
            var view = new EditChapterView({ model: chapter });
            this.$('ol.chapters').append(view.render().el);
            return this;
        },
        addAll: function addAll() {
            this.model.get('chapters').each(this.addOne, this);
        },
        createChapter: function createChapter(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.setValues();
            this.model.get('chapters').add([{}]);
        },
        setName: function setName(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.model.set('name', this.$('#textbook-name-input').val(), { silent: true });
        },
        setValues: function setValues() {
            this.setName();
            var that = this;
            _.each(this.$('li'), function (li, i) {
                var chapter = that.model.get('chapters').at(i);
                if (!chapter) {
                    return;
                }
                chapter.set({
                    name: $('.chapter-name', li).val(),
                    asset_path: $('.chapter-asset-path', li).val()
                });
            });
            return this;
        },
        setAndClose: function setAndClose(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.setValues();
            if (!this.model.isValid()) {
                return;
            }
            var saving = new NotificationView.Mini({
                title: gettext('Saving')
            }).show();
            var that = this;
            this.model.save({}, {
                success: function success() {
                    that.model.setOriginalAttributes();
                    that.close();
                },
                complete: function complete() {
                    saving.hide();
                }
            });
        },
        cancel: function cancel(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.model.reset();
            return this.close();
        },
        close: function close() {
            var textbooks = this.model.collection;
            this.remove();
            if (this.model.isNew()) {
                // if the textbook has never been saved, remove it
                textbooks.remove(this.model);
            }
            // don't forget to tell the model that it's no longer being edited
            this.model.set('editing', false);
            return this;
        }
    });
    return EditTextbook;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/views/list_textbooks.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./cms/static/js/views/baseview.js"), __webpack_require__(0), __webpack_require__("./cms/static/js/views/edit_textbook.js"), __webpack_require__("./cms/static/js/views/show_textbook.js"), __webpack_require__("./common/static/common/js/components/utils/view_utils.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseView, $, EditTextbookView, ShowTextbookView, ViewUtils) {
    var ListTextbooks = BaseView.extend({
        initialize: function initialize() {
            this.emptyTemplate = this.loadTemplate('no-textbooks');
            this.listenTo(this.collection, 'all', this.render);
            this.listenTo(this.collection, 'destroy', this.handleDestroy);
        },
        tagName: 'div',
        className: 'textbooks-list',
        render: function render() {
            var textbooks = this.collection;
            if (textbooks.length === 0) {
                this.$el.html(this.emptyTemplate());
            } else {
                this.$el.empty();
                var that = this;
                textbooks.each(function (textbook) {
                    var view;
                    if (textbook.get('editing')) {
                        view = new EditTextbookView({ model: textbook });
                    } else {
                        view = new ShowTextbookView({ model: textbook });
                    }
                    that.$el.append(view.render().el);
                });
            }
            return this;
        },
        events: {
            'click .new-button': 'addOne'
        },
        addOne: function addOne(e) {
            var $sectionEl, $inputEl;
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.collection.add([{ editing: true }]); // (render() call triggered here)
            // find the outer 'section' tag for the newly added textbook
            $sectionEl = this.$el.find('section:last');
            // scroll to put this at top of viewport
            ViewUtils.setScrollOffset($sectionEl, 0);
            // find the first input element in this section
            $inputEl = $sectionEl.find('input:first');
            // activate the text box (so user can go ahead and start typing straight away)
            $inputEl.focus().select();
        },
        handleDestroy: function handleDestroy(model, collection, options) {
            collection.remove(model);
        }
    });
    return ListTextbooks;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/views/modals/base_modal.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * This is a base modal implementation that provides common utilities.
 *
 * A modal implementation should override the following methods:
 *
 *   getTitle():
 *     returns the title for the modal.
 *   getContentHtml():
 *     returns the HTML content to be shown inside the modal.
 *
 * A modal implementation should also provide the following options:
 *
 *   modalName: A string identifying the modal.
 *   modalType: A string identifying the type of the modal.
 *   modalSize: A string, either 'sm', 'med', or 'lg' indicating the
 *     size of the modal.
 *   viewSpecificClasses: A string of CSS classes to be attached to
 *     the modal window.
 *   addPrimaryActionButton: A boolean indicating whether to include a primary action
 *     button on the modal.
 *   primaryActionButtonType: A string to be used as type for primary action button.
 *   primaryActionButtonTitle: A string to be used as title for primary action button.
 *   showEditorModeButtons: Whether to show editor mode button in the modal header.
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__(3), __webpack_require__("./cms/static/js/views/baseview.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, _, gettext, BaseView) {
    var BaseModal = BaseView.extend({
        events: {
            'click .action-cancel': 'cancel'
        },

        options: _.extend({}, BaseView.prototype.options, {
            type: 'prompt',
            closeIcon: false,
            icon: false,
            modalName: 'basic',
            modalType: 'generic',
            modalSize: 'lg',
            title: '',
            modalWindowClass: '.modal-window',
            // A list of class names, separated by space.
            viewSpecificClasses: '',
            addPrimaryActionButton: false,
            primaryActionButtonType: 'save',
            primaryActionButtonTitle: gettext('Save'),
            showEditorModeButtons: true
        }),

        initialize: function initialize() {
            var parent = this.options.parent,
                parentElement = this.options.parentElement;
            this.modalTemplate = this.loadTemplate('basic-modal');
            this.buttonTemplate = this.loadTemplate('modal-button');
            if (parent) {
                parentElement = parent.$el;
            } else if (!parentElement) {
                parentElement = this.$el.closest(this.options.modalWindowClass);
                if (parentElement.length === 0) {
                    parentElement = $('body');
                }
            }
            this.parentElement = parentElement;
        },

        render: function render() {
            this.$el.html(this.modalTemplate({
                name: this.options.modalName,
                type: this.options.modalType,
                size: this.options.modalSize,
                title: this.getTitle(),
                modalSRTitle: this.options.modalSRTitle,
                showEditorModeButtons: this.options.showEditorModeButtons,
                viewSpecificClasses: this.options.viewSpecificClasses
            }));
            this.addActionButtons();
            this.renderContents();
            this.parentElement.append(this.$el);
        },

        getTitle: function getTitle() {
            return this.options.title;
        },

        renderContents: function renderContents() {
            var contentHtml = this.getContentHtml();
            this.$('.modal-content').html(contentHtml);
        },

        /**
         * Returns the content to be shown in the modal.
         */
        getContentHtml: function getContentHtml() {
            return '';
        },

        show: function show(focusModal) {
            var focusModalWindow = focusModal === undefined;
            this.render();
            this.resize();
            $(window).resize(_.bind(this.resize, this));

            // child may want to have its own focus management
            if (focusModalWindow) {
                // after showing and resizing, send focus
                this.$el.find(this.options.modalWindowClass).focus();
            }
        },

        hide: function hide() {
            // Completely remove the modal from the DOM
            this.undelegateEvents();
            this.$el.html('');
        },

        cancel: function cancel(event) {
            if (event) {
                event.preventDefault();
                event.stopPropagation(); // Make sure parent modals don't see the click
            }
            this.hide();
        },

        /**
         * Adds the action buttons to the modal.
         */
        addActionButtons: function addActionButtons() {
            if (this.options.addPrimaryActionButton) {
                this.addActionButton(this.options.primaryActionButtonType, this.options.primaryActionButtonTitle, true);
            }
            this.addActionButton('cancel', gettext('Cancel'));
        },

        /**
         * Adds a new action button to the modal.
         * @param type The type of the action.
         * @param name The action's name.
         * @param isPrimary True if this button is the primary one.
         */
        addActionButton: function addActionButton(type, name, isPrimary) {
            var html = this.buttonTemplate({
                type: type,
                name: name,
                isPrimary: isPrimary
            });
            this.getActionBar().find('ul').append(html);
        },

        /**
         * Returns the action bar that contains the modal's action buttons.
         */
        getActionBar: function getActionBar() {
            return this.$(this.options.modalWindowClass + ' > div > .modal-actions');
        },

        /**
         * Returns the action button of the specified type.
         */
        getActionButton: function getActionButton(type) {
            return this.getActionBar().find('.action-' + type);
        },

        enableActionButton: function enableActionButton(type) {
            this.getActionBar().find('.action-' + type).prop('disabled', false).removeClass('is-disabled');
        },

        disableActionButton: function disableActionButton(type) {
            this.getActionBar().find('.action-' + type).prop('disabled', true).addClass('is-disabled');
        },

        resize: function resize() {
            var top, left, modalWindow, modalWidth, modalHeight, availableWidth, availableHeight, maxWidth, maxHeight;

            modalWindow = this.$el.find(this.options.modalWindowClass);
            availableWidth = $(window).width();
            availableHeight = $(window).height();
            maxWidth = availableWidth * 0.80;
            maxHeight = availableHeight * 0.80;
            modalWidth = Math.min(modalWindow.outerWidth(), maxWidth);
            modalHeight = Math.min(modalWindow.outerHeight(), maxHeight);

            left = (availableWidth - modalWidth) / 2;
            top = (availableHeight - modalHeight) / 2;

            modalWindow.css({
                top: top + $(window).scrollTop(),
                left: left + $(window).scrollLeft()
            });
        }
    });

    return BaseModal;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./cms/static/js/views/show_textbook.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./cms/static/js/views/baseview.js"), __webpack_require__(2), __webpack_require__(3), __webpack_require__("./common/static/common/js/components/views/feedback_notification.js"), __webpack_require__("./common/static/common/js/components/views/feedback_prompt.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function (BaseView, _, gettext, NotificationView, PromptView) {
    var ShowTextbook = BaseView.extend({
        initialize: function initialize() {
            this.template = _.template($('#show-textbook-tpl').text());
            this.listenTo(this.model, 'change', this.render);
        },
        tagName: 'section',
        className: 'textbook',
        events: {
            'click .edit': 'editTextbook',
            'click .delete': 'confirmDelete',
            'click .show-chapters': 'showChapters',
            'click .hide-chapters': 'hideChapters'
        },
        render: function render() {
            var attrs = $.extend({}, this.model.attributes);
            attrs.bookindex = this.model.collection.indexOf(this.model);
            attrs.course = window.course.attributes;
            this.$el.html(this.template(attrs));
            return this;
        },
        editTextbook: function editTextbook(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.model.set('editing', true);
        },
        confirmDelete: function confirmDelete(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            var textbook = this.model;
            new PromptView.Warning({
                title: _.template(gettext('Delete “<%= name %>”?'))({ name: textbook.get('name') }),
                message: gettext("Deleting a textbook cannot be undone and once deleted any reference to it in your courseware's navigation will also be removed."),
                actions: {
                    primary: {
                        text: gettext('Delete'),
                        click: function click(view) {
                            view.hide();
                            var delmsg = new NotificationView.Mini({
                                title: gettext('Deleting')
                            }).show();
                            textbook.destroy({
                                complete: function complete() {
                                    delmsg.hide();
                                }
                            });
                        }
                    },
                    secondary: {
                        text: gettext('Cancel'),
                        click: function click(view) {
                            view.hide();
                        }
                    }
                }
            }).show();
        },
        showChapters: function showChapters(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.model.set('showChapters', true);
        },
        hideChapters: function hideChapters(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.model.set('showChapters', false);
        }
    });
    return ShowTextbook;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./cms/static/js/views/uploads.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__(3), __webpack_require__("./cms/static/js/views/modals/base_modal.js"), __webpack_require__("./common/static/js/vendor/jquery.form.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, _, gettext, BaseModal) {
    var UploadDialog = BaseModal.extend({
        events: _.extend({}, BaseModal.prototype.events, {
            'change input[type=file]': 'selectFile',
            'click .action-upload': 'upload'
        }),

        options: $.extend({}, BaseModal.prototype.options, {
            modalName: 'assetupload',
            modalSize: 'med',
            successMessageTimeout: 2000, // 2 seconds
            viewSpecificClasses: 'confirm'
        }),

        initialize: function initialize() {
            BaseModal.prototype.initialize.call(this);
            this.template = this.loadTemplate('upload-dialog');
            this.listenTo(this.model, 'change', this.renderContents);
            this.options.title = this.model.get('title');
        },

        addActionButtons: function addActionButtons() {
            this.addActionButton('upload', gettext('Upload'), true);
            BaseModal.prototype.addActionButtons.call(this);
        },

        renderContents: function renderContents() {
            var isValid = this.model.isValid(),
                selectedFile = this.model.get('selectedFile'),
                oldInput = this.$('input[type=file]').get(0);
            BaseModal.prototype.renderContents.call(this);
            // Ideally, we'd like to tell the browser to pre-populate the
            // <input type="file"> with the selectedFile if we have one -- but
            // browser security prohibits that. So instead, we'll swap out the
            // new input (that has no file selected) with the old input (that
            // already has the selectedFile selected). However, we only want to do
            // this if the selected file is valid: if it isn't, we want to render
            // a blank input to prompt the user to upload a different (valid) file.
            if (selectedFile && isValid) {
                $(oldInput).removeClass('error');
                this.$('input[type=file]').replaceWith(oldInput);
                this.$('.action-upload').removeClass('disabled');
            } else {
                this.$('.action-upload').addClass('disabled');
            }
            return this;
        },

        getContentHtml: function getContentHtml() {
            return this.template({
                url: this.options.url || CMS.URL.UPLOAD_ASSET,
                message: this.model.escape('message'),
                selectedFile: this.model.get('selectedFile'),
                uploading: this.model.get('uploading'),
                uploadedBytes: this.model.get('uploadedBytes'),
                totalBytes: this.model.get('totalBytes'),
                finished: this.model.get('finished'),
                error: this.model.validationError
            });
        },

        selectFile: function selectFile(e) {
            var selectedFile = e.target.files[0] || null;
            this.model.set({
                selectedFile: selectedFile
            });
            // This change event triggering necessary for FireFox, because the browser don't
            // consider change of File object (file input field) as a change in model.
            if (selectedFile && $.isEmptyObject(this.model.changed)) {
                this.model.trigger('change');
            }
        },

        upload: function upload(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }
            this.model.set('uploading', true);
            this.$('form').ajaxSubmit({
                success: _.bind(this.success, this),
                error: _.bind(this.error, this),
                uploadProgress: _.bind(this.progress, this),
                data: {
                    // don't show the generic error notification; we're in a modal,
                    // and we're better off modifying it instead.
                    notifyOnError: false
                }
            });
        },

        progress: function progress(event, position, total) {
            this.model.set({
                uploadedBytes: position,
                totalBytes: total
            });
        },

        success: function success(response, statusText, xhr, form) {
            this.model.set({
                uploading: false,
                finished: true
            });
            if (this.options.onSuccess) {
                this.options.onSuccess(response, statusText, xhr, form);
            }
            var that = this;
            this.removalTimeout = setTimeout(function () {
                that.hide();
            }, this.options.successMessageTimeout);
        },

        error: function error() {
            this.model.set({
                uploading: false,
                uploadedBytes: 0,
                title: gettext("We're sorry, there was an error")
            });
        }
    });
    return UploadDialog;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // end define()

/***/ }),

/***/ "./cms/templates/js/edit-chapter.underscore":
/***/ (function(module, exports) {

module.exports = "<div class=\"input-wrap field text required field-add-chapter-name chapter<%- order %>-name\n    <% if (error && error.attributes && error.attributes.name) { print('error'); } %>\">\n  <label for=\"chapter<%- order %>-name\"><%- gettext(\"Chapter Name\") %></label>\n  <input id=\"chapter<%- order %>-name\" name=\"chapter<%- order %>-name\" class=\"chapter-name short\" placeholder=\"<%- StringUtils.interpolate(gettext(\"Chapter {order}\"), {order: order}) %>\" value=\"<%- name %>\" type=\"text\">\n  <span class=\"tip tip-stacked\"><%- gettext(\"provide the title/name of the chapter that will be used in navigating\") %></span>\n</div>\n<div class=\"input-wrap field text required field-add-chapter-asset chapter<%- order %>-asset\n    <% if (error && error.attributes && error.attributes.asset_path) { print('error'); } %>\">\n  <label for=\"chapter<%- order %>-asset-path\"><%- gettext(\"Chapter Asset\") %></label>\n  <input id=\"chapter<%- order %>-asset-path\" name=\"chapter<%- order %>-asset-path\" class=\"chapter-asset-path\" placeholder=\"<%- StringUtils.interpolate(gettext(\"path/to/introductionToCookieBaking-CH{order}.pdf\"), {order: order}) %>\" value=\"<%- asset_path %>\" type=\"text\" dir=\"ltr\">\n  <span class=\"tip tip-stacked\"><%- gettext(\"upload a PDF file or provide the path to a Studio asset file\") %></span>\n<button class=\"action action-upload\"><%- gettext(\"Upload PDF\") %></button>\n</div>\n<a href=\"\" class=\"action action-close\"><span class=\"icon fa fa-times-circle\" aria-hidden=\"true\"></span> <span class=\"sr\"><%- gettext(\"delete chapter\") %></span></a>\n"

/***/ }),

/***/ "./common/static/common/js/components/utils/view_utils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Provides useful utilities for views.
 */



!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__(3), __webpack_require__("./common/static/common/js/components/views/feedback_notification.js"), __webpack_require__("./common/static/common/js/components/views/feedback_prompt.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, _, gettext, NotificationView, PromptView) {
    var toggleExpandCollapse, showLoadingIndicator, hideLoadingIndicator, confirmThenRunOperation, runOperationShowingMessage, withDisabledElement, disableElementWhileRunning, getScrollOffset, setScrollOffset, setScrollTop, redirect, reload, hasChangedAttributes, deleteNotificationHandler, validateRequiredField, validateURLItemEncoding, validateTotalKeyLength, checkTotalKeyLengthViolations, loadJavaScript;

    // see https://openedx.atlassian.net/browse/TNL-889 for what is it and why it's 65
    var MAX_SUM_KEY_LENGTH = 65;

    /**
     * Toggles the expanded state of the current element.
     */
    toggleExpandCollapse = function toggleExpandCollapse(target, collapsedClass) {
        // Support the old 'collapsed' option until fully switched over to is-collapsed
        if (!collapsedClass) {
            collapsedClass = 'collapsed';
        }
        target.closest('.expand-collapse').toggleClass('expand collapse');
        target.closest('.is-collapsible, .window').toggleClass(collapsedClass);
        target.closest('.is-collapsible').children('article').slideToggle();
    };

    /**
     * Show the page's loading indicator.
     */
    showLoadingIndicator = function showLoadingIndicator() {
        $('.ui-loading').show();
    };

    /**
     * Hide the page's loading indicator.
     */
    hideLoadingIndicator = function hideLoadingIndicator() {
        $('.ui-loading').hide();
    };

    /**
     * Confirms with the user whether to run an operation or not, and then runs it if desired.
     */
    confirmThenRunOperation = function confirmThenRunOperation(title, message, actionLabel, operation, onCancelCallback) {
        return new PromptView.Warning({
            title: title,
            message: message,
            actions: {
                primary: {
                    text: actionLabel,
                    click: function click(prompt) {
                        prompt.hide();
                        operation();
                    }
                },
                secondary: {
                    text: gettext('Cancel'),
                    click: function click(prompt) {
                        if (onCancelCallback) {
                            onCancelCallback();
                        }
                        return prompt.hide();
                    }
                }
            }
        }).show();
    };

    /**
     * Shows a progress message for the duration of an asynchronous operation.
     * Note: this does not remove the notification upon failure because an error
     * will be shown that shouldn't be removed.
     * @param message The message to show.
     * @param operation A function that returns a promise representing the operation.
     */
    runOperationShowingMessage = function runOperationShowingMessage(message, operation) {
        var notificationView;
        notificationView = new NotificationView.Mini({
            title: gettext(message)
        });
        notificationView.show();
        return operation().done(function () {
            notificationView.hide();
        });
    };

    /**
     * Wraps a Backbone event callback to disable the event's target element.
     *
     * This paradigm is designed to be used in Backbone event maps where
     * multiple events firing simultaneously is not desired.
     *
     * @param functionName the function to execute, as a string.
     * The function must return a jQuery promise and be able to take an event
     */
    withDisabledElement = function withDisabledElement(functionName) {
        return function (event) {
            var view = this;
            disableElementWhileRunning($(event.currentTarget), function () {
                // call view.functionName(event), with view as the current this
                return view[functionName].apply(view, [event]);
            });
        };
    };

    /**
     * Disables a given element when a given operation is running.
     * @param {jQuery} element the element to be disabled.
     * @param operation the operation during whose duration the
     * element should be disabled. The operation should return
     * a JQuery promise.
     */
    disableElementWhileRunning = function disableElementWhileRunning(element, operation) {
        element.addClass('is-disabled').attr('aria-disabled', true);
        return operation().always(function () {
            element.removeClass('is-disabled').attr('aria-disabled', false);
        });
    };

    /**
     * Returns a handler that removes a notification, both dismissing it and deleting it from the database.
     * @param callback function to call when deletion succeeds
     */
    deleteNotificationHandler = function deleteNotificationHandler(callback) {
        return function (event) {
            event.preventDefault();
            $.ajax({
                url: $(this).data('dismiss-link'),
                type: 'DELETE',
                success: callback
            });
        };
    };

    /**
     * Performs an animated scroll so that the window has the specified scroll top.
     * @param scrollTop The desired scroll top for the window.
     */
    setScrollTop = function setScrollTop(scrollTop) {
        $('html, body').animate({
            scrollTop: scrollTop
        }, 500);
    };

    /**
     * Returns the relative position that the element is scrolled from the top of the view port.
     * @param element The element in question.
     */
    getScrollOffset = function getScrollOffset(element) {
        var elementTop = element.offset().top;
        return elementTop - $(window).scrollTop();
    };

    /**
     * Scrolls the window so that the element is scrolled down to the specified relative position
     * from the top of the view port.
     * @param element The element in question.
     * @param offset The amount by which the element should be scrolled from the top of the view port.
     */
    setScrollOffset = function setScrollOffset(element, offset) {
        var elementTop = element.offset().top,
            newScrollTop = elementTop - offset;
        setScrollTop(newScrollTop);
    };

    /**
     * Redirects to the specified URL. This is broken out as its own function for unit testing.
     */
    redirect = function redirect(url) {
        window.location = url;
    };

    /**
     * Reloads the page. This is broken out as its own function for unit testing.
     */
    reload = function reload() {
        window.location.reload();
    };

    /**
     * Returns true if a model has changes to at least one of the specified attributes.
     * @param model The model in question.
     * @param attributes The list of attributes to be compared.
     * @returns {boolean} Returns true if attribute changes are found.
     */
    hasChangedAttributes = function hasChangedAttributes(model, attributes) {
        var i,
            changedAttributes = model.changedAttributes();
        if (!changedAttributes) {
            return false;
        }
        for (i = 0; i < attributes.length; i++) {
            if (_.has(changedAttributes, attributes[i])) {
                return true;
            }
        }
        return false;
    };

    /**
     * Helper method for course/library creation - verifies a required field is not blank.
     */
    validateRequiredField = function validateRequiredField(msg) {
        return msg.length === 0 ? gettext('Required field.') : '';
    };

    /**
     * Helper method for course/library creation.
     * Check that a course (org, number, run) doesn't use any special characters
     */
    validateURLItemEncoding = function validateURLItemEncoding(item, allowUnicode) {
        var required = validateRequiredField(item);
        if (required) {
            return required;
        }
        if (allowUnicode) {
            if (/\s/g.test(item)) {
                return gettext('Please do not use any spaces in this field.');
            }
        } else {
            if (item !== encodeURIComponent(item) || item.match(/[!'()*]/)) {
                return gettext('Please do not use any spaces or special characters in this field.');
            }
        }
        return '';
    };

    // Ensure that sum length of key field values <= ${MAX_SUM_KEY_LENGTH} chars.
    validateTotalKeyLength = function validateTotalKeyLength(key_field_selectors) {
        var totalLength = _.reduce(key_field_selectors, function (sum, ele) {
            return sum + $(ele).val().length;
        }, 0);
        return totalLength <= MAX_SUM_KEY_LENGTH;
    };

    checkTotalKeyLengthViolations = function checkTotalKeyLengthViolations(selectors, classes, key_field_selectors, message_tpl) {
        if (!validateTotalKeyLength(key_field_selectors)) {
            $(selectors.errorWrapper).addClass(classes.shown).removeClass(classes.hiding);
            $(selectors.errorMessage).html('<p>' + _.template(message_tpl)({ limit: MAX_SUM_KEY_LENGTH }) + '</p>');
            $(selectors.save).addClass(classes.disabled);
        } else {
            $(selectors.errorWrapper).removeClass(classes.shown).addClass(classes.hiding);
        }
    };

    /**
     * Dynamically loads the specified JavaScript file.
     * @param url The URL to a JavaScript file.
     * @returns {Promise} A promise indicating when the URL has been loaded.
     */
    loadJavaScript = function loadJavaScript(url) {
        var deferred = $.Deferred();
        __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())]; (function () {
            deferred.resolve();
        }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(function () {
            deferred.reject();
        });
        return deferred.promise();
    };

    return {
        toggleExpandCollapse: toggleExpandCollapse,
        showLoadingIndicator: showLoadingIndicator,
        hideLoadingIndicator: hideLoadingIndicator,
        confirmThenRunOperation: confirmThenRunOperation,
        runOperationShowingMessage: runOperationShowingMessage,
        withDisabledElement: withDisabledElement,
        disableElementWhileRunning: disableElementWhileRunning,
        deleteNotificationHandler: deleteNotificationHandler,
        setScrollTop: setScrollTop,
        getScrollOffset: getScrollOffset,
        setScrollOffset: setScrollOffset,
        redirect: redirect,
        reload: reload,
        hasChangedAttributes: hasChangedAttributes,
        validateRequiredField: validateRequiredField,
        validateURLItemEncoding: validateURLItemEncoding,
        validateTotalKeyLength: validateTotalKeyLength,
        checkTotalKeyLengthViolations: checkTotalKeyLengthViolations,
        loadJavaScript: loadJavaScript
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./common/static/common/js/components/views/feedback_prompt.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;


!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__(2), __webpack_require__("./node_modules/underscore.string/index.js"), __webpack_require__("./common/static/common/js/components/views/feedback.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function ($, _, str, SystemFeedbackView) {
    var Prompt = SystemFeedbackView.extend({
        options: $.extend({}, SystemFeedbackView.prototype.options, {
            type: 'prompt',
            closeIcon: false,
            icon: false
        }),
        render: function render() {
            if (!window.$body) {
                window.$body = $(document.body);
            }
            if (this.options.shown) {
                $body.addClass('prompt-is-shown');
            } else {
                $body.removeClass('prompt-is-shown');
            }
            // super() in Javascript has awkward syntax :(
            return SystemFeedbackView.prototype.render.apply(this, arguments);
        },
        show: function show() {
            SystemFeedbackView.prototype.show.apply(this, arguments);
            return this.inFocus();
        },

        hide: function hide() {
            SystemFeedbackView.prototype.hide.apply(this, arguments);
            return this.outFocus();
        }
    });

    // create Prompt.Warning, Prompt.Confirmation, etc
    var capitalCamel, intents;
    capitalCamel = _.compose(str.capitalize, str.camelize);
    intents = ['warning', 'error', 'confirmation', 'announcement', 'step-required', 'help', 'mini'];
    _.each(intents, function (intent) {
        var subclass;
        subclass = Prompt.extend({
            options: $.extend({}, Prompt.prototype.options, {
                intent: intent
            })
        });
        Prompt[capitalCamel(intent)] = subclass;
    });

    return Prompt;
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./common/static/common/js/utils/page_factory.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
    'use strict';

    return function invokePageFactory(name, factory) {
        var args;

        if (typeof window.pageFactoryArguments === 'undefined') {
            throw Error('window.pageFactoryArguments must be initialized before calling invokePageFactory(' + name + '). Use the <%static:invoke_page_bundle> template tag.');
        }
        args = window.pageFactoryArguments[name];

        if (typeof args === 'undefined') {
            throw Error('window.pageFactoryArguments["' + name + '"] must be initialized before calling invokePageFactory(' + name + '). Use the <%static:invoke_page_bundle> template tag.');
        }
        factory.apply(null, window.pageFactoryArguments[name]);
    };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./common/static/js/src/accessibility_tools.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {/*

============================================
License for Application
============================================

This license is governed by United States copyright law, and with respect to matters
of tort, contract, and other causes of action it is governed by North Carolina law,
without regard to North Carolina choice of law provisions.  The forum for any dispute
resolution shall be in Wake County, North Carolina.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list
   of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this
   list of conditions and the following disclaimer in the documentation and/or other
   materials provided with the distribution.

3. The name of the author may not be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE AUTHOR "AS IS" AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE AUTHOR BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

*/

var $focusedElementBeforeModal,
    focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

var reassignTabIndexesAndAriaHidden = function reassignTabIndexesAndAriaHidden(focusableElementsFilterString, closeButtonId, modalId, mainPageId) {
    // Sets appropriate elements to tab indexable and properly sets aria_hidden on content outside of modal
    // "focusableElementsFilterString" is a string that indicates all elements that should be focusable
    // "closeButtonId" is the selector for the button that closes out the modal.
    // "modalId" is the selector for the modal being managed
    // "mainPageId" is the selector for the main part of the page
    // Returns a list of focusableItems
    var focusableItems;

    $(mainPageId).attr('aria-hidden', 'true');
    $(modalId).attr('aria-hidden', 'false');

    focusableItems = $(modalId).find('*').filter(focusableElementsFilterString).filter(':visible');

    focusableItems.attr('tabindex', '2');
    $(closeButtonId).attr('tabindex', '1').focus();

    return focusableItems;
};

var trapTabFocus = function trapTabFocus(focusableItems, closeButtonId) {
    // Determines last element in modal and traps focus by causing tab
    // to focus on the first modal element (close button)
    // "focusableItems" all elements in the modal that are focusable
    // "closeButtonId" is the selector for the button that closes out the modal.
    // returns the last focusable element in the modal.
    var $last;
    if (focusableItems.length !== 0) {
        $last = focusableItems.last();
    } else {
        $last = $(closeButtonId);
    }

    // tab on last element in modal returns to the first one
    $last.on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        // 9 is the js keycode for tab
        if (!e.shiftKey && keyCode === 9) {
            e.preventDefault();
            $(closeButtonId).focus();
        }
    });

    return $last;
};

var trapShiftTabFocus = function trapShiftTabFocus($last, closeButtonId) {
    $(closeButtonId).on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        // 9 is the js keycode for tab
        if (e.shiftKey && keyCode === 9) {
            e.preventDefault();
            $last.focus();
        }
    });
};

var bindReturnFocusListener = function bindReturnFocusListener($previouslyFocusedElement, closeButtonId, modalId, mainPageId) {
    // Ensures that on modal close, focus is returned to the element
    // that had focus before the modal was opened.
    $('#lean_overlay, ' + closeButtonId).click(function () {
        $(mainPageId).attr('aria-hidden', 'false');
        $(modalId).attr('aria-hidden', 'true');
        $previouslyFocusedElement.focus();
    });
};

var bindEscapeKeyListener = function bindEscapeKeyListener(modalId, closeButtonId) {
    $(modalId).on('keydown', function (e) {
        var keyCode = e.keyCode || e.which;
        // 27 is the javascript keycode for the ESC key
        if (keyCode === 27) {
            e.preventDefault();
            $(closeButtonId).click();
        }
    });
};

var trapFocusForAccessibleModal = function trapFocusForAccessibleModal($previouslyFocusedElement, focusableElementsFilterString, closeButtonId, modalId, mainPageId) {
    // Re assess the page for which items internal to the modal should be focusable,
    // Should be called after the content of the accessible_modal is changed in order
    // to ensure that the correct elements are accessible.
    var focusableItems, $last;
    focusableItems = reassignTabIndexesAndAriaHidden(focusableElementsFilterString, closeButtonId, modalId, mainPageId);
    $last = trapTabFocus(focusableItems, closeButtonId);
    trapShiftTabFocus($last, closeButtonId);
    bindReturnFocusListener($previouslyFocusedElement, closeButtonId, modalId, mainPageId);
    bindEscapeKeyListener(modalId, closeButtonId);
};

var accessible_modal = function accessible_modal(trigger, closeButtonId, modalId, mainPageId) {
    // Modifies a lean modal to optimize focus management.
    // "trigger" is the selector for the link element that triggers the modal.
    // "closeButtonId" is the selector for the button that closes out the modal.
    // "modalId" is the selector for the modal being managed
    // "mainPageId" is the selector for the main part of the page
    //
    // based on http://accessibility.oit.ncsu.edu/training/aria/modal-window/modal-window.js
    //
    // see http://accessibility.oit.ncsu.edu/blog/2013/09/13/the-incredible-accessible-modal-dialog/
    // for more information on managing modals
    //
    var initialFocus;
    $(trigger).click(function () {
        $focusedElementBeforeModal = $(trigger);

        trapFocusForAccessibleModal($focusedElementBeforeModal, focusableElementsString, closeButtonId, modalId, mainPageId);

        // In IE, focus shifts to iframes when they load.
        // These lines ensure that focus is shifted back to the close button
        // in the case that a modal that contains an iframe is opened in IE.
        // see http://stackoverflow.com/questions/15792620/
        initialFocus = true;
        $(modalId).find('iframe').on('focus', function () {
            if (initialFocus) {
                $(closeButtonId).focus();
                initialFocus = false;
            }
        });
    });
};

// NOTE: This is a gross hack to make the skip links work for Webkit browsers
// see http://stackoverflow.com/questions/6280399/skip-links-not-working-in-chrome/12720183#12720183

// handle things properly for clicks
$('.nav-skip').click(function () {
    var href = $(this).attr('href');
    if (href) {
        $(href).attr('tabIndex', -1).focus();
    }
});
// and for the enter key
$('.nav-skip').keypress(function (e) {
    var href;
    if (e.which === 13) {
        href = $(this).attr('href');
        if (href) {
            $(href).attr('tabIndex', -1).focus();
        }
    }
});

// Creates a window level SR object that can be used for giving audible feedback to screen readers.
$(function () {
    var SRAlert;

    SRAlert = function () {
        function SRAlert() {
            // This initialization sometimes gets done twice, so take to only create a single reader-feedback div.
            var readerFeedbackID = 'reader-feedback',
                $readerFeedbackSelector = $('#' + readerFeedbackID);

            if ($readerFeedbackSelector.length === 0) {
                edx.HtmlUtils.append($('body'), edx.HtmlUtils.interpolateHtml(edx.HtmlUtils.HTML('<div id="{readerFeedbackID}" class="sr" aria-live="polite"></div>'), { readerFeedbackID: readerFeedbackID }));
            }
            this.el = $('#' + readerFeedbackID);
        }

        SRAlert.prototype.clear = function () {
            edx.HtmlUtils.setHtml(this.el, '');
        };

        SRAlert.prototype.readElts = function (elts) {
            var texts = [];
            $.each(elts, function (idx, value) {
                texts.push($(value).html());
            });
            return this.readTexts(texts);
        };

        SRAlert.prototype.readText = function (text) {
            return this.readTexts([text]);
        };

        SRAlert.prototype.readTexts = function (texts) {
            var htmlFeedback = edx.HtmlUtils.HTML('');
            $.each(texts, function (idx, value) {
                htmlFeedback = edx.HtmlUtils.interpolateHtml(edx.HtmlUtils.HTML('{previous_feedback}<p>{value}</p>\n'),
                // "value" may be HTML, if an element is being passed
                { previous_feedback: htmlFeedback, value: edx.HtmlUtils.HTML(value) });
            });
            edx.HtmlUtils.setHtml(this.el, htmlFeedback);
        };

        return SRAlert;
    }();

    window.SR = new SRAlert();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./common/static/js/src/ie_shim.js":
/***/ (function(module, exports) {

/*
 * This file is used for keeping compatibility with Internet Explorer.
 * As starting with IE10, the conditional comments are not supported, this file
 * will always be loaded whether the browser is IE or not. Therefore, the code
 * here should not make any assumption and should always detect the execution
 * conditions itself.
 */

// Shim name: Create the attribute of 'window.location.origin'
// IE version: 11 or earlier, 12 or later not tested
// Internet Explorer does not have built-in property 'window.location.origin',
// we need to create one here as some vendor code such as TinyMCE uses this.
if (!window.location.origin) {
  window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
}

/***/ }),

/***/ "./common/static/js/src/lang_edx.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var Language = function () {
    'use strict';

    var $settings_language_selector,
        self = null;
    return {
        init: function init() {
            $settings_language_selector = $('#settings-language-value');
            self = this;
            this.listenForLanguagePreferenceChange();
        },

        /**
         * Listener on changing language from selector.
         * Send an ajax request to save user language preferences.
         */
        listenForLanguagePreferenceChange: function listenForLanguagePreferenceChange() {
            $settings_language_selector.change(function (event) {
                var language = this.value,
                    url = $('.url-endpoint').val(),
                    is_user_authenticated = JSON.parse($('.url-endpoint').data('user-is-authenticated'));
                event.preventDefault();
                self.submitAjaxRequest(language, url, function () {
                    if (is_user_authenticated) {
                        // User language preference has been set successfully
                        // Now submit the form in success callback.
                        $('#language-settings-form').submit();
                    } else {
                        self.refresh();
                    }
                });
            });
        },

        /**
         * Send an ajax request to set user language preferences.
         */
        submitAjaxRequest: function submitAjaxRequest(language, url, callback) {
            $.ajax({
                type: 'PATCH',
                data: JSON.stringify({ 'pref-lang': language }),
                url: url,
                dataType: 'json',
                contentType: 'application/merge-patch+json',
                notifyOnError: false,
                beforeSend: function beforeSend(xhr) {
                    xhr.setRequestHeader('X-CSRFToken', $.cookie('csrftoken'));
                }
            }).done(function () {
                callback();
            }).fail(function () {
                self.refresh();
            });
        },

        /**
         * refresh the page.
         */
        refresh: function refresh() {
            // reloading the page so we can get the latest state of released languages from model
            location.reload();
        }

    };
}();
$(document).ready(function () {
    'use strict';

    Language.init();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./common/static/js/src/logger.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {(function () {
    'use strict';

    var Logger = function () {
        // listeners[event_type][element] -> list of callbacks
        var listeners = {},
            sendRequest,
            has;

        sendRequest = function sendRequest(data, options) {
            var request = $.ajaxWithPrefix ? $.ajaxWithPrefix : $.ajax;

            options = $.extend(true, {
                url: '/event',
                type: 'POST',
                data: data,
                async: true
            }, options);
            return request(options);
        };

        has = function has(object, propertyName) {
            return {}.hasOwnProperty.call(object, propertyName);
        };

        return {
            /**
             * Emits an event.
             *
             * Note that this method is used by external XBlocks, and the API cannot change without
             * proper deprecation and notification for external authors.
             */
            log: function log(eventType, data, element, requestOptions) {
                var callbacks;

                if (!element) {
                    // null element in the listener dictionary means any element will do.
                    // null element in the Logger.log call means we don't know the element name.
                    element = null;
                }
                // Check to see if we're listening for the event type.
                if (has(listeners, eventType)) {
                    if (has(listeners[eventType], element)) {
                        // Make the callbacks.
                        callbacks = listeners[eventType][element];
                        $.each(callbacks, function (index, callback) {
                            try {
                                callback(eventType, data, element);
                            } catch (err) {
                                console.error({
                                    eventType: eventType,
                                    data: data,
                                    element: element,
                                    error: err
                                });
                            }
                        });
                    }
                }
                // Regardless of whether any callbacks were made, log this event.
                return sendRequest({
                    event_type: eventType,
                    event: JSON.stringify(data),
                    page: window.location.href
                }, requestOptions);
            },

            /**
             * Adds a listener. If you want any element to trigger this listener,
             * do element = null.
             *
             * Note that this method is used by external XBlocks, and the API cannot change without
             * proper deprecation and notification for external authors.
             */
            listen: function listen(eventType, element, callback) {
                listeners[eventType] = listeners[eventType] || {};
                listeners[eventType][element] = listeners[eventType][element] || [];
                listeners[eventType][element].push(callback);
            },

            /**
             * Binds `page_close` event.
             *
             * Note that this method is used by external XBlocks, and the API cannot change without
             * proper deprecation and notification for external authors.
             */
            bind: function bind() {
                window.onunload = function () {
                    sendRequest({
                        event_type: 'page_close',
                        event: '',
                        page: window.location.href
                    }, { type: 'GET', async: false });
                };
            }
        };
    }();

    this.Logger = Logger;
    // log_event exists for compatibility reasons and will soon be deprecated.
    this.log_event = Logger.log;
}).call(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./common/static/js/src/tooltip_manager.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($, _) {(function () {
    'use strict';

    var TooltipManager = function TooltipManager(element) {
        this.element = $(element);
        // If tooltip container already exist, use it.
        this.tooltip = $('div.' + this.className.split(/\s+/).join('.'));
        // Otherwise, create new one.
        if (!this.tooltip.length) {
            this.tooltip = $('<div />', {
                class: this.className
            }).appendTo(this.element);
        }

        this.hide();
        _.bindAll(this, 'show', 'hide', 'showTooltip', 'moveTooltip', 'hideTooltip', 'click');
        this.bindEvents();
    };

    TooltipManager.prototype = {
        // Space separated list of class names for the tooltip container.
        className: 'tooltip',
        SELECTOR: '[data-tooltip]',

        bindEvents: function bindEvents() {
            this.element.on({
                'mouseover.TooltipManager': this.showTooltip,
                'mousemove.TooltipManager': this.moveTooltip,
                'mouseout.TooltipManager': this.hideTooltip,
                'click.TooltipManager': this.click
            }, this.SELECTOR);
        },

        getCoords: function getCoords(pageX, pageY) {
            return {
                left: pageX - 0.5 * this.tooltip.outerWidth(),
                top: pageY - (this.tooltip.outerHeight() + 15)
            };
        },

        show: function show() {
            this.tooltip.show().css('opacity', 1);
        },

        hide: function hide() {
            this.tooltip.hide().css('opacity', 0);
        },

        showTooltip: function showTooltip(event) {
            this.prepareTooltip(event.currentTarget, event.pageX, event.pageY);
            if (this.tooltipTimer) {
                clearTimeout(this.tooltipTimer);
            }
            this.tooltipTimer = setTimeout(this.show, 500);
        },

        prepareTooltip: function prepareTooltip(element, pageX, pageY) {
            pageX = typeof pageX !== 'undefined' ? pageX : element.offset().left + element.width() / 2;
            pageY = typeof pageY !== 'undefined' ? pageY : element.offset().top + element.height() / 2;
            var tooltipText = $(element).attr('data-tooltip');
            this.tooltip.html(tooltipText).css(this.getCoords(pageX, pageY));
        },

        // To manually trigger a tooltip to reveal, other than through user mouse movement:
        openTooltip: function openTooltip(element) {
            this.prepareTooltip(element);
            this.show();
            if (this.tooltipTimer) {
                clearTimeout(this.tooltipTimer);
            }
        },

        moveTooltip: function moveTooltip(event) {
            this.tooltip.css(this.getCoords(event.pageX, event.pageY));
        },

        hideTooltip: function hideTooltip() {
            clearTimeout(this.tooltipTimer);
            // Wait for a 50ms before hiding the tooltip to avoid blinking when
            // the item contains nested elements.
            this.tooltipTimer = setTimeout(this.hide, 50);
        },

        click: function click(event) {
            var showOnClick = !!$(event.currentTarget).data('tooltip-show-on-click'); // Default is false
            if (showOnClick) {
                this.show();
                if (this.tooltipTimer) {
                    clearTimeout(this.tooltipTimer);
                }
            } else {
                this.hideTooltip(event);
            }
        },

        destroy: function destroy() {
            this.tooltip.remove();
            // Unbind all delegated event handlers in the ".TooltipManager"
            // namespace.
            this.element.off('.TooltipManager', this.SELECTOR);
        }
    };

    window.TooltipManager = TooltipManager;
    $(document).ready(function () {
        window.globalTooltipManager = new TooltipManager(document.body);
    });
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(2)))

/***/ }),

/***/ "./common/static/js/vendor/date.js":
/***/ (function(module, exports) {

/**
 * @version: 1.0 Alpha-1
 * @author: Coolite Inc. http://www.coolite.com/
 * @date: 2008-05-13
 * @copyright: Copyright (c) 2006-2008, Coolite Inc. (http://www.coolite.com/). All rights reserved.
 * @license: Licensed under The MIT License. See license.txt and http://www.datejs.com/license/.
 * @website: http://www.datejs.com/
 */
Date.CultureInfo = { name: "en-US", englishName: "English (United States)", nativeName: "English (United States)", dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], abbreviatedDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], shortestDayNames: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], firstLetterDayNames: ["S", "M", "T", "W", "T", "F", "S"], monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], abbreviatedMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], amDesignator: "AM", pmDesignator: "PM", firstDayOfWeek: 0, twoDigitYearMax: 2029, dateElementOrder: "mdy", formatPatterns: { shortDate: "M/d/yyyy", longDate: "dddd, MMMM dd, yyyy", shortTime: "h:mm tt", longTime: "h:mm:ss tt", fullDateTime: "dddd, MMMM dd, yyyy h:mm:ss tt", sortableDateTime: "yyyy-MM-ddTHH:mm:ss", universalSortableDateTime: "yyyy-MM-dd HH:mm:ssZ", rfc1123: "ddd, dd MMM yyyy HH:mm:ss GMT", monthDay: "MMMM dd", yearMonth: "MMMM, yyyy" }, regexPatterns: { jan: /^jan(uary)?/i, feb: /^feb(ruary)?/i, mar: /^mar(ch)?/i, apr: /^apr(il)?/i, may: /^may/i, jun: /^jun(e)?/i, jul: /^jul(y)?/i, aug: /^aug(ust)?/i, sep: /^sep(t(ember)?)?/i, oct: /^oct(ober)?/i, nov: /^nov(ember)?/i, dec: /^dec(ember)?/i, sun: /^su(n(day)?)?/i, mon: /^mo(n(day)?)?/i, tue: /^tu(e(s(day)?)?)?/i, wed: /^we(d(nesday)?)?/i, thu: /^th(u(r(s(day)?)?)?)?/i, fri: /^fr(i(day)?)?/i, sat: /^sa(t(urday)?)?/i, future: /^next/i, past: /^last|past|prev(ious)?/i, add: /^(\+|aft(er)?|from|hence)/i, subtract: /^(\-|bef(ore)?|ago)/i, yesterday: /^yes(terday)?/i, today: /^t(od(ay)?)?/i, tomorrow: /^tom(orrow)?/i, now: /^n(ow)?/i, millisecond: /^ms|milli(second)?s?/i, second: /^sec(ond)?s?/i, minute: /^mn|min(ute)?s?/i, hour: /^h(our)?s?/i, week: /^w(eek)?s?/i, month: /^m(onth)?s?/i, day: /^d(ay)?s?/i, year: /^y(ear)?s?/i, shortMeridian: /^(a|p)/i, longMeridian: /^(a\.?m?\.?|p\.?m?\.?)/i, timezone: /^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i, ordinalSuffix: /^\s*(st|nd|rd|th)/i, timeContext: /^\s*(\:|a(?!u|p)|p)/i }, timezones: [{ name: "UTC", offset: "-000" }, { name: "GMT", offset: "-000" }, { name: "EST", offset: "-0500" }, { name: "EDT", offset: "-0400" }, { name: "CST", offset: "-0600" }, { name: "CDT", offset: "-0500" }, { name: "MST", offset: "-0700" }, { name: "MDT", offset: "-0600" }, { name: "PST", offset: "-0800" }, { name: "PDT", offset: "-0700" }] };
(function () {
  var $D = Date,
      $P = $D.prototype,
      $C = $D.CultureInfo,
      p = function p(s, l) {
    if (!l) {
      l = 2;
    }
    return ("000" + s).slice(l * -1);
  };$P.clearTime = function () {
    this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;
  };$P.setTimeToNow = function () {
    var n = new Date();this.setHours(n.getHours());this.setMinutes(n.getMinutes());this.setSeconds(n.getSeconds());this.setMilliseconds(n.getMilliseconds());return this;
  };$D.today = function () {
    return new Date().clearTime();
  };$D.compare = function (date1, date2) {
    if (isNaN(date1) || isNaN(date2)) {
      throw new Error(date1 + " - " + date2);
    } else if (date1 instanceof Date && date2 instanceof Date) {
      return date1 < date2 ? -1 : date1 > date2 ? 1 : 0;
    } else {
      throw new TypeError(date1 + " - " + date2);
    }
  };$D.equals = function (date1, date2) {
    return date1.compareTo(date2) === 0;
  };$D.getDayNumberFromName = function (name) {
    var n = $C.dayNames,
        m = $C.abbreviatedDayNames,
        o = $C.shortestDayNames,
        s = name.toLowerCase();for (var i = 0; i < n.length; i++) {
      if (n[i].toLowerCase() == s || m[i].toLowerCase() == s || o[i].toLowerCase() == s) {
        return i;
      }
    }
    return -1;
  };$D.getMonthNumberFromName = function (name) {
    var n = $C.monthNames,
        m = $C.abbreviatedMonthNames,
        s = name.toLowerCase();for (var i = 0; i < n.length; i++) {
      if (n[i].toLowerCase() == s || m[i].toLowerCase() == s) {
        return i;
      }
    }
    return -1;
  };$D.isLeapYear = function (year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
  };$D.getDaysInMonth = function (year, month) {
    return [31, $D.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
  };$D.getTimezoneAbbreviation = function (offset) {
    var z = $C.timezones,
        p;for (var i = 0; i < z.length; i++) {
      if (z[i].offset === offset) {
        return z[i].name;
      }
    }
    return null;
  };$D.getTimezoneOffset = function (name) {
    var z = $C.timezones,
        p;for (var i = 0; i < z.length; i++) {
      if (z[i].name === name.toUpperCase()) {
        return z[i].offset;
      }
    }
    return null;
  };$P.clone = function () {
    return new Date(this.getTime());
  };$P.compareTo = function (date) {
    return Date.compare(this, date);
  };$P.equals = function (date) {
    return Date.equals(this, date || new Date());
  };$P.between = function (start, end) {
    return this.getTime() >= start.getTime() && this.getTime() <= end.getTime();
  };$P.isAfter = function (date) {
    return this.compareTo(date || new Date()) === 1;
  };$P.isBefore = function (date) {
    return this.compareTo(date || new Date()) === -1;
  };$P.isToday = function () {
    return this.isSameDay(new Date());
  };$P.isSameDay = function (date) {
    return this.clone().clearTime().equals(date.clone().clearTime());
  };$P.addMilliseconds = function (value) {
    this.setMilliseconds(this.getMilliseconds() + value);return this;
  };$P.addSeconds = function (value) {
    return this.addMilliseconds(value * 1000);
  };$P.addMinutes = function (value) {
    return this.addMilliseconds(value * 60000);
  };$P.addHours = function (value) {
    return this.addMilliseconds(value * 3600000);
  };$P.addDays = function (value) {
    this.setDate(this.getDate() + value);return this;
  };$P.addWeeks = function (value) {
    return this.addDays(value * 7);
  };$P.addMonths = function (value) {
    var n = this.getDate();this.setDate(1);this.setMonth(this.getMonth() + value);this.setDate(Math.min(n, $D.getDaysInMonth(this.getFullYear(), this.getMonth())));return this;
  };$P.addYears = function (value) {
    return this.addMonths(value * 12);
  };$P.add = function (config) {
    if (typeof config == "number") {
      this._orient = config;return this;
    }
    var x = config;if (x.milliseconds) {
      this.addMilliseconds(x.milliseconds);
    }
    if (x.seconds) {
      this.addSeconds(x.seconds);
    }
    if (x.minutes) {
      this.addMinutes(x.minutes);
    }
    if (x.hours) {
      this.addHours(x.hours);
    }
    if (x.weeks) {
      this.addWeeks(x.weeks);
    }
    if (x.months) {
      this.addMonths(x.months);
    }
    if (x.years) {
      this.addYears(x.years);
    }
    if (x.days) {
      this.addDays(x.days);
    }
    return this;
  };var $y, $m, $d;$P.getWeek = function () {
    var a, b, c, d, e, f, g, n, s, w;$y = !$y ? this.getFullYear() : $y;$m = !$m ? this.getMonth() + 1 : $m;$d = !$d ? this.getDate() : $d;if ($m <= 2) {
      a = $y - 1;b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);s = b - c;e = 0;f = $d - 1 + 31 * ($m - 1);
    } else {
      a = $y;b = (a / 4 | 0) - (a / 100 | 0) + (a / 400 | 0);c = ((a - 1) / 4 | 0) - ((a - 1) / 100 | 0) + ((a - 1) / 400 | 0);s = b - c;e = s + 1;f = $d + (153 * ($m - 3) + 2) / 5 + 58 + s;
    }
    g = (a + b) % 7;d = (f + g - e) % 7;n = f + 3 - d | 0;if (n < 0) {
      w = 53 - ((g - s) / 5 | 0);
    } else if (n > 364 + s) {
      w = 1;
    } else {
      w = (n / 7 | 0) + 1;
    }
    $y = $m = $d = null;return w;
  };$P.getISOWeek = function () {
    $y = this.getUTCFullYear();$m = this.getUTCMonth() + 1;$d = this.getUTCDate();return p(this.getWeek());
  };$P.setWeek = function (n) {
    return this.moveToDayOfWeek(1).addWeeks(n - this.getWeek());
  };$D._validate = function (n, min, max, name) {
    if (typeof n == "undefined") {
      return false;
    } else if (typeof n != "number") {
      throw new TypeError(n + " is not a Number.");
    } else if (n < min || n > max) {
      throw new RangeError(n + " is not a valid value for " + name + ".");
    }
    return true;
  };$D.validateMillisecond = function (value) {
    return $D._validate(value, 0, 999, "millisecond");
  };$D.validateSecond = function (value) {
    return $D._validate(value, 0, 59, "second");
  };$D.validateMinute = function (value) {
    return $D._validate(value, 0, 59, "minute");
  };$D.validateHour = function (value) {
    return $D._validate(value, 0, 23, "hour");
  };$D.validateDay = function (value, year, month) {
    return $D._validate(value, 1, $D.getDaysInMonth(year, month), "day");
  };$D.validateMonth = function (value) {
    return $D._validate(value, 0, 11, "month");
  };$D.validateYear = function (value) {
    return $D._validate(value, 0, 9999, "year");
  };$P.set = function (config) {
    if ($D.validateMillisecond(config.millisecond)) {
      this.addMilliseconds(config.millisecond - this.getMilliseconds());
    }
    if ($D.validateSecond(config.second)) {
      this.addSeconds(config.second - this.getSeconds());
    }
    if ($D.validateMinute(config.minute)) {
      this.addMinutes(config.minute - this.getMinutes());
    }
    if ($D.validateHour(config.hour)) {
      this.addHours(config.hour - this.getHours());
    }
    if ($D.validateMonth(config.month)) {
      this.addMonths(config.month - this.getMonth());
    }
    if ($D.validateYear(config.year)) {
      this.addYears(config.year - this.getFullYear());
    }
    if ($D.validateDay(config.day, this.getFullYear(), this.getMonth())) {
      this.addDays(config.day - this.getDate());
    }
    if (config.timezone) {
      this.setTimezone(config.timezone);
    }
    if (config.timezoneOffset) {
      this.setTimezoneOffset(config.timezoneOffset);
    }
    if (config.week && $D._validate(config.week, 0, 53, "week")) {
      this.setWeek(config.week);
    }
    return this;
  };$P.moveToFirstDayOfMonth = function () {
    return this.set({ day: 1 });
  };$P.moveToLastDayOfMonth = function () {
    return this.set({ day: $D.getDaysInMonth(this.getFullYear(), this.getMonth()) });
  };$P.moveToNthOccurrence = function (dayOfWeek, occurrence) {
    var shift = 0;if (occurrence > 0) {
      shift = occurrence - 1;
    } else if (occurrence === -1) {
      this.moveToLastDayOfMonth();if (this.getDay() !== dayOfWeek) {
        this.moveToDayOfWeek(dayOfWeek, -1);
      }
      return this;
    }
    return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek, +1).addWeeks(shift);
  };$P.moveToDayOfWeek = function (dayOfWeek, orient) {
    var diff = (dayOfWeek - this.getDay() + 7 * (orient || +1)) % 7;return this.addDays(diff === 0 ? diff += 7 * (orient || +1) : diff);
  };$P.moveToMonth = function (month, orient) {
    var diff = (month - this.getMonth() + 12 * (orient || +1)) % 12;return this.addMonths(diff === 0 ? diff += 12 * (orient || +1) : diff);
  };$P.getOrdinalNumber = function () {
    return Math.ceil((this.clone().clearTime() - new Date(this.getFullYear(), 0, 1)) / 86400000) + 1;
  };$P.getTimezone = function () {
    return $D.getTimezoneAbbreviation(this.getUTCOffset());
  };$P.setTimezoneOffset = function (offset) {
    var here = this.getTimezoneOffset(),
        there = Number(offset) * -6 / 10;return this.addMinutes(there - here);
  };$P.setTimezone = function (offset) {
    return this.setTimezoneOffset($D.getTimezoneOffset(offset));
  };$P.hasDaylightSavingTime = function () {
    return Date.today().set({ month: 0, day: 1 }).getTimezoneOffset() !== Date.today().set({ month: 6, day: 1 }).getTimezoneOffset();
  };$P.isDaylightSavingTime = function () {
    return this.hasDaylightSavingTime() && new Date().getTimezoneOffset() === Date.today().set({ month: 6, day: 1 }).getTimezoneOffset();
  };$P.getUTCOffset = function () {
    var n = this.getTimezoneOffset() * -10 / 6,
        r;if (n < 0) {
      r = (n - 10000).toString();return r.charAt(0) + r.substr(2);
    } else {
      r = (n + 10000).toString();return "+" + r.substr(1);
    }
  };$P.getElapsed = function (date) {
    return (date || new Date()) - this;
  };if (!$P.toISOString) {
    $P.toISOString = function () {
      function f(n) {
        return n < 10 ? '0' + n : n;
      }
      return '"' + this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z"';
    };
  }
  if (typeof $P._toString === 'undefined') {
    $P._toString = $P.toString;
  }$P.toString = function (format) {
    var x = this;if (format && format.length == 1) {
      var c = $C.formatPatterns;x.t = x.toString;switch (format) {case "d":
          return x.t(c.shortDate);case "D":
          return x.t(c.longDate);case "F":
          return x.t(c.fullDateTime);case "m":
          return x.t(c.monthDay);case "r":
          return x.t(c.rfc1123);case "s":
          return x.t(c.sortableDateTime);case "t":
          return x.t(c.shortTime);case "T":
          return x.t(c.longTime);case "u":
          return x.t(c.universalSortableDateTime);case "y":
          return x.t(c.yearMonth);}
    }
    var ord = function ord(n) {
      switch (n * 1) {case 1:case 21:case 31:
          return "st";case 2:case 22:
          return "nd";case 3:case 23:
          return "rd";default:
          return "th";}
    };return format ? format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g, function (m) {
      if (m.charAt(0) === "\\") {
        return m.replace("\\", "");
      }
      x.h = x.getHours;switch (m) {case "hh":
          return p(x.h() < 13 ? x.h() === 0 ? 12 : x.h() : x.h() - 12);case "h":
          return x.h() < 13 ? x.h() === 0 ? 12 : x.h() : x.h() - 12;case "HH":
          return p(x.h());case "H":
          return x.h();case "mm":
          return p(x.getMinutes());case "m":
          return x.getMinutes();case "ss":
          return p(x.getSeconds());case "s":
          return x.getSeconds();case "yyyy":
          return p(x.getFullYear(), 4);case "yy":
          return p(x.getFullYear());case "dddd":
          return $C.dayNames[x.getDay()];case "ddd":
          return $C.abbreviatedDayNames[x.getDay()];case "dd":
          return p(x.getDate());case "d":
          return x.getDate();case "MMMM":
          return $C.monthNames[x.getMonth()];case "MMM":
          return $C.abbreviatedMonthNames[x.getMonth()];case "MM":
          return p(x.getMonth() + 1);case "M":
          return x.getMonth() + 1;case "t":
          return x.h() < 12 ? $C.amDesignator.substring(0, 1) : $C.pmDesignator.substring(0, 1);case "tt":
          return x.h() < 12 ? $C.amDesignator : $C.pmDesignator;case "S":
          return ord(x.getDate());default:
          return m;}
    }) : this._toString();
  };
})();
(function () {
  var $D = Date,
      $P = $D.prototype,
      $C = $D.CultureInfo,
      $N = Number.prototype;$P._orient = +1;$P._nth = null;$P._is = false;$P._same = false;$P._isSecond = false;$N._dateElement = "day";$P.next = function () {
    this._orient = +1;return this;
  };$D.next = function () {
    return $D.today().next();
  };$P.last = $P.prev = $P.previous = function () {
    this._orient = -1;return this;
  };$D.last = $D.prev = $D.previous = function () {
    return $D.today().last();
  };$P.is = function () {
    this._is = true;return this;
  };$P.same = function () {
    this._same = true;this._isSecond = false;return this;
  };$P.today = function () {
    return this.same().day();
  };$P.weekday = function () {
    if (this._is) {
      this._is = false;return !this.is().sat() && !this.is().sun();
    }
    return false;
  };$P.at = function (time) {
    return typeof time === "string" ? $D.parse(this.toString("d") + " " + time) : this.set(time);
  };$N.fromNow = $N.after = function (date) {
    var c = {};c[this._dateElement] = this;return (!date ? new Date() : date.clone()).add(c);
  };$N.ago = $N.before = function (date) {
    var c = {};c[this._dateElement] = this * -1;return (!date ? new Date() : date.clone()).add(c);
  };var dx = "sunday monday tuesday wednesday thursday friday saturday".split(/\s/),
      mx = "january february march april may june july august september october november december".split(/\s/),
      px = "Millisecond Second Minute Hour Day Week Month Year".split(/\s/),
      pxf = "Milliseconds Seconds Minutes Hours Date Week Month FullYear".split(/\s/),
      nth = "final first second third fourth fifth".split(/\s/),
      de;$P.toObject = function () {
    var o = {};for (var i = 0; i < px.length; i++) {
      o[px[i].toLowerCase()] = this["get" + pxf[i]]();
    }
    return o;
  };$D.fromObject = function (config) {
    config.week = null;return Date.today().set(config);
  };var df = function df(n) {
    return function () {
      if (this._is) {
        this._is = false;return this.getDay() == n;
      }
      if (this._nth !== null) {
        if (this._isSecond) {
          this.addSeconds(this._orient * -1);
        }
        this._isSecond = false;var ntemp = this._nth;this._nth = null;var temp = this.clone().moveToLastDayOfMonth();this.moveToNthOccurrence(n, ntemp);if (this > temp) {
          throw new RangeError($D.getDayName(n) + " does not occur " + ntemp + " times in the month of " + $D.getMonthName(temp.getMonth()) + " " + temp.getFullYear() + ".");
        }
        return this;
      }
      return this.moveToDayOfWeek(n, this._orient);
    };
  };var sdf = function sdf(n) {
    return function () {
      var t = $D.today(),
          shift = n - t.getDay();if (n === 0 && $C.firstDayOfWeek === 1 && t.getDay() !== 0) {
        shift = shift + 7;
      }
      return t.addDays(shift);
    };
  };for (var i = 0; i < dx.length; i++) {
    $D[dx[i].toUpperCase()] = $D[dx[i].toUpperCase().substring(0, 3)] = i;$D[dx[i]] = $D[dx[i].substring(0, 3)] = sdf(i);$P[dx[i]] = $P[dx[i].substring(0, 3)] = df(i);
  }
  var mf = function mf(n) {
    return function () {
      if (this._is) {
        this._is = false;return this.getMonth() === n;
      }
      return this.moveToMonth(n, this._orient);
    };
  };var smf = function smf(n) {
    return function () {
      return $D.today().set({ month: n, day: 1 });
    };
  };for (var j = 0; j < mx.length; j++) {
    $D[mx[j].toUpperCase()] = $D[mx[j].toUpperCase().substring(0, 3)] = j;$D[mx[j]] = $D[mx[j].substring(0, 3)] = smf(j);$P[mx[j]] = $P[mx[j].substring(0, 3)] = mf(j);
  }
  var ef = function ef(j) {
    return function () {
      if (this._isSecond) {
        this._isSecond = false;return this;
      }
      if (this._same) {
        this._same = this._is = false;var o1 = this.toObject(),
            o2 = (arguments[0] || new Date()).toObject(),
            v = "",
            k = j.toLowerCase();for (var m = px.length - 1; m > -1; m--) {
          v = px[m].toLowerCase();if (o1[v] != o2[v]) {
            return false;
          }
          if (k == v) {
            break;
          }
        }
        return true;
      }
      if (j.substring(j.length - 1) != "s") {
        j += "s";
      }
      return this["add" + j](this._orient);
    };
  };var nf = function nf(n) {
    return function () {
      this._dateElement = n;return this;
    };
  };for (var k = 0; k < px.length; k++) {
    de = px[k].toLowerCase();$P[de] = $P[de + "s"] = ef(px[k]);$N[de] = $N[de + "s"] = nf(de);
  }
  $P._ss = ef("Second");var nthfn = function nthfn(n) {
    return function (dayOfWeek) {
      if (this._same) {
        return this._ss(arguments[0]);
      }
      if (dayOfWeek || dayOfWeek === 0) {
        return this.moveToNthOccurrence(dayOfWeek, n);
      }
      this._nth = n;if (n === 2 && (dayOfWeek === undefined || dayOfWeek === null)) {
        this._isSecond = true;return this.addSeconds(this._orient);
      }
      return this;
    };
  };for (var l = 0; l < nth.length; l++) {
    $P[nth[l]] = l === 0 ? nthfn(-1) : nthfn(l);
  }
})();
(function () {
  Date.Parsing = { Exception: function Exception(s) {
      this.message = "Parse error at '" + s.substring(0, 10) + " ...'";
    } };var $P = Date.Parsing;var _ = $P.Operators = { rtoken: function rtoken(r) {
      return function (s) {
        var mx = s.match(r);if (mx) {
          return [mx[0], s.substring(mx[0].length)];
        } else {
          throw new $P.Exception(s);
        }
      };
    }, token: function token(s) {
      return function (s) {
        return _.rtoken(new RegExp("^\s*" + s + "\s*"))(s);
      };
    }, stoken: function stoken(s) {
      return _.rtoken(new RegExp("^" + s));
    }, until: function until(p) {
      return function (s) {
        var qx = [],
            rx = null;while (s.length) {
          try {
            rx = p.call(this, s);
          } catch (e) {
            qx.push(rx[0]);s = rx[1];continue;
          }
          break;
        }
        return [qx, s];
      };
    }, many: function many(p) {
      return function (s) {
        var rx = [],
            r = null;while (s.length) {
          try {
            r = p.call(this, s);
          } catch (e) {
            return [rx, s];
          }
          rx.push(r[0]);s = r[1];
        }
        return [rx, s];
      };
    }, optional: function optional(p) {
      return function (s) {
        var r = null;try {
          r = p.call(this, s);
        } catch (e) {
          return [null, s];
        }
        return [r[0], r[1]];
      };
    }, not: function not(p) {
      return function (s) {
        try {
          p.call(this, s);
        } catch (e) {
          return [null, s];
        }
        throw new $P.Exception(s);
      };
    }, ignore: function ignore(p) {
      return p ? function (s) {
        var r = null;r = p.call(this, s);return [null, r[1]];
      } : null;
    }, product: function product() {
      var px = arguments[0],
          qx = Array.prototype.slice.call(arguments, 1),
          rx = [];for (var i = 0; i < px.length; i++) {
        rx.push(_.each(px[i], qx));
      }
      return rx;
    }, cache: function cache(rule) {
      var cache = {},
          r = null;return function (s) {
        try {
          r = cache[s] = cache[s] || rule.call(this, s);
        } catch (e) {
          r = cache[s] = e;
        }
        if (r instanceof $P.Exception) {
          throw r;
        } else {
          return r;
        }
      };
    }, any: function any() {
      var px = arguments;return function (s) {
        var r = null;for (var i = 0; i < px.length; i++) {
          if (px[i] == null) {
            continue;
          }
          try {
            r = px[i].call(this, s);
          } catch (e) {
            r = null;
          }
          if (r) {
            return r;
          }
        }
        throw new $P.Exception(s);
      };
    }, each: function each() {
      var px = arguments;return function (s) {
        var rx = [],
            r = null;for (var i = 0; i < px.length; i++) {
          if (px[i] == null) {
            continue;
          }
          try {
            r = px[i].call(this, s);
          } catch (e) {
            throw new $P.Exception(s);
          }
          rx.push(r[0]);s = r[1];
        }
        return [rx, s];
      };
    }, all: function all() {
      var px = arguments,
          _ = _;return _.each(_.optional(px));
    }, sequence: function sequence(px, d, c) {
      d = d || _.rtoken(/^\s*/);c = c || null;if (px.length == 1) {
        return px[0];
      }
      return function (s) {
        var r = null,
            q = null;var rx = [];for (var i = 0; i < px.length; i++) {
          try {
            r = px[i].call(this, s);
          } catch (e) {
            break;
          }
          rx.push(r[0]);try {
            q = d.call(this, r[1]);
          } catch (ex) {
            q = null;break;
          }
          s = q[1];
        }
        if (!r) {
          throw new $P.Exception(s);
        }
        if (q) {
          throw new $P.Exception(q[1]);
        }
        if (c) {
          try {
            r = c.call(this, r[1]);
          } catch (ey) {
            throw new $P.Exception(r[1]);
          }
        }
        return [rx, r ? r[1] : s];
      };
    }, between: function between(d1, p, d2) {
      d2 = d2 || d1;var _fn = _.each(_.ignore(d1), p, _.ignore(d2));return function (s) {
        var rx = _fn.call(this, s);return [[rx[0][0], r[0][2]], rx[1]];
      };
    }, list: function list(p, d, c) {
      d = d || _.rtoken(/^\s*/);c = c || null;return p instanceof Array ? _.each(_.product(p.slice(0, -1), _.ignore(d)), p.slice(-1), _.ignore(c)) : _.each(_.many(_.each(p, _.ignore(d))), px, _.ignore(c));
    }, set: function set(px, d, c) {
      d = d || _.rtoken(/^\s*/);c = c || null;return function (s) {
        var r = null,
            p = null,
            q = null,
            rx = null,
            best = [[], s],
            last = false;for (var i = 0; i < px.length; i++) {
          q = null;p = null;r = null;last = px.length == 1;try {
            r = px[i].call(this, s);
          } catch (e) {
            continue;
          }
          rx = [[r[0]], r[1]];if (r[1].length > 0 && !last) {
            try {
              q = d.call(this, r[1]);
            } catch (ex) {
              last = true;
            }
          } else {
            last = true;
          }
          if (!last && q[1].length === 0) {
            last = true;
          }
          if (!last) {
            var qx = [];for (var j = 0; j < px.length; j++) {
              if (i != j) {
                qx.push(px[j]);
              }
            }
            p = _.set(qx, d).call(this, q[1]);if (p[0].length > 0) {
              rx[0] = rx[0].concat(p[0]);rx[1] = p[1];
            }
          }
          if (rx[1].length < best[1].length) {
            best = rx;
          }
          if (best[1].length === 0) {
            break;
          }
        }
        if (best[0].length === 0) {
          return best;
        }
        if (c) {
          try {
            q = c.call(this, best[1]);
          } catch (ey) {
            throw new $P.Exception(best[1]);
          }
          best[1] = q[1];
        }
        return best;
      };
    }, forward: function forward(gr, fname) {
      return function (s) {
        return gr[fname].call(this, s);
      };
    }, replace: function replace(rule, repl) {
      return function (s) {
        var r = rule.call(this, s);return [repl, r[1]];
      };
    }, process: function process(rule, fn) {
      return function (s) {
        var r = rule.call(this, s);return [fn.call(this, r[0]), r[1]];
      };
    }, min: function min(_min, rule) {
      return function (s) {
        var rx = rule.call(this, s);if (rx[0].length < _min) {
          throw new $P.Exception(s);
        }
        return rx;
      };
    } };var _generator = function _generator(op) {
    return function () {
      var args = null,
          rx = [];if (arguments.length > 1) {
        args = Array.prototype.slice.call(arguments);
      } else if (arguments[0] instanceof Array) {
        args = arguments[0];
      }
      if (args) {
        for (var i = 0, px = args.shift(); i < px.length; i++) {
          args.unshift(px[i]);rx.push(op.apply(null, args));args.shift();return rx;
        }
      } else {
        return op.apply(null, arguments);
      }
    };
  };var gx = "optional not ignore cache".split(/\s/);for (var i = 0; i < gx.length; i++) {
    _[gx[i]] = _generator(_[gx[i]]);
  }
  var _vector = function _vector(op) {
    return function () {
      if (arguments[0] instanceof Array) {
        return op.apply(null, arguments[0]);
      } else {
        return op.apply(null, arguments);
      }
    };
  };var vx = "each any all".split(/\s/);for (var j = 0; j < vx.length; j++) {
    _[vx[j]] = _vector(_[vx[j]]);
  }
})();(function () {
  var $D = Date,
      $P = $D.prototype,
      $C = $D.CultureInfo;var flattenAndCompact = function flattenAndCompact(ax) {
    var rx = [];for (var i = 0; i < ax.length; i++) {
      if (ax[i] instanceof Array) {
        rx = rx.concat(flattenAndCompact(ax[i]));
      } else {
        if (ax[i]) {
          rx.push(ax[i]);
        }
      }
    }
    return rx;
  };$D.Grammar = {};$D.Translator = { hour: function hour(s) {
      return function () {
        this.hour = Number(s);
      };
    }, minute: function minute(s) {
      return function () {
        this.minute = Number(s);
      };
    }, second: function second(s) {
      return function () {
        this.second = Number(s);
      };
    }, meridian: function meridian(s) {
      return function () {
        this.meridian = s.slice(0, 1).toLowerCase();
      };
    }, timezone: function timezone(s) {
      return function () {
        var n = s.replace(/[^\d\+\-]/g, "");if (n.length) {
          this.timezoneOffset = Number(n);
        } else {
          this.timezone = s.toLowerCase();
        }
      };
    }, day: function day(x) {
      var s = x[0];return function () {
        this.day = Number(s.match(/\d+/)[0]);
      };
    }, month: function month(s) {
      return function () {
        this.month = s.length == 3 ? "jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s) / 4 : Number(s) - 1;
      };
    }, year: function year(s) {
      return function () {
        var n = Number(s);this.year = s.length > 2 ? n : n + (n + 2000 < $C.twoDigitYearMax ? 2000 : 1900);
      };
    }, rday: function rday(s) {
      return function () {
        switch (s) {case "yesterday":
            this.days = -1;break;case "tomorrow":
            this.days = 1;break;case "today":
            this.days = 0;break;case "now":
            this.days = 0;this.now = true;break;}
      };
    }, finishExact: function finishExact(x) {
      x = x instanceof Array ? x : [x];for (var i = 0; i < x.length; i++) {
        if (x[i]) {
          x[i].call(this);
        }
      }
      var now = new Date();if ((this.hour || this.minute) && !this.month && !this.year && !this.day) {
        this.day = now.getDate();
      }
      if (!this.year) {
        this.year = now.getFullYear();
      }
      if (!this.month && this.month !== 0) {
        this.month = now.getMonth();
      }
      if (!this.day) {
        this.day = 1;
      }
      if (!this.hour) {
        this.hour = 0;
      }
      if (!this.minute) {
        this.minute = 0;
      }
      if (!this.second) {
        this.second = 0;
      }
      if (this.meridian && this.hour) {
        if (this.meridian == "p" && this.hour < 12) {
          this.hour = this.hour + 12;
        } else if (this.meridian == "a" && this.hour == 12) {
          this.hour = 0;
        }
      }
      if (this.day > $D.getDaysInMonth(this.year, this.month)) {
        throw new RangeError(this.day + " is not a valid value for days.");
      }
      var r = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second);if (this.timezone) {
        r.set({ timezone: this.timezone });
      } else if (this.timezoneOffset) {
        r.set({ timezoneOffset: this.timezoneOffset });
      }
      return r;
    }, finish: function finish(x) {
      x = x instanceof Array ? flattenAndCompact(x) : [x];if (x.length === 0) {
        return null;
      }
      for (var i = 0; i < x.length; i++) {
        if (typeof x[i] == "function") {
          x[i].call(this);
        }
      }
      var today = $D.today();if (this.now && !this.unit && !this.operator) {
        return new Date();
      } else if (this.now) {
        today = new Date();
      }
      var expression = !!(this.days && this.days !== null || this.orient || this.operator);var gap, mod, orient;orient = this.orient == "past" || this.operator == "subtract" ? -1 : 1;if (!this.now && "hour minute second".indexOf(this.unit) != -1) {
        today.setTimeToNow();
      }
      if (this.month || this.month === 0) {
        if ("year day hour minute second".indexOf(this.unit) != -1) {
          this.value = this.month + 1;this.month = null;expression = true;
        }
      }
      if (!expression && this.weekday && !this.day && !this.days) {
        var temp = Date[this.weekday]();this.day = temp.getDate();if (!this.month) {
          this.month = temp.getMonth();
        }
        this.year = temp.getFullYear();
      }
      if (expression && this.weekday && this.unit != "month") {
        this.unit = "day";gap = $D.getDayNumberFromName(this.weekday) - today.getDay();mod = 7;this.days = gap ? (gap + orient * mod) % mod : orient * mod;
      }
      if (this.month && this.unit == "day" && this.operator) {
        this.value = this.month + 1;this.month = null;
      }
      if (this.value != null && this.month != null && this.year != null) {
        this.day = this.value * 1;
      }
      if (this.month && !this.day && this.value) {
        today.set({ day: this.value * 1 });if (!expression) {
          this.day = this.value * 1;
        }
      }
      if (!this.month && this.value && this.unit == "month" && !this.now) {
        this.month = this.value;expression = true;
      }
      if (expression && (this.month || this.month === 0) && this.unit != "year") {
        this.unit = "month";gap = this.month - today.getMonth();mod = 12;this.months = gap ? (gap + orient * mod) % mod : orient * mod;this.month = null;
      }
      if (!this.unit) {
        this.unit = "day";
      }
      if (!this.value && this.operator && this.operator !== null && this[this.unit + "s"] && this[this.unit + "s"] !== null) {
        this[this.unit + "s"] = this[this.unit + "s"] + (this.operator == "add" ? 1 : -1) + (this.value || 0) * orient;
      } else if (this[this.unit + "s"] == null || this.operator != null) {
        if (!this.value) {
          this.value = 1;
        }
        this[this.unit + "s"] = this.value * orient;
      }
      if (this.meridian && this.hour) {
        if (this.meridian == "p" && this.hour < 12) {
          this.hour = this.hour + 12;
        } else if (this.meridian == "a" && this.hour == 12) {
          this.hour = 0;
        }
      }
      if (this.weekday && !this.day && !this.days) {
        var temp = Date[this.weekday]();this.day = temp.getDate();if (temp.getMonth() !== today.getMonth()) {
          this.month = temp.getMonth();
        }
      }
      if ((this.month || this.month === 0) && !this.day) {
        this.day = 1;
      }
      if (!this.orient && !this.operator && this.unit == "week" && this.value && !this.day && !this.month) {
        return Date.today().setWeek(this.value);
      }
      if (expression && this.timezone && this.day && this.days) {
        this.day = this.days;
      }
      return expression ? today.add(this) : today.set(this);
    } };var _ = $D.Parsing.Operators,
      g = $D.Grammar,
      t = $D.Translator,
      _fn;g.datePartDelimiter = _.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter = _.stoken(":");g.whiteSpace = _.rtoken(/^\s*/);g.generalDelimiter = _.rtoken(/^(([\s\,]|at|@|on)+)/);var _C = {};g.ctoken = function (keys) {
    var fn = _C[keys];if (!fn) {
      var c = $C.regexPatterns;var kx = keys.split(/\s+/),
          px = [];for (var i = 0; i < kx.length; i++) {
        px.push(_.replace(_.rtoken(c[kx[i]]), kx[i]));
      }
      fn = _C[keys] = _.any.apply(null, px);
    }
    return fn;
  };g.ctoken2 = function (key) {
    return _.rtoken($C.regexPatterns[key]);
  };g.h = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/), t.hour));g.hh = _.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/), t.hour));g.H = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/), t.hour));g.HH = _.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/), t.hour));g.m = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.minute));g.mm = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.minute));g.s = _.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/), t.second));g.ss = _.cache(_.process(_.rtoken(/^[0-5][0-9]/), t.second));g.hms = _.cache(_.sequence([g.H, g.m, g.s], g.timePartDelimiter));g.t = _.cache(_.process(g.ctoken2("shortMeridian"), t.meridian));g.tt = _.cache(_.process(g.ctoken2("longMeridian"), t.meridian));g.z = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));g.zz = _.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/), t.timezone));g.zzz = _.cache(_.process(g.ctoken2("timezone"), t.timezone));g.timeSuffix = _.each(_.ignore(g.whiteSpace), _.set([g.tt, g.zzz]));g.time = _.each(_.optional(_.ignore(_.stoken("T"))), g.hms, g.timeSuffix);g.d = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));g.dd = _.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/), _.optional(g.ctoken2("ordinalSuffix"))), t.day));g.ddd = g.dddd = _.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"), function (s) {
    return function () {
      this.weekday = s;
    };
  }));g.M = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/), t.month));g.MM = _.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/), t.month));g.MMM = g.MMMM = _.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"), t.month));g.y = _.cache(_.process(_.rtoken(/^(\d\d?)/), t.year));g.yy = _.cache(_.process(_.rtoken(/^(\d\d)/), t.year));g.yyy = _.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/), t.year));g.yyyy = _.cache(_.process(_.rtoken(/^(\d\d\d\d)/), t.year));_fn = function _fn() {
    return _.each(_.any.apply(null, arguments), _.not(g.ctoken2("timeContext")));
  };g.day = _fn(g.d, g.dd);g.month = _fn(g.M, g.MMM);g.year = _fn(g.yyyy, g.yy);g.orientation = _.process(g.ctoken("past future"), function (s) {
    return function () {
      this.orient = s;
    };
  });g.operator = _.process(g.ctoken("add subtract"), function (s) {
    return function () {
      this.operator = s;
    };
  });g.rday = _.process(g.ctoken("yesterday tomorrow today now"), t.rday);g.unit = _.process(g.ctoken("second minute hour day week month year"), function (s) {
    return function () {
      this.unit = s;
    };
  });g.value = _.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/), function (s) {
    return function () {
      this.value = s.replace(/\D/g, "");
    };
  });g.expression = _.set([g.rday, g.operator, g.value, g.unit, g.orientation, g.ddd, g.MMM]);_fn = function _fn() {
    return _.set(arguments, g.datePartDelimiter);
  };g.mdy = _fn(g.ddd, g.month, g.day, g.year);g.ymd = _fn(g.ddd, g.year, g.month, g.day);g.dmy = _fn(g.ddd, g.day, g.month, g.year);g.date = function (s) {
    return (g[$C.dateElementOrder] || g.mdy).call(this, s);
  };g.format = _.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/), function (fmt) {
    if (g[fmt]) {
      return g[fmt];
    } else {
      throw $D.Parsing.Exception(fmt);
    }
  }), _.process(_.rtoken(/^[^dMyhHmstz]+/), function (s) {
    return _.ignore(_.stoken(s));
  }))), function (rules) {
    return _.process(_.each.apply(null, rules), t.finishExact);
  });var _F = {};var _get = function _get(f) {
    return _F[f] = _F[f] || g.format(f)[0];
  };g.formats = function (fx) {
    if (fx instanceof Array) {
      var rx = [];for (var i = 0; i < fx.length; i++) {
        rx.push(_get(fx[i]));
      }
      return _.any.apply(null, rx);
    } else {
      return _get(fx);
    }
  };g._formats = g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"", "yyyy-MM-ddTHH:mm:ssZ", "yyyy-MM-ddTHH:mm:ssz", "yyyy-MM-ddTHH:mm:ss", "yyyy-MM-ddTHH:mmZ", "yyyy-MM-ddTHH:mmz", "yyyy-MM-ddTHH:mm", "ddd, MMM dd, yyyy H:mm:ss tt", "ddd MMM d yyyy HH:mm:ss zzz", "MMddyyyy", "ddMMyyyy", "Mddyyyy", "ddMyyyy", "Mdyyyy", "dMyyyy", "yyyy", "Mdyy", "dMyy", "d"]);g._start = _.process(_.set([g.date, g.time, g.expression], g.generalDelimiter, g.whiteSpace), t.finish);g.start = function (s) {
    try {
      var r = g._formats.call({}, s);if (r[1].length === 0) {
        return r;
      }
    } catch (e) {}
    return g._start.call({}, s);
  };$D._parse = $D.parse;$D.parse = function (s) {
    var r = null;if (!s) {
      return null;
    }
    if (s instanceof Date) {
      return s;
    }
    try {
      r = $D.Grammar.start.call({}, s.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1"));
    } catch (e) {
      return null;
    }
    return r[1].length === 0 ? r[0] : null;
  };$D.getParseFunction = function (fx) {
    var fn = $D.Grammar.formats(fx);return function (s) {
      var r = null;try {
        r = fn.call({}, s);
      } catch (e) {
        return null;
      }
      return r[1].length === 0 ? r[0] : null;
    };
  };$D.parseExact = function (s, fx) {
    return $D.getParseFunction(fx)(s);
  };
})();

/***/ }),

/***/ "./common/static/js/vendor/jquery.form.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
 * jQuery Form Plugin
 * version: 3.18 (28-SEP-2012)
 * @requires jQuery v1.5 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses:
 *    http://malsup.github.com/mit-license.txt
 *    http://malsup.github.com/gpl-license-v2.txt
 */
/*global ActiveXObject alert */
;(function ($) {
    "use strict";

    /*
        Usage Note:
        -----------
        Do not use both ajaxSubmit and ajaxForm on the same form.  These
        functions are mutually exclusive.  Use ajaxSubmit if you want
        to bind your own submit handler to the form.  For example,
    
        $(document).ready(function() {
            $('#myForm').on('submit', function(e) {
                e.preventDefault(); // <-- important
                $(this).ajaxSubmit({
                    target: '#output'
                });
            });
        });
    
        Use ajaxForm when you want the plugin to manage all the event binding
        for you.  For example,
    
        $(document).ready(function() {
            $('#myForm').ajaxForm({
                target: '#output'
            });
        });
        
        You can also use ajaxForm with delegation (requires jQuery v1.7+), so the
        form does not have to exist when you invoke ajaxForm:
    
        $('#myForm').ajaxForm({
            delegation: true,
            target: '#output'
        });
        
        When using ajaxForm, the ajaxSubmit function will be invoked for you
        at the appropriate time.
    */

    /**
     * Feature detection
     */

    var feature = {};
    feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
    feature.formdata = window.FormData !== undefined;

    /**
     * ajaxSubmit() provides a mechanism for immediately submitting
     * an HTML form using AJAX.
     */
    $.fn.ajaxSubmit = function (options) {
        /*jshint scripturl:true */

        // fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
        if (!this.length) {
            log('ajaxSubmit: skipping submit process - no element selected');
            return this;
        }

        var method,
            action,
            url,
            $form = this;

        if (typeof options == 'function') {
            options = { success: options };
        }

        method = this.attr('method');
        action = this.attr('action');
        url = typeof action === 'string' ? $.trim(action) : '';
        url = url || window.location.href || '';
        if (url) {
            // clean url (don't include hash vaue)
            url = (url.match(/^([^#]+)/) || [])[1];
        }

        options = $.extend(true, {
            url: url,
            success: $.ajaxSettings.success,
            type: method || 'GET',
            iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
        }, options);

        // hook for manipulating the form data before it is extracted;
        // convenient for use with rich editors like tinyMCE or FCKEditor
        var veto = {};
        this.trigger('form-pre-serialize', [this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
            return this;
        }

        // provide opportunity to alter form data before it is serialized
        if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSerialize callback');
            return this;
        }

        var traditional = options.traditional;
        if (traditional === undefined) {
            traditional = $.ajaxSettings.traditional;
        }

        var elements = [];
        var qx,
            a = this.formToArray(options.semantic, elements);
        if (options.data) {
            options.extraData = options.data;
            qx = $.param(options.data, traditional);
        }

        // give pre-submit callback an opportunity to abort the submit
        if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
            log('ajaxSubmit: submit aborted via beforeSubmit callback');
            return this;
        }

        // fire vetoable 'validate' event
        this.trigger('form-submit-validate', [a, this, options, veto]);
        if (veto.veto) {
            log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
            return this;
        }

        var q = $.param(a, traditional);
        if (qx) {
            q = q ? q + '&' + qx : qx;
        }
        if (options.type.toUpperCase() == 'GET') {
            options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
            options.data = null; // data is null for 'get'
        } else {
            options.data = q; // data is the query string for 'post'
        }

        var callbacks = [];
        if (options.resetForm) {
            callbacks.push(function () {
                $form.resetForm();
            });
        }
        if (options.clearForm) {
            callbacks.push(function () {
                $form.clearForm(options.includeHidden);
            });
        }

        // perform a load on the target only if dataType is not provided
        if (!options.dataType && options.target) {
            var oldSuccess = options.success || function () {};
            callbacks.push(function (data) {
                var fn = options.replaceTarget ? 'replaceWith' : 'html';
                $(options.target)[fn](data).each(oldSuccess, arguments);
            });
        } else if (options.success) {
            callbacks.push(options.success);
        }

        options.success = function (data, status, xhr) {
            // jQuery 1.4+ passes xhr as 3rd arg
            var context = options.context || this; // jQuery 1.4+ supports scope context 
            for (var i = 0, max = callbacks.length; i < max; i++) {
                callbacks[i].apply(context, [data, status, xhr || $form, $form]);
            }
        };

        // are there files to upload?
        var fileInputs = $('input:file:enabled[value]', this); // [value] (issue #113)
        var hasFileInputs = fileInputs.length > 0;
        var mp = 'multipart/form-data';
        var multipart = $form.attr('enctype') == mp || $form.attr('encoding') == mp;

        var fileAPI = feature.fileapi && feature.formdata;
        log("fileAPI :" + fileAPI);
        var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;

        var jqxhr;

        // options.iframe allows user to force iframe mode
        // 06-NOV-09: now defaulting to iframe mode if file input is detected
        if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
            // hack to fix Safari hang (thanks to Tim Molendijk for this)
            // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
            if (options.closeKeepAlive) {
                $.get(options.closeKeepAlive, function () {
                    jqxhr = fileUploadIframe(a);
                });
            } else {
                jqxhr = fileUploadIframe(a);
            }
        } else if ((hasFileInputs || multipart) && fileAPI) {
            jqxhr = fileUploadXhr(a);
        } else {
            jqxhr = $.ajax(options);
        }

        $form.removeData('jqxhr').data('jqxhr', jqxhr);

        // clear element array
        for (var k = 0; k < elements.length; k++) {
            elements[k] = null;
        } // fire 'notify' event
        this.trigger('form-submit-notify', [this, options]);
        return this;

        // utility fn for deep serialization
        function deepSerialize(extraData) {
            var serialized = $.param(extraData).split('&');
            var len = serialized.length;
            var result = {};
            var i, part;
            for (i = 0; i < len; i++) {
                part = serialized[i].split('=');
                result[decodeURIComponent(part[0])] = decodeURIComponent(part[1]);
            }
            return result;
        }

        // XMLHttpRequest Level 2 file uploads (big hat tip to francois2metz)
        function fileUploadXhr(a) {
            var formdata = new FormData();

            for (var i = 0; i < a.length; i++) {
                formdata.append(a[i].name, a[i].value);
            }

            if (options.extraData) {
                var serializedData = deepSerialize(options.extraData);
                for (var p in serializedData) {
                    if (serializedData.hasOwnProperty(p)) formdata.append(p, serializedData[p]);
                }
            }

            options.data = null;

            var s = $.extend(true, {}, $.ajaxSettings, options, {
                contentType: false,
                processData: false,
                cache: false,
                type: method || 'POST'
            });

            if (options.uploadProgress) {
                // workaround because jqXHR does not expose upload property
                s.xhr = function () {
                    var xhr = jQuery.ajaxSettings.xhr();
                    if (xhr.upload) {
                        xhr.upload.onprogress = function (event) {
                            var percent = 0;
                            var position = event.loaded || event.position; /*event.position is deprecated*/
                            var total = event.total;
                            if (event.lengthComputable) {
                                percent = Math.ceil(position / total * 100);
                            }
                            options.uploadProgress(event, position, total, percent);
                        };
                    }
                    return xhr;
                };
            }

            s.data = null;
            var beforeSend = s.beforeSend;
            s.beforeSend = function (xhr, o) {
                o.data = formdata;
                if (beforeSend) beforeSend.call(this, xhr, o);
            };
            return $.ajax(s);
        }

        // private function for handling file uploads (hat tip to YAHOO!)
        function fileUploadIframe(a) {
            var form = $form[0],
                el,
                i,
                s,
                g,
                id,
                $io,
                io,
                xhr,
                sub,
                n,
                timedOut,
                timeoutHandle;
            var useProp = !!$.fn.prop;
            var deferred = $.Deferred();

            if ($(':input[name=submit],:input[id=submit]', form).length) {
                // if there is an input with a name or id of 'submit' then we won't be
                // able to invoke the submit fn on the form (at least not x-browser)
                alert('Error: Form elements must not have name or id of "submit".');
                deferred.reject();
                return deferred;
            }

            if (a) {
                // ensure that every serialized input is still enabled
                for (i = 0; i < elements.length; i++) {
                    el = $(elements[i]);
                    if (useProp) el.prop('disabled', false);else el.removeAttr('disabled');
                }
            }

            s = $.extend(true, {}, $.ajaxSettings, options);
            s.context = s.context || s;
            id = 'jqFormIO' + new Date().getTime();
            if (s.iframeTarget) {
                $io = $(s.iframeTarget);
                n = $io.attr('name');
                if (!n) $io.attr('name', id);else id = n;
            } else {
                $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
                $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
            }
            io = $io[0];

            xhr = { // mock object
                aborted: 0,
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: 'n/a',
                getAllResponseHeaders: function getAllResponseHeaders() {},
                getResponseHeader: function getResponseHeader() {},
                setRequestHeader: function setRequestHeader() {},
                abort: function abort(status) {
                    var e = status === 'timeout' ? 'timeout' : 'aborted';
                    log('aborting upload... ' + e);
                    this.aborted = 1;
                    // #214
                    if (io.contentWindow.document.execCommand) {
                        try {
                            // #214
                            io.contentWindow.document.execCommand('Stop');
                        } catch (ignore) {}
                    }
                    $io.attr('src', s.iframeSrc); // abort op in progress
                    xhr.error = e;
                    if (s.error) s.error.call(s.context, xhr, e, status);
                    if (g) $.event.trigger("ajaxError", [xhr, s, e]);
                    if (s.complete) s.complete.call(s.context, xhr, e);
                }
            };

            g = s.global;
            // trigger ajax global events so that activity/block indicators work like normal
            if (g && 0 === $.active++) {
                $.event.trigger("ajaxStart");
            }
            if (g) {
                $.event.trigger("ajaxSend", [xhr, s]);
            }

            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                if (s.global) {
                    $.active--;
                }
                deferred.reject();
                return deferred;
            }
            if (xhr.aborted) {
                deferred.reject();
                return deferred;
            }

            // add submitting element to data if we know it
            sub = form.clk;
            if (sub) {
                n = sub.name;
                if (n && !sub.disabled) {
                    s.extraData = s.extraData || {};
                    s.extraData[n] = sub.value;
                    if (sub.type == "image") {
                        s.extraData[n + '.x'] = form.clk_x;
                        s.extraData[n + '.y'] = form.clk_y;
                    }
                }
            }

            var CLIENT_TIMEOUT_ABORT = 1;
            var SERVER_ABORT = 2;

            function getDoc(frame) {
                var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame.contentDocument : frame.document;
                return doc;
            }

            // Rails CSRF hack (thanks to Yvan Barthelemy)
            var csrf_token = $('meta[name=csrf-token]').attr('content');
            var csrf_param = $('meta[name=csrf-param]').attr('content');
            if (csrf_param && csrf_token) {
                s.extraData = s.extraData || {};
                s.extraData[csrf_param] = csrf_token;
            }

            // take a breath so that pending repaints get some cpu time before the upload starts
            function doSubmit() {
                // make sure form attrs are set
                var t = $form.attr('target'),
                    a = $form.attr('action');

                // update form attrs in IE friendly way
                form.setAttribute('target', id);
                if (!method) {
                    form.setAttribute('method', 'POST');
                }
                if (a != s.url) {
                    form.setAttribute('action', s.url);
                }

                // ie borks in some cases when setting encoding
                if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
                    $form.attr({
                        encoding: 'multipart/form-data',
                        enctype: 'multipart/form-data'
                    });
                }

                // support timout
                if (s.timeout) {
                    timeoutHandle = setTimeout(function () {
                        timedOut = true;cb(CLIENT_TIMEOUT_ABORT);
                    }, s.timeout);
                }

                // look for server aborts
                function checkState() {
                    try {
                        var state = getDoc(io).readyState;
                        log('state = ' + state);
                        if (state && state.toLowerCase() == 'uninitialized') setTimeout(checkState, 50);
                    } catch (e) {
                        log('Server abort: ', e, ' (', e.name, ')');
                        cb(SERVER_ABORT);
                        if (timeoutHandle) clearTimeout(timeoutHandle);
                        timeoutHandle = undefined;
                    }
                }

                // add "extra" data to form if provided in options
                var extraInputs = [];
                try {
                    if (s.extraData) {
                        for (var n in s.extraData) {
                            if (s.extraData.hasOwnProperty(n)) {
                                // if using the $.param format that allows for multiple values with the same name
                                if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                                    extraInputs.push($('<input type="hidden" name="' + s.extraData[n].name + '">').attr('value', s.extraData[n].value).appendTo(form)[0]);
                                } else {
                                    extraInputs.push($('<input type="hidden" name="' + n + '">').attr('value', s.extraData[n]).appendTo(form)[0]);
                                }
                            }
                        }
                    }

                    if (!s.iframeTarget) {
                        // add iframe to doc and submit the form
                        $io.appendTo('body');
                        if (io.attachEvent) io.attachEvent('onload', cb);else io.addEventListener('load', cb, false);
                    }
                    setTimeout(checkState, 15);
                    form.submit();
                } finally {
                    // reset attrs and remove "extra" input elements
                    form.setAttribute('action', a);
                    if (t) {
                        form.setAttribute('target', t);
                    } else {
                        $form.removeAttr('target');
                    }
                    $(extraInputs).remove();
                }
            }

            if (s.forceSync) {
                doSubmit();
            } else {
                setTimeout(doSubmit, 10); // this lets dom updates render
            }

            var data,
                doc,
                domCheckCount = 50,
                callbackProcessed;

            function cb(e) {
                if (xhr.aborted || callbackProcessed) {
                    return;
                }
                try {
                    doc = getDoc(io);
                } catch (ex) {
                    log('cannot access response document: ', ex);
                    e = SERVER_ABORT;
                }
                if (e === CLIENT_TIMEOUT_ABORT && xhr) {
                    xhr.abort('timeout');
                    deferred.reject(xhr, 'timeout');
                    return;
                } else if (e == SERVER_ABORT && xhr) {
                    xhr.abort('server abort');
                    deferred.reject(xhr, 'error', 'server abort');
                    return;
                }

                if (!doc || doc.location.href == s.iframeSrc) {
                    // response not received yet
                    if (!timedOut) return;
                }
                if (io.detachEvent) io.detachEvent('onload', cb);else io.removeEventListener('load', cb, false);

                var status = 'success',
                    errMsg;
                try {
                    if (timedOut) {
                        throw 'timeout';
                    }

                    var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
                    log('isXml=' + isXml);
                    if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
                        if (--domCheckCount) {
                            // in some browsers (Opera) the iframe DOM is not always traversable when
                            // the onload callback fires, so we loop a bit to accommodate
                            log('requeing onLoad callback, DOM not available');
                            setTimeout(cb, 250);
                            return;
                        }
                        // let this fall through because server response could be an empty document
                        //log('Could not access iframe DOM after mutiple tries.');
                        //throw 'DOMException: not available';
                    }

                    //log('response detected');
                    var docRoot = doc.body ? doc.body : doc.documentElement;
                    xhr.responseText = docRoot ? docRoot.innerHTML : null;
                    xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
                    if (isXml) s.dataType = 'xml';
                    xhr.getResponseHeader = function (header) {
                        var headers = { 'content-type': s.dataType };
                        return headers[header];
                    };
                    // support for XHR 'status' & 'statusText' emulation :
                    if (docRoot) {
                        xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
                        xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
                    }

                    var dt = (s.dataType || '').toLowerCase();
                    var scr = /(json|script|text)/.test(dt);
                    if (scr || s.textarea) {
                        // see if user embedded response in textarea
                        var ta = doc.getElementsByTagName('textarea')[0];
                        if (ta) {
                            xhr.responseText = ta.value;
                            // support for XHR 'status' & 'statusText' emulation :
                            xhr.status = Number(ta.getAttribute('status')) || xhr.status;
                            xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
                        } else if (scr) {
                            // account for browsers injecting pre around json response
                            var pre = doc.getElementsByTagName('pre')[0];
                            var b = doc.getElementsByTagName('body')[0];
                            if (pre) {
                                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                            } else if (b) {
                                xhr.responseText = b.textContent ? b.textContent : b.innerText;
                            }
                        }
                    } else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
                        xhr.responseXML = toXml(xhr.responseText);
                    }

                    try {
                        data = httpData(xhr, dt, s);
                    } catch (e) {
                        status = 'parsererror';
                        xhr.error = errMsg = e || status;
                    }
                } catch (e) {
                    log('error caught: ', e);
                    status = 'error';
                    xhr.error = errMsg = e || status;
                }

                if (xhr.aborted) {
                    log('upload aborted');
                    status = null;
                }

                if (xhr.status) {
                    // we've set xhr.status
                    status = xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ? 'success' : 'error';
                }

                // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
                if (status === 'success') {
                    if (s.success) s.success.call(s.context, data, 'success', xhr);
                    deferred.resolve(xhr.responseText, 'success', xhr);
                    if (g) $.event.trigger("ajaxSuccess", [xhr, s]);
                } else if (status) {
                    if (errMsg === undefined) errMsg = xhr.statusText;
                    if (s.error) s.error.call(s.context, xhr, status, errMsg);
                    deferred.reject(xhr, 'error', errMsg);
                    if (g) $.event.trigger("ajaxError", [xhr, s, errMsg]);
                }

                if (g) $.event.trigger("ajaxComplete", [xhr, s]);

                if (g && ! --$.active) {
                    $.event.trigger("ajaxStop");
                }

                if (s.complete) s.complete.call(s.context, xhr, status);

                callbackProcessed = true;
                if (s.timeout) clearTimeout(timeoutHandle);

                // clean up
                setTimeout(function () {
                    if (!s.iframeTarget) $io.remove();
                    xhr.responseXML = null;
                }, 100);
            }

            var toXml = $.parseXML || function (s, doc) {
                // use parseXML if available (jQuery 1.5+)
                if (window.ActiveXObject) {
                    doc = new ActiveXObject('Microsoft.XMLDOM');
                    doc.async = 'false';
                    doc.loadXML(s);
                } else {
                    doc = new DOMParser().parseFromString(s, 'text/xml');
                }
                return doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror' ? doc : null;
            };
            var parseJSON = $.parseJSON || function (s) {
                /*jslint evil:true */
                return window['eval']('(' + s + ')');
            };

            var httpData = function httpData(xhr, type, s) {
                // mostly lifted from jq1.4.4

                var ct = xhr.getResponseHeader('content-type') || '',
                    xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
                    data = xml ? xhr.responseXML : xhr.responseText;

                if (xml && data.documentElement.nodeName === 'parsererror') {
                    if ($.error) $.error('parsererror');
                }
                if (s && s.dataFilter) {
                    data = s.dataFilter(data, type);
                }
                if (typeof data === 'string') {
                    if (type === 'json' || !type && ct.indexOf('json') >= 0) {
                        data = parseJSON(data);
                    } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                        $.globalEval(data);
                    }
                }
                return data;
            };

            return deferred;
        }
    };

    /**
     * ajaxForm() provides a mechanism for fully automating form submission.
     *
     * The advantages of using this method instead of ajaxSubmit() are:
     *
     * 1: This method will include coordinates for <input type="image" /> elements (if the element
     *    is used to submit the form).
     * 2. This method will include the submit element's name/value data (for the element that was
     *    used to submit the form).
     * 3. This method binds the submit() method to the form for you.
     *
     * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
     * passes the options argument along after properly binding events for submit elements and
     * the form itself.
     */
    $.fn.ajaxForm = function (options) {
        options = options || {};
        options.delegation = options.delegation && $.isFunction($.fn.on);

        // in jQuery 1.3+ we can fix mistakes with the ready state
        if (!options.delegation && this.length === 0) {
            var o = { s: this.selector, c: this.context };
            if (!$.isReady && o.s) {
                log('DOM not ready, queuing ajaxForm');
                $(function () {
                    $(o.s, o.c).ajaxForm(options);
                });
                return this;
            }
            // is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
            log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
            return this;
        }

        if (options.delegation) {
            $(document).off('submit.form-plugin', this.selector, doAjaxSubmit).off('click.form-plugin', this.selector, captureSubmittingElement).on('submit.form-plugin', this.selector, options, doAjaxSubmit).on('click.form-plugin', this.selector, options, captureSubmittingElement);
            return this;
        }

        return this.ajaxFormUnbind().bind('submit.form-plugin', options, doAjaxSubmit).bind('click.form-plugin', options, captureSubmittingElement);
    };

    // private event handlers    
    function doAjaxSubmit(e) {
        /*jshint validthis:true */
        var options = e.data;
        if (!e.isDefaultPrevented()) {
            // if event has been canceled, don't proceed
            e.preventDefault();
            $(this).ajaxSubmit(options);
        }
    }

    function captureSubmittingElement(e) {
        /*jshint validthis:true */
        var target = e.target;
        var $el = $(target);
        if (!$el.is(":submit,input:image")) {
            // is this a child element of the submit el?  (ex: a span within a button)
            var t = $el.closest(':submit');
            if (t.length === 0) {
                return;
            }
            target = t[0];
        }
        var form = this;
        form.clk = target;
        if (target.type == 'image') {
            if (e.offsetX !== undefined) {
                form.clk_x = e.offsetX;
                form.clk_y = e.offsetY;
            } else if (typeof $.fn.offset == 'function') {
                var offset = $el.offset();
                form.clk_x = e.pageX - offset.left;
                form.clk_y = e.pageY - offset.top;
            } else {
                form.clk_x = e.pageX - target.offsetLeft;
                form.clk_y = e.pageY - target.offsetTop;
            }
        }
        // clear form vars
        setTimeout(function () {
            form.clk = form.clk_x = form.clk_y = null;
        }, 100);
    }

    // ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
    $.fn.ajaxFormUnbind = function () {
        return this.unbind('submit.form-plugin click.form-plugin');
    };

    /**
     * formToArray() gathers form element data into an array of objects that can
     * be passed to any of the following ajax functions: $.get, $.post, or load.
     * Each object in the array has both a 'name' and 'value' property.  An example of
     * an array for a simple login form might be:
     *
     * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
     *
     * It is this array that is passed to pre-submit callback functions provided to the
     * ajaxSubmit() and ajaxForm() methods.
     */
    $.fn.formToArray = function (semantic, elements) {
        var a = [];
        if (this.length === 0) {
            return a;
        }

        var form = this[0];
        var els = semantic ? form.getElementsByTagName('*') : form.elements;
        if (!els) {
            return a;
        }

        var i, j, n, v, el, max, jmax;
        for (i = 0, max = els.length; i < max; i++) {
            el = els[i];
            n = el.name;
            if (!n) {
                continue;
            }

            if (semantic && form.clk && el.type == "image") {
                // handle image inputs on the fly when semantic == true
                if (!el.disabled && form.clk == el) {
                    a.push({ name: n, value: $(el).val(), type: el.type });
                    a.push({ name: n + '.x', value: form.clk_x }, { name: n + '.y', value: form.clk_y });
                }
                continue;
            }

            v = $.fieldValue(el, true);
            if (v && v.constructor == Array) {
                if (elements) elements.push(el);
                for (j = 0, jmax = v.length; j < jmax; j++) {
                    a.push({ name: n, value: v[j] });
                }
            } else if (feature.fileapi && el.type == 'file' && !el.disabled) {
                if (elements) elements.push(el);
                var files = el.files;
                if (files.length) {
                    for (j = 0; j < files.length; j++) {
                        a.push({ name: n, value: files[j], type: el.type });
                    }
                } else {
                    // #180
                    a.push({ name: n, value: '', type: el.type });
                }
            } else if (v !== null && typeof v != 'undefined') {
                if (elements) elements.push(el);
                a.push({ name: n, value: v, type: el.type, required: el.required });
            }
        }

        if (!semantic && form.clk) {
            // input type=='image' are not found in elements array! handle it here
            var $input = $(form.clk),
                input = $input[0];
            n = input.name;
            if (n && !input.disabled && input.type == 'image') {
                a.push({ name: n, value: $input.val() });
                a.push({ name: n + '.x', value: form.clk_x }, { name: n + '.y', value: form.clk_y });
            }
        }
        return a;
    };

    /**
     * Serializes form data into a 'submittable' string. This method will return a string
     * in the format: name1=value1&amp;name2=value2
     */
    $.fn.formSerialize = function (semantic) {
        //hand off to jQuery.param for proper encoding
        return $.param(this.formToArray(semantic));
    };

    /**
     * Serializes all field elements in the jQuery object into a query string.
     * This method will return a string in the format: name1=value1&amp;name2=value2
     */
    $.fn.fieldSerialize = function (successful) {
        var a = [];
        this.each(function () {
            var n = this.name;
            if (!n) {
                return;
            }
            var v = $.fieldValue(this, successful);
            if (v && v.constructor == Array) {
                for (var i = 0, max = v.length; i < max; i++) {
                    a.push({ name: n, value: v[i] });
                }
            } else if (v !== null && typeof v != 'undefined') {
                a.push({ name: this.name, value: v });
            }
        });
        //hand off to jQuery.param for proper encoding
        return $.param(a);
    };

    /**
     * Returns the value(s) of the element in the matched set.  For example, consider the following form:
     *
     *  <form><fieldset>
     *      <input name="A" type="text" />
     *      <input name="A" type="text" />
     *      <input name="B" type="checkbox" value="B1" />
     *      <input name="B" type="checkbox" value="B2"/>
     *      <input name="C" type="radio" value="C1" />
     *      <input name="C" type="radio" value="C2" />
     *  </fieldset></form>
     *
     *  var v = $(':text').fieldValue();
     *  // if no values are entered into the text inputs
     *  v == ['','']
     *  // if values entered into the text inputs are 'foo' and 'bar'
     *  v == ['foo','bar']
     *
     *  var v = $(':checkbox').fieldValue();
     *  // if neither checkbox is checked
     *  v === undefined
     *  // if both checkboxes are checked
     *  v == ['B1', 'B2']
     *
     *  var v = $(':radio').fieldValue();
     *  // if neither radio is checked
     *  v === undefined
     *  // if first radio is checked
     *  v == ['C1']
     *
     * The successful argument controls whether or not the field element must be 'successful'
     * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
     * The default value of the successful argument is true.  If this value is false the value(s)
     * for each element is returned.
     *
     * Note: This method *always* returns an array.  If no valid value can be determined the
     *    array will be empty, otherwise it will contain one or more values.
     */
    $.fn.fieldValue = function (successful) {
        for (var val = [], i = 0, max = this.length; i < max; i++) {
            var el = this[i];
            var v = $.fieldValue(el, successful);
            if (v === null || typeof v == 'undefined' || v.constructor == Array && !v.length) {
                continue;
            }
            if (v.constructor == Array) $.merge(val, v);else val.push(v);
        }
        return val;
    };

    /**
     * Returns the value of the field element.
     */
    $.fieldValue = function (el, successful) {
        var n = el.name,
            t = el.type,
            tag = el.tagName.toLowerCase();
        if (successful === undefined) {
            successful = true;
        }

        if (successful && (!n || el.disabled || t == 'reset' || t == 'button' || (t == 'checkbox' || t == 'radio') && !el.checked || (t == 'submit' || t == 'image') && el.form && el.form.clk != el || tag == 'select' && el.selectedIndex == -1)) {
            return null;
        }

        if (tag == 'select') {
            var index = el.selectedIndex;
            if (index < 0) {
                return null;
            }
            var a = [],
                ops = el.options;
            var one = t == 'select-one';
            var max = one ? index + 1 : ops.length;
            for (var i = one ? index : 0; i < max; i++) {
                var op = ops[i];
                if (op.selected) {
                    var v = op.value;
                    if (!v) {
                        // extra pain for IE...
                        v = op.attributes && op.attributes['value'] && !op.attributes['value'].specified ? op.text : op.value;
                    }
                    if (one) {
                        return v;
                    }
                    a.push(v);
                }
            }
            return a;
        }
        return $(el).val();
    };

    /**
     * Clears the form data.  Takes the following actions on the form's input fields:
     *  - input text fields will have their 'value' property set to the empty string
     *  - select elements will have their 'selectedIndex' property set to -1
     *  - checkbox and radio inputs will have their 'checked' property set to false
     *  - inputs of type submit, button, reset, and hidden will *not* be effected
     *  - button elements will *not* be effected
     */
    $.fn.clearForm = function (includeHidden) {
        return this.each(function () {
            $('input,select,textarea', this).clearFields(includeHidden);
        });
    };

    /**
     * Clears the selected form elements.
     */
    $.fn.clearFields = $.fn.clearInputs = function (includeHidden) {
        var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
        return this.each(function () {
            var t = this.type,
                tag = this.tagName.toLowerCase();
            if (re.test(t) || tag == 'textarea') {
                this.value = '';
            } else if (t == 'checkbox' || t == 'radio') {
                this.checked = false;
            } else if (tag == 'select') {
                this.selectedIndex = -1;
            } else if (includeHidden) {
                // includeHidden can be the value true, or it can be a selector string
                // indicating a special test; for example:
                //  $('#myForm').clearForm('.special:hidden')
                // the above would clean hidden inputs that have the class of 'special'
                if (includeHidden === true && /hidden/.test(t) || typeof includeHidden == 'string' && $(this).is(includeHidden)) this.value = '';
            }
        });
    };

    /**
     * Resets the form data.  Causes all form elements to be reset to their original value.
     */
    $.fn.resetForm = function () {
        return this.each(function () {
            // guard against an input with the name of 'reset'
            // note that IE reports the reset function as an 'object'
            if (typeof this.reset == 'function' || _typeof(this.reset) == 'object' && !this.reset.nodeType) {
                this.reset();
            }
        });
    };

    /**
     * Enables or disables any matching elements.
     */
    $.fn.enable = function (b) {
        if (b === undefined) {
            b = true;
        }
        return this.each(function () {
            this.disabled = !b;
        });
    };

    /**
     * Checks/unchecks any matching checkboxes or radio buttons and
     * selects/deselects and matching option elements.
     */
    $.fn.selected = function (select) {
        if (select === undefined) {
            select = true;
        }
        return this.each(function () {
            var t = this.type;
            if (t == 'checkbox' || t == 'radio') {
                this.checked = select;
            } else if (this.tagName.toLowerCase() == 'option') {
                var $sel = $(this).parent('select');
                if (select && $sel[0] && $sel[0].type == 'select-one') {
                    // deselect all other options
                    $sel.find('option').selected(false);
                }
                this.selected = select;
            }
        });
    };

    // expose debug var
    $.fn.ajaxSubmit.debug = false;

    // helper fn for console logging
    function log() {
        if (!$.fn.ajaxSubmit.debug) return;
        var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
        if (window.console && window.console.log) {
            window.console.log(msg);
        } else if (window.opera && window.opera.postError) {
            window.opera.postError(msg);
        }
    }
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./common/static/js/vendor/jquery.leanModal.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(jQuery) {// leanModal v1.1 by Ray Stone - http://finelysliced.com.au
// Dual licensed under the MIT and GPL

// Updated to prevent divs with duplicate IDs from being rendered.

(function ($) {
    $.fn.extend({
        leanModal: function leanModal(options) {
            var defaults = {
                top: 100,
                overlay: 0.5,
                closeButton: null
            };

            // Only append the overlay element if it isn't already present.
            if ($("#lean_overlay").length == 0) {
                var overlay = $("<div id='lean_overlay'></div>");
                $("body").append(overlay);
            }

            options = $.extend(defaults, options);
            return this.each(function () {
                var o = options;
                $(this).click(function (e) {
                    var modal_id = $(this).attr("href");
                    $("#lean_overlay").click(function () {
                        close_modal(modal_id);
                    });
                    $(o.closeButton).click(function () {
                        close_modal(modal_id);
                    });
                    var modal_height = $(modal_id).outerHeight();
                    var modal_width = $(modal_id).outerWidth();
                    $("#lean_overlay").css({
                        "display": "block",
                        opacity: 0
                    });
                    $("#lean_overlay").fadeTo(200, o.overlay);
                    $(modal_id).css({
                        "display": "block",
                        "position": "fixed",
                        "opacity": 0,
                        "z-index": 11000,
                        "left": 50 + "%",
                        "margin-left": -(modal_width / 2) + "px",
                        "top": o.top + "px"
                    });
                    $(modal_id).fadeTo(200, 1);
                    e.preventDefault();
                });
            });

            function close_modal(modal_id) {
                $("#lean_overlay").fadeOut(200);
                $(modal_id).css({
                    "display": "none"
                });
            }
        }
    });
})(jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),

/***/ "./common/static/js/vendor/timepicker/datepair.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/************************
datepair.js

This is a component of the jquery-timepicker plugin

http://jonthornton.github.com/jquery-timepicker/

requires jQuery 1.6+

version: 1.2.2
************************/

!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0), __webpack_require__("./common/static/js/vendor/jQuery-File-Upload/js/vendor/jquery.ui.widget.js"), __webpack_require__("./common/static/js/vendor/timepicker/jquery.timepicker.js")], __WEBPACK_AMD_DEFINE_RESULT__ = function ($) {

	$(function () {

		$('.datepair input.date').each(function () {
			var $this = $(this);
			$this.datepicker({ 'dateFormat': 'm/d/yy' });

			if ($this.hasClass('start') || $this.hasClass('end')) {
				$this.on('changeDate change', doDatepair);
			}
		});

		$('.datepair input.time').each(function () {
			var $this = $(this);
			var opts = { 'showDuration': true, 'timeFormat': 'H:i', 'scrollDefaultNow': true };

			if ($this.hasClass('start') || $this.hasClass('end')) {
				opts.onSelect = doDatepair;
			}

			$this.timepicker(opts);
		});

		$('.datepair').each(initDatepair);

		function initDatepair() {
			var container = $(this);

			var startDateInput = container.find('input.start.date');
			var endDateInput = container.find('input.end.date');
			var dateDelta = 0;

			if (startDateInput.length && endDateInput.length) {
				var startDate = new Date(startDateInput.val());
				var endDate = new Date(endDateInput.val());

				dateDelta = endDate.getTime() - startDate.getTime();

				container.data('dateDelta', dateDelta);
			}

			var startTimeInput = container.find('input.start.time');
			var endTimeInput = container.find('input.end.time');

			if (startTimeInput.length && endTimeInput.length) {
				var startInt = startTimeInput.timepicker('getSecondsFromMidnight');
				var endInt = endTimeInput.timepicker('getSecondsFromMidnight');

				container.data('timeDelta', endInt - startInt);

				if (dateDelta < 86400000) {
					endTimeInput.timepicker('option', 'minTime', startInt);
				}
			}
		}

		function doDatepair() {
			var target = $(this);
			if (target.val() == '') {
				return;
			}

			var container = target.closest('.datepair');

			if (target.hasClass('date')) {
				updateDatePair(target, container);
			} else if (target.hasClass('time')) {
				updateTimePair(target, container);
			}
		}

		function updateDatePair(target, container) {
			var start = container.find('input.start.date');
			var end = container.find('input.end.date');

			if (!start.length || !end.length) {
				return;
			}

			var startDate = new Date(start.val());
			var endDate = new Date(end.val());

			var oldDelta = container.data('dateDelta');

			if (oldDelta && target.hasClass('start')) {
				var newEnd = new Date(startDate.getTime() + oldDelta);
				end.val(newEnd.format('m/d/Y'));
				end.datepicker('update');
				return;
			} else {
				var newDelta = endDate.getTime() - startDate.getTime();

				if (newDelta < 0) {
					newDelta = 0;

					if (target.hasClass('start')) {
						end.val(startDate.format('m/d/Y'));
						end.datepicker('update');
					} else if (target.hasClass('end')) {
						start.val(endDate.format('m/d/Y'));
						start.datepicker('update');
					}
				}

				if (newDelta < 86400000) {
					var startTimeVal = container.find('input.start.time').val();

					if (startTimeVal) {
						container.find('input.end.time').timepicker('option', { 'minTime': startTimeVal });
					}
				} else {
					container.find('input.end.time').timepicker('option', { 'minTime': null });
				}

				container.data('dateDelta', newDelta);
			}
		}

		function updateTimePair(target, container) {
			var start = container.find('input.start.time');
			var end = container.find('input.end.time');

			if (!start.length || !end.length) {
				return;
			}

			var startInt = start.timepicker('getSecondsFromMidnight');
			var endInt = end.timepicker('getSecondsFromMidnight');

			var oldDelta = container.data('timeDelta');
			var dateDelta = container.data('dateDelta');

			if (target.hasClass('start') && (!dateDelta || dateDelta < 86400000)) {
				end.timepicker('option', 'minTime', startInt);
			}

			var endDateAdvance = 0;
			var newDelta;

			if (oldDelta && target.hasClass('start')) {
				// lock the duration and advance the end time

				var newEnd = (startInt + oldDelta) % 86400;

				if (newEnd < 0) {
					newEnd += 86400;
				}

				end.timepicker('setTime', newEnd);
				newDelta = newEnd - startInt;
			} else if (startInt !== null && endInt !== null) {
				newDelta = endInt - startInt;
			} else {
				return;
			}

			container.data('timeDelta', newDelta);

			if (newDelta < 0 && (!oldDelta || oldDelta > 0)) {
				// overnight time span. advance the end date 1 day
				var endDateAdvance = 86400000;
			} else if (newDelta > 0 && oldDelta < 0) {
				// switching from overnight to same-day time span. decrease the end date 1 day
				var endDateAdvance = -86400000;
			}

			var startInput = container.find('.start.date');
			var endInput = container.find('.end.date');

			if (startInput.val() && !endInput.val()) {
				endInput.val(startInput.val());
				endInput.datepicker('update');
				dateDelta = 0;
				container.data('dateDelta', 0);
			}

			if (endDateAdvance != 0) {
				if (dateDelta || dateDelta === 0) {
					var endDate = new Date(endInput.val());
					var newEnd = new Date(endDate.getTime() + endDateAdvance);
					endInput.val(newEnd.format('m/d/Y'));
					endInput.datepicker('update');
					container.data('dateDelta', dateDelta + endDateAdvance);
				}
			}
		}
	});

	// Simulates PHP's date function
	Date.prototype.format = function (format) {
		var returnStr = '';var replace = Date.replaceChars;for (var i = 0; i < format.length; i++) {
			var curChar = format.charAt(i);if (replace[curChar]) {
				returnStr += replace[curChar].call(this);
			} else {
				returnStr += curChar;
			}
		}return returnStr;
	};Date.replaceChars = { shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], d: function d() {
			return (this.getDate() < 10 ? '0' : '') + this.getDate();
		}, D: function D() {
			return Date.replaceChars.shortDays[this.getDay()];
		}, j: function j() {
			return this.getDate();
		}, l: function l() {
			return Date.replaceChars.longDays[this.getDay()];
		}, N: function N() {
			return this.getDay() + 1;
		}, S: function S() {
			return this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th';
		}, w: function w() {
			return this.getDay();
		}, z: function z() {
			return "Not Yet Supported";
		}, W: function W() {
			return "Not Yet Supported";
		}, F: function F() {
			return Date.replaceChars.longMonths[this.getMonth()];
		}, m: function m() {
			return (this.getMonth() < 9 ? '0' : '') + (this.getMonth() + 1);
		}, M: function M() {
			return Date.replaceChars.shortMonths[this.getMonth()];
		}, n: function n() {
			return this.getMonth() + 1;
		}, t: function t() {
			return "Not Yet Supported";
		}, L: function L() {
			return this.getFullYear() % 4 == 0 && this.getFullYear() % 100 != 0 || this.getFullYear() % 400 == 0 ? '1' : '0';
		}, o: function o() {
			return "Not Supported";
		}, Y: function Y() {
			return this.getFullYear();
		}, y: function y() {
			return ('' + this.getFullYear()).substr(2);
		}, a: function a() {
			return this.getHours() < 12 ? 'am' : 'pm';
		}, A: function A() {
			return this.getHours() < 12 ? 'AM' : 'PM';
		}, B: function B() {
			return "Not Yet Supported";
		}, g: function g() {
			return this.getHours() % 12 || 12;
		}, G: function G() {
			return this.getHours();
		}, h: function h() {
			return ((this.getHours() % 12 || 12) < 10 ? '0' : '') + (this.getHours() % 12 || 12);
		}, H: function H() {
			return (this.getHours() < 10 ? '0' : '') + this.getHours();
		}, i: function i() {
			return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes();
		}, s: function s() {
			return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds();
		}, e: function e() {
			return "Not Yet Supported";
		}, I: function I() {
			return "Not Supported";
		}, O: function O() {
			return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + Math.abs(this.getTimezoneOffset() / 60) + '00';
		}, P: function P() {
			return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + Math.abs(this.getTimezoneOffset() / 60) + ':' + (Math.abs(this.getTimezoneOffset() % 60) < 10 ? '0' : '') + Math.abs(this.getTimezoneOffset() % 60);
		}, T: function T() {
			var m = this.getMonth();this.setMonth(0);var result = this.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1');this.setMonth(m);return result;
		}, Z: function Z() {
			return -this.getTimezoneOffset() * 60;
		}, c: function c() {
			return this.format("Y-m-d") + "T" + this.format("H:i:sP");
		}, r: function r() {
			return this.toString();
		}, U: function U() {
			return this.getTime() / 1000;
		} };
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // end define()

/***/ }),

/***/ "./common/static/js/vendor/timepicker/jquery.timepicker.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/************************
jquery-timepicker
http://jonthornton.github.com/jquery-timepicker/

requires jQuery 1.7+
************************/

(function (factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		// Browser globals
		factory(jQuery);
	}
})(function ($) {
	var _baseDate = _generateBaseDate();
	var _ONE_DAY = 86400;
	var _closeEvent = 'ontouchstart' in document ? 'touchstart' : 'mousedown';
	var _defaults = {
		className: null,
		minTime: null,
		maxTime: null,
		durationTime: null,
		step: 30,
		showDuration: false,
		timeFormat: 'g:ia',
		scrollDefaultNow: false,
		scrollDefaultTime: false,
		selectOnBlur: false,
		forceRoundTime: false,
		appendTo: 'body'
	};
	var _lang = {
		decimal: '.',
		mins: 'mins',
		hr: 'hr',
		hrs: 'hrs'
	};
	var globalInit = false;

	var methods = {
		init: function init(options) {
			return this.each(function () {
				var self = $(this);

				// convert dropdowns to text input
				if (self[0].tagName == 'SELECT') {
					var input = $('<input />');
					var attrs = { 'type': 'text', 'value': self.val() };
					var raw_attrs = self[0].attributes;

					for (var i = 0; i < raw_attrs.length; i++) {
						attrs[raw_attrs[i].nodeName] = raw_attrs[i].nodeValue;
					}

					input.attr(attrs);
					self.replaceWith(input);
					self = input;
				}

				var settings = $.extend({}, _defaults);

				if (options) {
					settings = $.extend(settings, options);
				}

				if (settings.minTime) {
					settings.minTime = _time2int(settings.minTime);
				}

				if (settings.maxTime) {
					settings.maxTime = _time2int(settings.maxTime);
				}

				if (settings.durationTime) {
					settings.durationTime = _time2int(settings.durationTime);
				}

				if (settings.lang) {
					_lang = $.extend(_lang, settings.lang);
				}

				self.data('timepicker-settings', settings);
				self.attr('autocomplete', 'off');
				self.on('click.timepicker focus.timepicker', methods.show);
				self.on('blur.timepicker', _formatValue);
				self.on('keydown.timepicker', _keyhandler);
				self.addClass('ui-timepicker-input');

				_formatValue.call(self.get(0));

				if (!globalInit) {
					// close the dropdown when container loses focus
					$('body').on(_closeEvent, function (e) {
						var target = $(e.target);
						var input = target.closest('.ui-timepicker-input');
						if (input.length === 0 && target.closest('.ui-timepicker-list').length === 0) {
							methods.hide();
						}
					});
					globalInit = true;
				}
			});
		},

		show: function show(e) {
			var self = $(this);

			if ('ontouchstart' in document) {
				// block the keyboard on mobile devices
				self.blur();
			}

			var list = self.data('timepicker-list');

			// check if input is readonly
			if (self.attr('readonly')) {
				return;
			}

			// check if list needs to be rendered
			if (!list || list.length === 0) {
				_render(self);
				list = self.data('timepicker-list');
			}

			// check if a flag was set to close this picker
			if (self.hasClass('ui-timepicker-hideme')) {
				self.removeClass('ui-timepicker-hideme');
				list.hide();
				return;
			}

			if (list.is(':visible')) {
				return;
			}

			// make sure other pickers are hidden
			methods.hide();

			if (self.offset().top + self.outerHeight(true) + list.outerHeight() > $(window).height() + $(window).scrollTop()) {
				// position the dropdown on top
				list.css({ 'left': self.offset().left, 'top': self.offset().top - list.outerHeight() });
			} else {
				// put it under the input
				list.css({ 'left': self.offset().left, 'top': self.offset().top + self.outerHeight() });
			}

			list.show();

			var settings = self.data('timepicker-settings');
			// position scrolling
			var selected = list.find('.ui-timepicker-selected');

			if (!selected.length) {
				if (self.val()) {
					selected = _findRow(self, list, _time2int(self.val()));
				} else if (settings.scrollDefaultNow) {
					selected = _findRow(self, list, _time2int(new Date()));
				} else if (settings.scrollDefaultTime !== false) {
					selected = _findRow(self, list, _time2int(settings.scrollDefaultTime));
				}
			}

			if (selected && selected.length) {
				var topOffset = list.scrollTop() + selected.position().top - selected.outerHeight();
				list.scrollTop(topOffset);
			} else {
				list.scrollTop(0);
			}

			self.trigger('showTimepicker');
		},

		hide: function hide(e) {
			$('.ui-timepicker-list:visible').each(function () {
				var list = $(this);
				var self = list.data('timepicker-input');
				var settings = self.data('timepicker-settings');

				if (settings && settings.selectOnBlur) {
					_selectValue(self);
				}

				list.hide();
				self.trigger('hideTimepicker');
			});
		},

		option: function option(key, value) {
			var self = $(this);
			var settings = self.data('timepicker-settings');
			var list = self.data('timepicker-list');

			if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) == 'object') {
				settings = $.extend(settings, key);
			} else if (typeof key == 'string' && typeof value != 'undefined') {
				settings[key] = value;
			} else if (typeof key == 'string') {
				return settings[key];
			}

			if (settings.minTime) {
				settings.minTime = _time2int(settings.minTime);
			}

			if (settings.maxTime) {
				settings.maxTime = _time2int(settings.maxTime);
			}

			if (settings.durationTime) {
				settings.durationTime = _time2int(settings.durationTime);
			}

			self.data('timepicker-settings', settings);

			if (list) {
				list.remove();
				self.data('timepicker-list', false);
			}
		},

		getSecondsFromMidnight: function getSecondsFromMidnight() {
			return _time2int($(this).val());
		},

		getTime: function getTime() {
			return new Date(_baseDate.valueOf() + _time2int($(this).val()) * 1000);
		},

		setTime: function setTime(value) {
			var self = $(this);
			var prettyTime = _int2time(_time2int(value), self.data('timepicker-settings').timeFormat);
			self.val(prettyTime);
		},

		remove: function remove() {
			var self = $(this);

			// check if this element is a timepicker
			if (!self.hasClass('ui-timepicker-input')) {
				return;
			}

			self.removeAttr('autocomplete', 'off');
			self.removeClass('ui-timepicker-input');
			self.removeData('timepicker-settings');
			self.off('.timepicker');

			// timepicker-list won't be present unless the user has interacted with this timepicker
			if (self.data('timepicker-list')) {
				self.data('timepicker-list').remove();
			}

			self.removeData('timepicker-list');
		}
	};

	// private methods

	function _render(self) {
		var settings = self.data('timepicker-settings');
		var list = self.data('timepicker-list');

		if (list && list.length) {
			list.remove();
			self.data('timepicker-list', false);
		}

		list = $('<ul />');
		list.attr('tabindex', -1);
		list.addClass('ui-timepicker-list');
		if (settings.className) {
			list.addClass(settings.className);
		}

		list.css({ 'display': 'none', 'position': 'absolute' });

		if ((settings.minTime !== null || settings.durationTime !== null) && settings.showDuration) {
			list.addClass('ui-timepicker-with-duration');
		}

		var durStart = settings.durationTime !== null ? settings.durationTime : settings.minTime;
		var start = settings.minTime !== null ? settings.minTime : 0;
		var end = settings.maxTime !== null ? settings.maxTime : start + _ONE_DAY - 1;

		if (end <= start) {
			// make sure the end time is greater than start time, otherwise there will be no list to show
			end += _ONE_DAY;
		}
		for (var i = start; i <= end; i += settings.step * 60) {
			var timeInt = i;
			var row = $('<li />');
			row.data('time', timeInt);
			row.text(_int2time(timeInt, settings.timeFormat));

			if ((settings.minTime !== null || settings.durationTime !== null) && settings.showDuration) {
				var duration = $('<span />');
				duration.addClass('ui-timepicker-duration');
				duration.text(' (' + _int2duration(i - durStart) + ')');
				row.append(duration);
			}

			list.append(row);
		}

		list.data('timepicker-input', self);
		self.data('timepicker-list', list);

		var appendTo = settings.appendTo;
		if (typeof appendTo === 'string') {
			appendTo = $(appendTo);
		} else if (typeof appendTo === 'function') {
			appendTo = appendTo(self);
		}
		appendTo.append(list);
		_setSelected(self, list);

		list.on('click', 'li', function (e) {
			self.addClass('ui-timepicker-hideme');
			self[0].focus();

			// make sure only the clicked row is selected
			list.find('li').removeClass('ui-timepicker-selected');
			$(this).addClass('ui-timepicker-selected');

			_selectValue(self);
			list.hide();
		});
	}

	function _generateBaseDate() {
		var _baseDate = new Date();
		var _currentTimezoneOffset = _baseDate.getTimezoneOffset() * 60000;
		_baseDate.setHours(0);_baseDate.setMinutes(0);_baseDate.setSeconds(0);
		var _baseDateTimezoneOffset = _baseDate.getTimezoneOffset() * 60000;

		return new Date(_baseDate.valueOf() - _baseDateTimezoneOffset + _currentTimezoneOffset);
	}

	function _findRow(self, list, value) {
		if (!value && value !== 0) {
			return false;
		}

		var settings = self.data('timepicker-settings');
		var out = false;
		var halfStep = settings.step * 30;

		// loop through the menu items
		list.find('li').each(function (i, obj) {
			var jObj = $(obj);

			var offset = jObj.data('time') - value;

			// check if the value is less than half a step from each row
			if (Math.abs(offset) < halfStep || offset == halfStep) {
				out = jObj;
				return false;
			}
		});

		return out;
	}

	function _setSelected(self, list) {
		var timeValue = _time2int(self.val());

		var selected = _findRow(self, list, timeValue);
		if (selected) selected.addClass('ui-timepicker-selected');
	}

	function _formatValue() {
		if (this.value === '') {
			return;
		}

		var self = $(this);
		var seconds = _time2int(this.value);

		if (seconds === null) {
			self.trigger('timeFormatError');
			return;
		}

		var settings = self.data('timepicker-settings');

		if (settings.forceRoundTime) {
			var offset = seconds % (settings.step * 60); // step is in minutes

			if (offset >= settings.step * 30) {
				// if offset is larger than a half step, round up
				seconds += settings.step * 60 - offset;
			} else {
				// round down
				seconds -= offset;
			}
		}

		var prettyTime = _int2time(seconds, settings.timeFormat);
		self.val(prettyTime);
	}

	function _keyhandler(e) {
		var self = $(this);
		var list = self.data('timepicker-list');

		if (!list.is(':visible')) {
			if (e.keyCode == 40) {
				self.focus();
			} else {
				return true;
			}
		}

		switch (e.keyCode) {

			case 13:
				// return
				_selectValue(self);
				methods.hide.apply(this);
				e.preventDefault();
				return false;

			case 38:
				// up
				var selected = list.find('.ui-timepicker-selected');

				if (!selected.length) {
					list.children().each(function (i, obj) {
						if ($(obj).position().top > 0) {
							selected = $(obj);
							return false;
						}
					});
					selected.addClass('ui-timepicker-selected');
				} else if (!selected.is(':first-child')) {
					selected.removeClass('ui-timepicker-selected');
					selected.prev().addClass('ui-timepicker-selected');

					if (selected.prev().position().top < selected.outerHeight()) {
						list.scrollTop(list.scrollTop() - selected.outerHeight());
					}
				}

				break;

			case 40:
				// down
				selected = list.find('.ui-timepicker-selected');

				if (selected.length === 0) {
					list.children().each(function (i, obj) {
						if ($(obj).position().top > 0) {
							selected = $(obj);
							return false;
						}
					});

					selected.addClass('ui-timepicker-selected');
				} else if (!selected.is(':last-child')) {
					selected.removeClass('ui-timepicker-selected');
					selected.next().addClass('ui-timepicker-selected');

					if (selected.next().position().top + 2 * selected.outerHeight() > list.outerHeight()) {
						list.scrollTop(list.scrollTop() + selected.outerHeight());
					}
				}

				break;

			case 27:
				// escape
				list.find('li').removeClass('ui-timepicker-selected');
				list.hide();
				break;

			case 9:
				//tab
				methods.hide();
				break;

			case 16:
			case 17:
			case 18:
			case 19:
			case 20:
			case 33:
			case 34:
			case 35:
			case 36:
			case 37:
			case 39:
			case 45:
				return;

			default:
				list.find('li').removeClass('ui-timepicker-selected');
				return;
		}
	}

	function _selectValue(self) {
		var settings = self.data('timepicker-settings');
		var list = self.data('timepicker-list');
		var timeValue = null;

		var cursor = list.find('.ui-timepicker-selected');

		if (cursor.length) {
			// selected value found
			timeValue = cursor.data('time');
		} else if (self.val()) {

			// no selected value; fall back on input value
			timeValue = _time2int(self.val());

			_setSelected(self, list);
		}

		if (timeValue !== null) {
			var timeString = _int2time(timeValue, settings.timeFormat);
			self.attr('value', timeString);
		}

		self.trigger('change').trigger('changeTime');
	}

	function _int2duration(seconds) {
		var minutes = Math.round(seconds / 60);
		var duration;

		if (Math.abs(minutes) < 60) {
			duration = [minutes, _lang.mins];
		} else if (minutes == 60) {
			duration = ['1', _lang.hr];
		} else {
			var hours = (minutes / 60).toFixed(1);
			if (_lang.decimal != '.') hours = hours.replace('.', _lang.decimal);
			duration = [hours, _lang.hrs];
		}

		return duration.join(' ');
	}

	function _int2time(seconds, format) {
		if (seconds === null) {
			return;
		}

		var time = new Date(_baseDate.valueOf() + seconds * 1000);
		var output = '';
		var hour, code;

		for (var i = 0; i < format.length; i++) {

			code = format.charAt(i);
			switch (code) {

				case 'a':
					output += time.getHours() > 11 ? 'pm' : 'am';
					break;

				case 'A':
					output += time.getHours() > 11 ? 'PM' : 'AM';
					break;

				case 'g':
					hour = time.getHours() % 12;
					output += hour === 0 ? '12' : hour;
					break;

				case 'G':
					output += time.getHours();
					break;

				case 'h':
					hour = time.getHours() % 12;

					if (hour !== 0 && hour < 10) {
						hour = '0' + hour;
					}

					output += hour === 0 ? '12' : hour;
					break;

				case 'H':
					hour = time.getHours();
					if (seconds >= _ONE_DAY) hour = Math.floor(seconds / (60 * 60));
					output += hour > 9 ? hour : '0' + hour;
					break;

				case 'i':
					var minutes = time.getMinutes();
					output += minutes > 9 ? minutes : '0' + minutes;
					break;

				case 's':
					seconds = time.getSeconds();
					output += seconds > 9 ? seconds : '0' + seconds;
					break;

				default:
					output += code;
			}
		}

		return output;
	}

	function _time2int(timeString) {
		if (timeString === '') return null;
		if (timeString + 0 == timeString) return timeString;

		if ((typeof timeString === 'undefined' ? 'undefined' : _typeof(timeString)) == 'object') {
			timeString = timeString.getHours() + ':' + timeString.getMinutes() + ':' + timeString.getSeconds();
		}

		var d = new Date(0);
		var time = timeString.toLowerCase().match(/(\d{1,2})(?::(\d{1,2}))?(?::(\d{2}))?\s*([pa]?)/);

		if (!time) {
			return null;
		}

		var hour = parseInt(time[1] * 1, 10);
		var hours;

		if (time[4]) {
			if (hour == 12) {
				hours = time[4] == 'p' ? 12 : 0;
			} else {
				hours = hour + (time[4] == 'p' ? 12 : 0);
			}
		} else {
			hours = hour;
		}

		var minutes = time[2] * 1 || 0;
		var seconds = time[3] * 1 || 0;
		return hours * 3600 + minutes * 60 + seconds;
	}

	// Plugin entry
	$.fn.timepicker = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if ((typeof method === 'undefined' ? 'undefined' : _typeof(method)) === "object" || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error("Method " + method + " does not exist on jQuery.timepicker");
		}
	};
});

/***/ }),

/***/ "./node_modules/backbone-associations/backbone-associations-min.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(q,f){if(true)!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2),__webpack_require__(1)], __WEBPACK_AMD_DEFINE_RESULT__ = function(g,i){return f(q,i,g)}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else if("undefined"!==typeof exports){var g=require("underscore"),i=require("backbone");f(q,i,g);"undefined"!==typeof module&&module.exports&&(module.exports=i);exports=i}else f(q,q.Backbone,q._)})(this,function(q,f,g){var i,p,t,w,n,v,D,E,k,z,F,s={};i=f.Model;p=f.Collection;t=i.prototype;n=p.prototype;w=f.Events;f.Associations={VERSION:"0.6.2"};f.Associations.scopes=[];var G=function(){return k},
A=function(a){if(!g.isString(a)||1>g.size(a))a=".";k=a;D=RegExp("[\\"+k+"\\[\\]]+","g");E=RegExp("[^\\"+k+"\\[\\]]+","g")};try{Object.defineProperty(f.Associations,"SEPARATOR",{enumerable:!0,get:G,set:A})}catch(J){}f.Associations.Many=f.Many="Many";f.Associations.One=f.One="One";f.Associations.Self=f.Self="Self";f.Associations.SEPARATOR=".";f.Associations.getSeparator=G;f.Associations.setSeparator=A;f.Associations.EVENTS_BUBBLE=!0;f.Associations.EVENTS_WILDCARD=!0;f.Associations.EVENTS_NC=!1;A();
v=f.AssociatedModel=f.Associations.AssociatedModel=i.extend({relations:void 0,_proxyCalls:void 0,constructor:function(a,c){c&&c.__parents__&&(this.parents=[c.__parents__]);i.apply(this,arguments)},on:function(a,c,d){var b=w.on.apply(this,arguments);if(f.Associations.EVENTS_NC)return b;var l=/\s+/;g.isString(a)&&a&&!l.test(a)&&c&&(l=B(a))&&(s[l]="undefined"===typeof s[l]?1:s[l]+1);return b},off:function(a,c,d){if(f.Associations.EVENTS_NC)return w.off.apply(this,arguments);var b=/\s+/,l=this._events,
e={},h=l?g.keys(l):[],m=!a&&!c&&!d,i=g.isString(a)&&!b.test(a);if(m||i)for(var b=0,j=h.length;b<j;b++)e[h[b]]=l[h[b]]?l[h[b]].length:0;var p=w.off.apply(this,arguments);if(m||i){b=0;for(j=h.length;b<j;b++)(m=B(h[b]))&&(s[m]=l[h[b]]?s[m]-(e[h[b]]-l[h[b]].length):s[m]-e[h[b]])}return p},get:function(a){var c=this.__attributes__,d=t.get.call(this,a),c=c?x(d)?d:c[a]:d;return x(c)?c:this._getAttr.apply(this,arguments)},set:function(a,c,d){var b;g.isObject(a)||null==a?(b=a,d=c):(b={},b[a]=c);a=this._set(b,
d);this._processPendingEvents();return a},_set:function(a,c){var d,b,l,e,h=this;if(!a)return this;this.__attributes__=a;for(d in a)if(b||(b={}),d.match(D)){var f=H(d);e=g.initial(f);f=f[f.length-1];e=this.get(e);e instanceof i&&(e=b[e.cid]||(b[e.cid]={model:e,data:{}}),e.data[f]=a[d])}else e=b[this.cid]||(b[this.cid]={model:this,data:{}}),e.data[d]=a[d];if(b)for(l in b)e=b[l],this._setAttr.call(e.model,e.data,c)||(h=!1);else h=this._setAttr.call(this,a,c);delete this.__attributes__;return h},_setAttr:function(a,
c){var d;c||(c={});if(c.unset)for(d in a)a[d]=void 0;this.parents=this.parents||[];this.relations&&g.each(this.relations,function(b){var d=b.key,e=b.scope||q,h=this._transformRelatedModel(b,a),m=this._transformCollectionType(b,h,a),u=g.isString(b.map)?C(b.map,e):b.map,j=this.attributes[d],k=j&&j.idAttribute,o,r,n=!1;o=b.options?g.extend({},b.options,c):c;if(a[d]){e=g.result(a,d);e=u?u.call(this,e,m?m:h):e;if(x(e))if(b.type===f.Many)j?(j._deferEvents=!0,j[o.reset?"reset":"set"](e instanceof p?e.models:
e,o),h=j):(n=!0,e instanceof p?h=e:(h=this._createCollection(m||p,b.collectionOptions||(h?{model:h}:{})),h[o.reset?"reset":"set"](e,o)));else if(b.type===f.One)b=e instanceof i?e.attributes.hasOwnProperty(k):e.hasOwnProperty(k),m=e instanceof i?e.attributes[k]:e[k],j&&b&&j.attributes[k]===m?(j._deferEvents=!0,j._set(e instanceof i?e.attributes:e,o),h=j):(n=!0,e instanceof i?h=e:(o.__parents__=this,h=new h(e,o),delete o.__parents__));else throw Error("type attribute must be specified and have the values Backbone.One or Backbone.Many");
else h=e;r=a[d]=h;if(n||r&&!r._proxyCallback)r._proxyCallback||(r._proxyCallback=function(){return f.Associations.EVENTS_BUBBLE&&this._bubbleEvent.call(this,d,r,arguments)}),r.on("all",r._proxyCallback,this)}a.hasOwnProperty(d)&&this._setupParents(a[d],this.attributes[d])},this);return t.set.call(this,a,c)},_bubbleEvent:function(a,c,d){var b=d[0].split(":"),g=b[0],e="nested-change"==d[0],h="change"===g,m=d[1],u=-1,j=c._proxyCalls,b=b[1],n=!b||-1==b.indexOf(k),o;if(!e&&(n&&(F=B(d[0])||a),f.Associations.EVENTS_NC||
s[F])){if(f.Associations.EVENTS_WILDCARD&&/\[\*\]/g.test(b))return this;if(c instanceof p&&(h||b))u=c.indexOf(z||m);this instanceof i&&(z=this);b=a+(-1!==u&&(h||b)?"["+u+"]":"")+(b?k+b:"");f.Associations.EVENTS_WILDCARD&&(o=b.replace(/\[\d+\]/g,"[*]"));e=[];e.push.apply(e,d);e[0]=g+":"+b;f.Associations.EVENTS_WILDCARD&&b!==o&&(e[0]=e[0]+" "+g+":"+o);j=c._proxyCalls=j||{};if(this._isEventAvailable.call(this,j,b))return this;j[b]=!0;h&&(this._previousAttributes[a]=c._previousAttributes,this.changed[a]=
c);this.trigger.apply(this,e);f.Associations.EVENTS_NC&&(h&&this.get(b)!=d[2])&&(a=["nested-change",b,d[1]],d[2]&&a.push(d[2]),this.trigger.apply(this,a));j&&b&&delete j[b];z=void 0;return this}},_isEventAvailable:function(a,c){return g.find(a,function(a,b){return-1!==c.indexOf(b,c.length-b.length)})},_setupParents:function(a,c){a&&(a.parents=a.parents||[],-1==g.indexOf(a.parents,this)&&a.parents.push(this));c&&(0<c.parents.length&&c!=a)&&(c.parents=g.difference(c.parents,[this]),c._proxyCallback&&
c.off("all",c._proxyCallback,this))},_createCollection:function(a,c){var c=g.defaults(c,{model:a.model}),d=new a([],g.isFunction(c)?c.call(this):c);d.parents=[this];return d},_processPendingEvents:function(){this._processedEvents||(this._processedEvents=!0,this._deferEvents=!1,g.each(this._pendingEvents,function(a){a.c.trigger.apply(a.c,a.a)}),this._pendingEvents=[],g.each(this.relations,function(a){(a=this.attributes[a.key])&&a._processPendingEvents&&a._processPendingEvents()},this),delete this._processedEvents)},
_transformRelatedModel:function(a,c){var d=a.relatedModel,b=a.scope||q;d&&!(d.prototype instanceof i)&&(d=g.isFunction(d)?d.call(this,a,c):d);d&&g.isString(d)&&(d=d===f.Self?this.constructor:C(d,b));if(a.type===f.One){if(!d)throw Error("specify a relatedModel for Backbone.One type");if(!(d.prototype instanceof f.Model))throw Error("specify an AssociatedModel or Backbone.Model for Backbone.One type");}return d},_transformCollectionType:function(a,c,d){var b=a.collectionType,l=a.scope||q;if(b&&g.isFunction(b)&&
b.prototype instanceof i)throw Error("type is of Backbone.Model. Specify derivatives of Backbone.Collection");b&&!(b.prototype instanceof p)&&(b=g.isFunction(b)?b.call(this,a,d):b);b&&g.isString(b)&&(b=C(b,l));if(b&&!b.prototype instanceof p)throw Error("collectionType must inherit from Backbone.Collection");if(a.type===f.Many&&!c&&!b)throw Error("specify either a relatedModel or collectionType");return b},trigger:function(a){this._deferEvents?(this._pendingEvents=this._pendingEvents||[],this._pendingEvents.push({c:this,
a:arguments})):t.trigger.apply(this,arguments)},toJSON:function(a){var c={},d;c[this.idAttribute]=this.id;this.visited||(this.visited=!0,c=t.toJSON.apply(this,arguments),a&&a.serialize_keys&&(c=g.pick(c,a.serialize_keys)),this.relations&&g.each(this.relations,function(b){var f=b.key,e=b.remoteKey,h=this.attributes[f],i=!b.isTransient,b=b.serialize||[],k=g.clone(a);delete c[f];i&&(b.length&&(k?k.serialize_keys=b:k={serialize_keys:b}),d=h&&h.toJSON?h.toJSON(k):h,c[e||f]=g.isArray(d)?g.compact(d):d)},
this),delete this.visited);return c},clone:function(a){return new this.constructor(this.toJSON(a))},cleanup:function(a){a=a||{};g.each(this.relations,function(a){if(a=this.attributes[a.key])a._proxyCallback&&a.off("all",a._proxyCallback,this),a.parents=g.difference(a.parents,[this])},this);!a.listen&&this.off()},destroy:function(a){var a=a?g.clone(a):{},a=g.defaults(a,{remove_references:!0,listen:!0}),c=this;if(a.remove_references&&a.wait){var d=a.success;a.success=function(b){d&&d(c,b,a);c.cleanup(a)}}var b=
t.destroy.apply(this,[a]);a.remove_references&&!a.wait&&c.cleanup(a);return b},_getAttr:function(a){var c=this,d=this.__attributes__,a=H(a),b,f;if(!(1>g.size(a))){for(f=0;f<a.length;f++){b=a[f];if(!c)break;c=c instanceof p?isNaN(b)?void 0:c.at(b):d?x(c.attributes[b])?c.attributes[b]:d[b]:c.attributes[b]}return c}}});var H=function(a){return""===a?[""]:g.isString(a)?a.match(E):a||[]},B=function(a){if(!a)return a;a=a.split(":");return 1<a.length?(a=a[a.length-1],a=a.split(k),1<a.length?a[a.length-1].split("[")[0]:
a[0].split("[")[0]):""},C=function(a,c){var d,b=[c];b.push.apply(b,f.Associations.scopes);for(var i,e=0,h=b.length;e<h;++e)if(i=b[e])if(d=g.reduce(a.split(k),function(a,b){return a[b]},i))break;return d},I=function(a,c,d){var b,f;g.find(a,function(a){if(b=g.find(a.relations,function(b){return a.get(b.key)===c},this))return f=a,!0},this);return b&&b.map?b.map.call(f,d,c):d},x=function(a){return!g.isUndefined(a)&&!g.isNull(a)},y={};g.each(["set","remove","reset"],function(a){y[a]=p.prototype[a];n[a]=
function(c,d){this.model.prototype instanceof v&&this.parents&&(arguments[0]=I(this.parents,this,c));return y[a].apply(this,arguments)}});y.trigger=n.trigger;n.trigger=function(a){this._deferEvents?(this._pendingEvents=this._pendingEvents||[],this._pendingEvents.push({c:this,a:arguments})):y.trigger.apply(this,arguments)};n._processPendingEvents=v.prototype._processPendingEvents;n.on=v.prototype.on;n.off=v.prototype.off;return f});


/***/ }),

/***/ "./node_modules/edx-ui-toolkit/src/js/dropdown-menu/dropdown-menu-view.js":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * A Backbone view that renders a fully accessible dropdown menu.
 *
 * Initialize the view by passing in the following attributes:
 *
 *~~~ javascript
 * view = new DropdownMenuView({
 *     className: 'space separated string of classes for element',
 *     model: new Backbone.Model({
 *         main: {
 *             image: 'http://placehold.it/40x40',
 *             screenreader_label: 'Dashboard for: ',
 *             text: 'username',
 *             url: 'dashboard'
 *         },
 *         button: {
 *             icon: 'icon-angle-down',
 *             label: 'User options dropdown'
 *         },
 *         items: [
 *             {
 *                 text: 'Account',
 *                 url: 'account_settings'
 *             }, {
 *                 text: 'Sign Out',
 *                 url: 'logout'
 *             }
 *         ]
 *     }),
 *     parent: 'selector for parent element that will be replaced with dropdown menu',
 *     ...
 * });
 *~~~
 * @module DropdownMenuView
 */
(function(define) {
    'use strict';
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
        __webpack_require__(1),
        __webpack_require__(0),
        __webpack_require__(2),
        __webpack_require__("./node_modules/edx-ui-toolkit/src/js/utils/constants.js"),
        __webpack_require__("./node_modules/raw-loader/index.js!./node_modules/edx-ui-toolkit/src/js/dropdown-menu/dropdown.underscore")
    ], __WEBPACK_AMD_DEFINE_RESULT__ = function(Backbone, $, _, constants, DropdownTpl) {
            var DropdownMenuView = Backbone.View.extend({
                tpl: _.template(DropdownTpl),

                events: {
                    'click .js-dropdown-button': 'clickOpenDropdown',
                    'click a': 'analyticsLinkClick',
                    keydown: 'viewKeypress'
                },

                dropdownButton: '.js-dropdown-button',

                menu: '.dropdown-menu',

                initialize: function(options) {
                    if (options.parent) {
                        this.$parent = $(options.parent);
                    }

                    this.menuId = options.menuId || 'dropdown-menu-' + this.cid;
                    this.keyBack = [constants.keyCodes.up, constants.keyCodes.left];
                    this.keyForward = [constants.keyCodes.down, constants.keyCodes.right];
                    this.keyClose = [constants.keyCodes.esc, constants.keyCodes.space];
                },

                className: function() {
                    return this.options.className;
                },

                render: function() {
                    /**
                     * Set in the render function to prevent error when
                     * view is used with a pre-rendered DOM
                     */
                    this.model.set({menuId: this.menuId});

                    this.$el.html(this.tpl(this.model.toJSON()));
                    this.$parent.replaceWith(this.$el);
                    this.postRender();

                    return this;
                },

                postRender: function() {
                    this.$menu = this.$('.dropdown-menu');
                    this.$page = $(document);
                    this.$dropdownButton = this.$(this.dropdownButton);
                    this.$lastItem = this.$menu.find('li:last-child a');
                },

                /**
                 * Function to track analytics.
                 *
                 * By default it doesn't do anything, to utilize please
                 * extend the View and implement a method such as the
                 * following:
                 *
                 *~~~ javascript
                 * var $link = $(event.target),
                 *     label = $link.hasClass('menu-title') ? 'Dashboard' : $link.html().trim();
                 *
                 * window.analytics.track('user_dropdown.clicked', {
                 *     category: 'navigation',
                 *     label: label,
                 *     link: $link.attr('href')
                 * });
                 *~~~
                 *
                 * @param {object} event The event to be tracked.
                 * @returns {*} The event.
                 */
                analyticsLinkClick: function(event) {
                    return event;
                },

                clickCloseDropdown: function(event, context) {
                    var $el = $(event.target) || $(document),
                        $btn;

                    // When using edX Pattern Library icons the target
                    // is sometimes not the button.
                    if (!$el.hasClass(this.dropdownButton)) {
                        // If there is a parent dropdown button that is the element to test
                        $btn = $el.closest(this.dropdownButton);
                        if ($btn.length > 0) {
                            $el = $btn;
                        }
                    }

                    if (!$el.hasClass('button-more') && !$el.hasClass('has-dropdown')) {
                        context.closeDropdownMenu();
                    }
                },

                clickOpenDropdown: function(event) {
                    event.preventDefault();
                    this.openMenu(this.$dropdownButton);
                },

                closeDropdownMenu: function() {
                    var $open = this.$(this.menu);

                    $open.removeClass('is-visible')
                        .addClass('is-hidden');

                    this.$dropdownButton
                        .removeClass('is-active')
                        .attr('aria-expanded', 'false');
                },

                focusFirstItem: function() {
                    this.$menu.find('.dropdown-item:first-child .action').focus();
                },

                focusLastItem: function() {
                    this.$lastItem.focus();
                },

                handlerIsAction: function(key, $el) {
                    if (_.contains(this.keyForward, key)) {
                        this.nextMenuItemLink($el);
                    } else if (_.contains(this.keyBack, key)) {
                        this.previousMenuItemLink($el);
                    }
                },

                handlerIsButton: function(key, event) {
                    if (_.contains(this.keyForward, key)) {
                        this.focusFirstItem();
                        // if up arrow or left arrow key pressed or shift+tab
                    } else if (_.contains(this.keyBack, key) || key === constants.keyCodes.tab && event.shiftKey) {
                        event.preventDefault();
                        this.focusLastItem();
                    }
                },

                handlerIsMenu: function(key) {
                    if (_.contains(this.keyForward, key)) {
                        this.focusFirstItem();
                    } else if (_.contains(this.keyBack, key)) {
                        this.$dropdownButton.focus();
                    }
                },

                handlerPageClicks: function(context) {
                    // Only want 1 event listener for click.dropdown
                    // on the page so unbind for instantiating
                    this.$page.off('click.dropdown');
                    this.$page.on('click.dropdown', function(event) {
                        context.clickCloseDropdown(event, context);
                    });
                },

                nextMenuItemLink: function($el) {
                    var items = this.$('.dropdown-menu').children('.dropdown-item').find('.action'),
                        itemsCount = items.length - 1,
                        index = items.index($el),
                        next = index + 1;

                    if (index === itemsCount) {
                        this.$dropdownButton.focus();
                    } else {
                        items.eq(next).focus();
                    }
                },

                openMenu: function($btn) {
                    var $menu = this.$menu;
                    if ($menu.hasClass('is-visible')) {
                        this.closeDropdownMenu();
                    } else {
                        $btn.addClass('is-active')
                            .attr('aria-expanded', 'true');

                        $menu.removeClass('is-hidden')
                            .addClass('is-visible');

                        $menu.focus();
                        this.setOrientation();
                        this.handlerPageClicks(this);
                    }
                },

                previousMenuItemLink: function($el) {
                    var items = this.$('.dropdown-menu').children('.dropdown-item').find('.action'),
                        index = items.index($el),
                        prev = index - 1;

                    if (index === 0) {
                        this.$dropdownButton.focus();
                    } else {
                        items.eq(prev).focus();
                    }
                },

                setOrientation: function() {
                    var midpoint = $(window).width() / 2,
                        alignClass = (this.$dropdownButton.offset().left > midpoint) ? 'align-right' : 'align-left';

                    this.$menu
                        .removeClass('align-left align-right')
                        .addClass(alignClass);
                },

                viewKeypress: function(event) {
                    var key = event.keyCode,
                        $el = $(event.target);

                    if (_.contains(this.keyForward, key) || _.contains(this.keyBack, key)) {
                        // Prevent default behavior if one of our trigger keys
                        event.preventDefault();
                    }

                    if (key === constants.keyCodes.tab && !event.shiftKey && _.first($el) === _.first(this.$lastItem)) {
                        event.preventDefault();
                        this.$dropdownButton.focus();
                    } else if (_.contains(this.keyClose, key)) {
                        this.closeDropdownMenu();
                        this.$dropdownButton.focus();
                    } else if ($el.hasClass('action')) {
                        // Key handlers for when a menu item has focus
                        this.handlerIsAction(key, $el);
                    } else if ($el.hasClass('dropdown-menu')) {
                        // Key handlers for when the menu itself has focus, before an item within it receives focus
                        this.handlerIsMenu(key);
                    } else if ($el.hasClass('has-dropdown')) {
                        // Key handlers for when the button that opens the menu has focus
                        this.handlerIsButton(key, event);
                    }
                }
            });

            return DropdownMenuView;
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}).call(
    this,
    // Use the default 'define' function if available, else use 'RequireJS.define'
    __webpack_require__("./node_modules/webpack/buildin/amd-define.js")
);


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./node_modules/edx-ui-toolkit/src/js/dropdown-menu/dropdown.underscore":
/***/ (function(module, exports) {

module.exports = "module.exports = \"<a href=\\\"<%- main.url %>\\\" class=\\\"menu-title\\\">\\n    <% if (main.screenreader_label) { %>\\n        <span class=\\\"sr-only\\\"><%- main.screenreader_label %> </span>\\n    <% } %>\\n    <% if (main.image) { %>\\n        <img class=\\\"menu-image\\\" src=\\\"<%- main.image %>\\\" alt=\\\"\\\">\\n    <% } %>\\n    <%- main.text %>\\n</a>\\n<button type=\\\"button\\\" class=\\\"menu-button button-more has-dropdown js-dropdown-button <% if (!button.icon) { %>default-icon<% } %>\\\" aria-haspopup=\\\"true\\\" aria-expanded=\\\"false\\\" aria-controls=\\\"<%- menuId %>\\\">\\n    <% if (button.icon) { %>\\n        <span class=\\\"icon <%- button.icon %>\\\" aria-hidden=\\\"true\\\"></span>\\n    <% } %>\\n    <span class=\\\"sr-only\\\"><%- button.label %></span>\\n</button>\\n<ul class=\\\"dropdown-menu list-divided is-hidden\\\" id=\\\"<%- menuId %>\\\" tabindex=\\\"-1\\\">\\n    <% _.each(items, function(item, index) { %>\\n        <li class=\\\"dropdown-item item has-block-link\\\">\\n            <a href=\\\"<%- item.url %>\\\" class=\\\"action\\\"><%- item.text %></a>\\n        </li>\\n    <% }); %>\\n</ul>\\n\""

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

(function() { module.exports = window["jQuery"]; }());

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

(function() { module.exports = window["Backbone"]; }());

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

(function() { module.exports = window["_"]; }());

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

(function() { module.exports = window["gettext"]; }());

/***/ })

},["./cms/static/js/pages/textbooks.js"])));
//# sourceMappingURL=textbooks.js.map