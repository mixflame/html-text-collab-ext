import { ITextInputManagerOptions } from "./ITextInputManagerOptions";
export declare class TextInputManager {
    private readonly _control;
    private readonly _onLocalInsert;
    private readonly _onLocalDelete;
    private _changeDetector;
    /**
     *
     * @param options
     */
    constructor(options: ITextInputManagerOptions);
    bind(): void;
    unbind(): void;
    insertText(index: number, value: string): void;
    deleteText(index: number, length: number): void;
    setText(value: string): void;
    setTextOnInsertWithSelections(text: string, index: number, value: string): void;
    setTextOnDeleteWithSelections(text: string, index: number, length: number): void;
    getText(): string;
    private _updateControl;
    private _onLocalInput;
    private _assertBound;
    private _getSelection;
    private _setTextSelection;
}
