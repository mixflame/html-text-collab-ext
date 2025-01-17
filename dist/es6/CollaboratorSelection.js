/*
 * Copyright (c) 2019 Convergence Labs, Inc.
 *
 * This file is part of the HTML Text Collaborative Extensions, which is
 * released under the terms of the MIT license. A copy of the MIT license
 * is usually provided as part of this source code package in the LICENCE
 * file. If it was not, please see <https://opensource.org/licenses/MIT>
 */
import { SelectionComputer } from "./SelectionComputer";
// @ts-ignore
import getCaretCoordinates from "textarea-caret";
/**
 * This class represents a specific collaborators selection and controls
 * the rendering of the remote cursor / selection.
 */
export class CollaboratorSelection {
    constructor(textInput, overlayContainer, color, label, options) {
        this._label = label;
        this._textInput = textInput;
        this._color = color;
        this._cursor = null;
        this._selection = null;
        this._rows = [];
        this._container = overlayContainer;
        options = options || {};
        this._margin = options.margin || 5;
        this._tooltipTimeout = null;
        this._cursorElement = this._container.ownerDocument.createElement("div");
        this._cursorElement.className = "collaborator-cursor";
        this._cursorElement.style.backgroundColor = this._color;
        this._tooltipElement = this._container.ownerDocument.createElement("div");
        this._tooltipElement.innerHTML = label;
        this._tooltipElement.className = "collaborator-cursor-tooltip";
        this._tooltipElement.style.backgroundColor = this._color;
        this.hideCursorTooltip();
        this.refresh();
    }
    showSelection() {
        this._rows.forEach(row => {
            row.element.style.visibility = "visible";
        });
    }
    hideSelection() {
        this._rows.forEach(row => {
            row.element.style.visibility = "hidden";
        });
    }
    showCursor() {
        this._cursorElement.style.visibility = "visible";
    }
    hideCursor() {
        this._cursorElement.style.visibility = "hidden";
    }
    showCursorToolTip() {
        this._clearToolTipTimeout();
        this._tooltipElement.style.opacity = "1";
    }
    flashCursorToolTip(duration) {
        this.showCursorToolTip();
        this._clearToolTipTimeout();
        this._tooltipTimeout = setTimeout(() => this.hideCursorTooltip(), duration * 1000);
    }
    hideCursorTooltip() {
        this._clearToolTipTimeout();
        this._tooltipElement.style.opacity = "0";
    }
    _clearToolTipTimeout() {
        if (this._tooltipTimeout !== null) {
            clearTimeout(this._tooltipTimeout);
            this._tooltipTimeout = null;
        }
    }
    setColor(color) {
        this._color = color;
        this._rows.forEach(row => {
            row.element.style.background = this._color;
        });
        this._cursorElement.style.background = this._color;
        this._tooltipElement.style.background = this._color;
    }
    setSelection(selection) {
        if (selection === null) {
            this._cursor = null;
            this._selection = null;
        }
        else {
            this._cursor = selection.target;
            this._selection = Object.assign({}, selection);
        }
        this.refresh();
    }
    getSelection() {
        return Object.assign({}, this._selection);
    }
    clearSelection() {
        this.setSelection(null);
    }
    refresh() {
        this._updateCursor();
        this._updateSelection();
    }
    _updateCursor() {
        if (this._cursor === null && this._container.contains(this._cursorElement)) {
            this._container.removeChild(this._cursorElement);
            this._container.removeChild(this._tooltipElement);
        }
        else {
            if (!this._cursorElement.parentElement) {
                this._container.append(this._cursorElement);
                this._container.append(this._tooltipElement);
            }
            const cursorCoords = getCaretCoordinates(this._textInput, this._cursor);
            this._cursorElement.style.height = cursorCoords.height + "px";
            this._cursorElement.style.top = cursorCoords.top + "px";
            const cursorLeft = (cursorCoords.left - this._cursorElement.offsetWidth / 2);
            this._cursorElement.style.left = cursorLeft + "px";
            let toolTipTop = cursorCoords.top - this._tooltipElement.offsetHeight;
            if (toolTipTop + this._container.offsetTop < this._margin) {
                toolTipTop = cursorCoords.top + cursorCoords.height;
            }
            let toolTipLeft = cursorLeft;
            if (toolTipLeft + this._tooltipElement.offsetWidth > this._container.offsetWidth - this._margin) {
                toolTipLeft = cursorLeft + this._cursorElement.offsetWidth - this._tooltipElement.offsetWidth;
            }
            this._tooltipElement.style.top = toolTipTop + "px";
            this._tooltipElement.style.left = toolTipLeft + "px";
        }
    }
    _updateSelection() {
        if (this._selection === null) {
            this._rows.forEach(row => row.element.parentElement.removeChild(row.element));
            this._rows.splice(0, this._rows.length);
        }
        else {
            let start;
            let end;
            if (this._selection.anchor > this._selection.target) {
                start = Number(this._selection.target);
                end = Number(this._selection.anchor);
            }
            else {
                start = Number(this._selection.anchor);
                end = Number(this._selection.target);
            }
            const newRows = SelectionComputer.calculateSelection(this._textInput, start, end);
            // Adjust size of rows as needed
            const delta = newRows.length - this._rows.length;
            if (delta > 0) {
                if (this._rows.length === 0 || this._rowsEqual(newRows[0], this._rows[0].rowData)) {
                    this._addNewRows(delta, true);
                }
                else {
                    this._addNewRows(delta, false);
                }
            }
            else if (delta < 0) {
                let removed = null;
                if (this._rowsEqual(newRows[0], this._rows[0].rowData)) {
                    // Take from the target.
                    removed = this._rows.splice(this._rows.length - 1 + delta, delta * -1);
                }
                else {
                    removed = this._rows.splice(0, delta * -1);
                }
                removed.forEach(row => row.element.parentElement.removeChild(row.element));
            }
            // Now compare each row and see if we need an update.
            newRows.forEach((newRowData, index) => {
                const row = this._rows[index];
                this._updateRow(newRowData, row);
            });
        }
    }
    _addNewRows(count, append) {
        for (let i = 0; i < count; i++) {
            const element = this._container.ownerDocument.createElement("div");
            element.style.position = "absolute";
            element.style.backgroundColor = this._color;
            element.style.opacity = "0.25";
            this._container.append(element);
            const rowData = { height: 0, width: 0, top: 0, left: 0 };
            const newRow = {
                element,
                rowData
            };
            if (append) {
                this._rows.push(newRow);
            }
            else {
                this._rows.unshift(newRow);
            }
        }
    }
    _rowsEqual(a, b) {
        return a.height === b.height &&
            a.width === b.width &&
            a.top === b.top &&
            a.left === b.left;
    }
    _updateRow(newRowData, row) {
        if (newRowData.height !== row.rowData.height) {
            row.rowData.height = newRowData.height;
            row.element.style.height = `${newRowData.height}px`;
        }
        if (newRowData.width !== row.rowData.width) {
            row.rowData.width = newRowData.width;
            row.element.style.width = `${newRowData.width}px`;
        }
        if (newRowData.top !== row.rowData.top) {
            row.rowData.top = newRowData.top;
            row.element.style.top = `${newRowData.top}px`;
        }
        if (newRowData.left !== row.rowData.left) {
            row.rowData.left = newRowData.left;
            row.element.style.left = `${newRowData.left}px`;
        }
    }
}
