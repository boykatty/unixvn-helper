/*!
 * Unix.vn Helper  v1.0.0
 * Copyright (c) 2018 Tuong Do Van(boykatty) and contributors
 * Email: dotuong91@gmail.com
 * Released under the MIT license
 *
 * Date: 2018-07-19
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {// AMD. Register as anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {// Node / CommonJS.
        factory(require('jquery'));
    } else {// Browser globals.
        factory(jQuery);
    }
})(function ($) {
    var $regxNumber = /[0-9]/;

    function isUndefined(n) {
        return typeof n === 'undefined';
    }

    function toNumber($str) {
        var $formatted = "";
        for (var i = 0; i < $str.length; i++) {
            var $char = $str.charAt(i);
            if ($formatted.length == 0 && $char == 0)
                $char = false;
            if ($char && $char.match($regxNumber)) {
                $formatted += $char;
            }
        }
        return $formatted;
    }

    $.fn.unixvnPriceFormat = function ($options) {//price format from input text
        var $options = $.extend(true, {}, $.fn.unixvnPriceFormat.defaults, $options);
        var $separator = $options.separator;
        var $this = this;

        $this.keyup(function ($e) {
            var $key = isUndefined($e.key) ? 0 : $e.key;
            var $val = $(this).val();
            var $check = false;
            var $newVal = toNumber($val + $key);
            var $result = "";
            var $thousandsCount = 0;

            if ($newVal != "") {
                for (var i = $newVal.length; i > 0; i--) {
                    var $char = $newVal.substr(i - 1, 1);
                    $thousandsCount++;
                    if ($thousandsCount % 3 == 0)
                        $char = $separator + $char;
                    $result = $char + $result;
                }
                if ($result.substr(0, 1) == $separator)
                    $result = $result.substring(1, $result.length);
                $this.val($result);
            } else {
                $this.val(0);
            }
        }).keydown(function ($e) {
            var $code = $e.keyCode ? $e.keyCode : $e.which;
            if ($code !== 8) {//check key backspace 
                $e.preventDefault();
                $e.stopPropagation();
                return false;
            }
        });

        $this.focusout(function () {
            if ($(this).val().length < 1) {
                $(this).val(0)
            }
        });
    };
});