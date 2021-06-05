/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the HTML Text Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
import { CollaborativeSelectionManager } from "./CollaborativeSelectionManager";
import { TextInputManager } from "./TextInputManager";
/**
 * Adapts a plain HTMLTextAreaElement to add collaborative editing
 * capabilities. This class will add an overlay HTMLDivElement on
 * top of the HTMLTextAreaElement to render cursors and selection
 * of collaborators. This class also adds convenience API to
 * mutate the text area value and to get events / callbacks when
 * the value is changed by the user. Mutation methods and mutation
 * events are granular describing exactly how the value was changed.
 */
export class CollaborativeTextArea {
    /**
     * Creates a new [[CollaborativeTextArea]].
     *
     * @param options The options to configure this instance.
     */
    constructor(options) {
        if (!options) {
            throw new Error("options must be defined.");
        }
        if (!options.control) {
            throw new Error("options.control must be defined.");
        }
        const control = options.control;
        const insertCallback = options.onInsert;
        const deleteCallback = options.onDelete;
        const onInsert = (index, value) => {
            this._selectionManager.updateSelectionsOnInsert(index, value);
            if (insertCallback) {
                insertCallback(index, value);
            }
        };
        const onDelete = (index, length) => {
            this._selectionManager.updateSelectionsOnDelete(index, length);
            if (deleteCallback) {
                deleteCallback(index, length);
            }
        };
        const onSelectionChanged = options.onSelectionChanged !== undefined ?
            options.onSelectionChanged : (_) => {
            // No-op
        };
        this._inputManager = new TextInputManager({ control, onInsert, onDelete });
        this._selectionManager = new CollaborativeSelectionManager({ control, onSelectionChanged });
    }
    /**
     * Inserts text into the textarea.
     *
     * @param index The index at which to insert the text.
     * @param value The text to insert.
     */
    insertText(index, value) {
        this._inputManager.insertText(index, value);
        this._selectionManager.updateSelectionsOnInsert(index, value);
    }
    /**
     * Deletes text from the textarea.
     * @param index The index at which to remove text.
     * @param length The number of characters to remove.
     */
    deleteText(index, length) {
        this._inputManager.deleteText(index, length);
        this._selectionManager.updateSelectionsOnDelete(index, length);
    }
    /**
     * Sets the entire value of the textarea.
     *
     * @param value The value to set.
     */
    setText(value) {
        this._inputManager.setText(value);
    }
    setTextOnInsertWithSelections(text, index, value) {
        this._inputManager.setTextOnInsertWithSelections(text, index, value);
        this._selectionManager.updateSelectionsOnInsert(index, value);
    }
    setTextOnDeleteWithSelections(text, index, length) {
        this._inputManager.setTextOnDeleteWithSelections(text, index, length);
        this._selectionManager.updateSelectionsOnDelete(index, length);
    }
    /**
     * Gets the current text of the textarea.
     */
    getText() {
        return this._inputManager.getText();
    }
    /**
     * Gets the selection manager that controls local and collaborator
     * selections.
     */
    selectionManager() {
        return this._selectionManager;
    }
    /**
     * Indicates that the textarea has been resized and the collaboration
     * overlay should be resized to match.
     */
    onResize() {
        this._selectionManager.onResize();
    }
}
