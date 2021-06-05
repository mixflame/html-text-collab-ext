/**
 * A selection range describe in the linear index address space of
 * the text in the textarea.
 */
export interface ISelectionRange {
    /**
     * The index of the anchor of the selection.
     */
    anchor: number;
    /**
     * The index of the target of the selection. This is
     * where the cursor will be.
     */
    target: number;
}
