import { ISelectionRow } from "./ISelectionRow";
/**
 * Computes the dimensions of the text selection.  Each line in the textarea has its own
 * selection dimensions, which are intended to be used to render a div with the specified
 * position, dimensions and background color.
 *
 * This has only been tested on a textarea, but should be able to be adapted to be used
 * in other HTML form elements.
 *
 * TODO unit test, this is pretty brittle
 */
export declare class SelectionComputer {
    private element;
    private start;
    private end;
    static calculateSelection(element: HTMLTextAreaElement, start: number, end: number): ISelectionRow[];
    private readonly selectionRows;
    private readonly startCoordinates;
    private readonly endCoordinates;
    private readonly lineHeight;
    private readonly elementPaddingLeft;
    private readonly elementPaddingRight;
    private readonly elementPaddingX;
    private constructor();
    private appendSingleLineSelection;
    private buildSingleLineSelection;
    /**
     * Wrapped lines have a more complex computation since we have to create multiple
     * rows.
     *
     * @param startCoordinates
     * @param endCoordinates
     */
    private buildWrappedLineSelections;
    private buildMultiRowSelection;
}
