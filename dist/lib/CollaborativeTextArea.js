"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollaborativeTextArea = void 0;

var _CollaborativeSelectionManager = require("./CollaborativeSelectionManager");

var _TextInputManager = require("./TextInputManager");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Adapts a plain HTMLTextAreaElement to add collaborative editing
 * capabilities. This class will add an overlay HTMLDivElement on
 * top of the HTMLTextAreaElement to render cursors and selection
 * of collaborators. This class also adds convenience API to
 * mutate the text area value and to get events / callbacks when
 * the value is changed by the user. Mutation methods and mutation
 * events are granular describing exactly how the value was changed.
 */
var CollaborativeTextArea = /*#__PURE__*/function () {
  /**
   * Creates a new [[CollaborativeTextArea]].
   *
   * @param options The options to configure this instance.
   */
  function CollaborativeTextArea(options) {
    var _this = this;

    _classCallCheck(this, CollaborativeTextArea);

    _defineProperty(this, "_selectionManager", void 0);

    _defineProperty(this, "_inputManager", void 0);

    if (!options) {
      throw new Error("options must be defined.");
    }

    if (!options.control) {
      throw new Error("options.control must be defined.");
    }

    var control = options.control;
    var insertCallback = options.onInsert;
    var deleteCallback = options.onDelete;

    var onInsert = function onInsert(index, value) {
      _this._selectionManager.updateSelectionsOnInsert(index, value);

      if (insertCallback) {
        insertCallback(index, value);
      }
    };

    var onDelete = function onDelete(index, length) {
      _this._selectionManager.updateSelectionsOnDelete(index, length);

      if (deleteCallback) {
        deleteCallback(index, length);
      }
    };

    var onSelectionChanged = options.onSelectionChanged !== undefined ? options.onSelectionChanged : function (_) {// No-op
    };
    this._inputManager = new _TextInputManager.TextInputManager({
      control: control,
      onInsert: onInsert,
      onDelete: onDelete
    });
    this._selectionManager = new _CollaborativeSelectionManager.CollaborativeSelectionManager({
      control: control,
      onSelectionChanged: onSelectionChanged
    });
  }
  /**
   * Inserts text into the textarea.
   *
   * @param index The index at which to insert the text.
   * @param value The text to insert.
   */


  _createClass(CollaborativeTextArea, [{
    key: "insertText",
    value: function insertText(index, value) {
      this._inputManager.insertText(index, value);

      this._selectionManager.updateSelectionsOnInsert(index, value);
    }
    /**
     * Deletes text from the textarea.
     * @param index The index at which to remove text.
     * @param length The number of characters to remove.
     */

  }, {
    key: "deleteText",
    value: function deleteText(index, length) {
      this._inputManager.deleteText(index, length);

      this._selectionManager.updateSelectionsOnDelete(index, length);
    }
    /**
     * Sets the entire value of the textarea.
     *
     * @param value The value to set.
     */

  }, {
    key: "setText",
    value: function setText(value) {
      this._inputManager.setText(value);
    }
  }, {
    key: "setTextOnInsertWithSelections",
    value: function setTextOnInsertWithSelections(text, index, value) {
      this._inputManager.setTextOnInsertWithSelections(text, index, value);

      this._selectionManager.updateSelectionsOnInsert(index, value);
    }
  }, {
    key: "setTextOnDeleteWithSelections",
    value: function setTextOnDeleteWithSelections(text, index, length) {
      this._inputManager.setTextOnDeleteWithSelections(text, index, length);

      this._selectionManager.updateSelectionsOnDelete(index, length);
    }
    /**
     * Gets the current text of the textarea.
     */

  }, {
    key: "getText",
    value: function getText() {
      return this._inputManager.getText();
    }
    /**
     * Gets the selection manager that controls local and collaborator
     * selections.
     */

  }, {
    key: "selectionManager",
    value: function selectionManager() {
      return this._selectionManager;
    }
    /**
     * Indicates that the textarea has been resized and the collaboration
     * overlay should be resized to match.
     */

  }, {
    key: "onResize",
    value: function onResize() {
      this._selectionManager.onResize();
    }
  }]);

  return CollaborativeTextArea;
}();

exports.CollaborativeTextArea = CollaborativeTextArea;