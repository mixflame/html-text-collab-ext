import { CollaborativeSelectionManager } from "./CollaborativeSelectionManager";
import { ICollaborativeTextAreaOptions } from "./ICollaboratieTextAreaOptions";
/**
 * Adapts a plain HTMLTextAreaElement to add collaborative editing
 * capabilities. This class will add an overlay HTMLDivElement on
 * top of the HTMLTextAreaElement to render cursors and selection
 * of collaborators. This class also adds convenience API to
 * mutate the text area value and to get events / callbacks when
 * the value is changed by the user. Mutation methods and mutation
 * events are granular describing exactly how the value was changed.
 */
export declare class CollaborativeTextArea {
    private readonly _selectionManager;
    private readonly _inputManager;
    /**
     * Creates a new [[CollaborativeTextArea]].
     *
     * @param options The options to configure this instance.
     */
    constructor(options: ICollaborativeTextAreaOptions);
    /**
     * Inserts text into the textarea.
     *
     * @param index The index at which to insert the text.
     * @param value The text to insert.
     */
    insertText(index: number, value: string): void;
    /**
     * Deletes text from the textarea.
     * @param index The index at which to remove text.
     * @param length The number of characters to remove.
     */
    deleteText(index: number, length: number): void;
    /**
     * Sets the entire value of the textarea.
     *
     * @param value The value to set.
     */
    setText(value: string): void;
    setTextOnInsertWithSelections(text: string, index: number, value: string): void;
    setTextOnDeleteWithSelections(text: string, index: number, length: number): void;
    /**
     * Gets the current text of the textarea.
     */
    getText(): string;
    /**
     * Gets the selection manager that controls local and collaborator
     * selections.
     */
    selectionManager(): CollaborativeSelectionManager;
    /**
     * Indicates that the textarea has been resized and the collaboration
     * overlay should be resized to match.
     */
    onResize(): void;
}
