"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexUtils = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the HTML Text Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
var IndexUtils = /*#__PURE__*/function () {
  function IndexUtils() {
    _classCallCheck(this, IndexUtils);
  }

  _createClass(IndexUtils, null, [{
    key: "transformIndexOnInsert",
    value: function transformIndexOnInsert(index, insertIndex, value) {
      if (insertIndex <= index) {
        return index + value.length;
      }

      return index;
    }
  }, {
    key: "transformIndexOnDelete",
    value: function transformIndexOnDelete(index, deleteIndex, length) {
      if (index > deleteIndex) {
        return index - Math.min(index - deleteIndex, length);
      }

      return index;
    }
  }]);

  return IndexUtils;
}();

exports.IndexUtils = IndexUtils;