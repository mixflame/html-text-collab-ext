import { ISelectionRange } from "./ISelectionRange";
import { CollaboratorSelection } from "./CollaboratorSelection";
import { ICollaborativeSelectionManagerOptions } from "./ICollaborativeSelectionManagerOptions";
export declare type ISelectionCallback = (selection: ISelectionRange) => void;
/**
 * The CollaborativeSelectionManager controls the monitoring of local selection
 * / cursor positions and renders selections / cursors of collaborators. This
 * class will add an overlay to the DOM on top of the textarea to render
 * collaborators selections.
 */
export declare class CollaborativeSelectionManager {
    private readonly _collaborators;
    private readonly _textElement;
    private readonly _overlayContainer;
    private readonly _scroller;
    private readonly _onSelection;
    private _selectionAnchor;
    private _selectionTarget;
    /**
     * Creates a new [[CollaborativeSelectionManager]].
     *
     * @param options The options that configure this instance.
     */
    constructor(options: ICollaborativeSelectionManagerOptions);
    /**
     * Adds a remote collaborator to the textarea so that their cursor /
     * selection can be rendered.
     *
     * @param id A unique identifier for this collaborator.
     * @param label A text label to render over the cursor.
     * @param color The color to use for the cursor and selection.
     * @param selection The initial selection to render, if desired.
     *
     * @returns A [[CollaboratorSelection]] that can be used to control
     *   the selection / cursor for this collaborator
     */
    addCollaborator(id: string, label: string, color: string, selection?: ISelectionRange): CollaboratorSelection;
    /**
     * Get the [[CollaboratorSelection]] for the specified collaborator.
     *
     * @param id The id of the collaborator to get the selection of.
     *
     * returns A [[CollaboratorSelection]] that can be used to control
     *   the selection / cursor for this collaborator
     */
    getCollaborator(id: string): CollaboratorSelection;
    /**
     *
     * @param id The id of the collaborator to remove.
     */
    removeCollaborator(id: string): void;
    /**
     * Gets the local users selection.
     */
    getSelection(): ISelectionRange;
    /**
     * Shows collaborators selections, if hidden.
     */
    show(): void;
    /**
     * Hides the collaborators selections, if shown.
     */
    hide(): void;
    /**
     * Removes the collaborator selection rendering from the DOM.
     */
    dispose(): void;
    /**
     * Indicates that the textarea has been resized and the collaboration
     * overlay should be resized to match.
     */
    onResize(): void;
    updateSelectionsOnInsert(index: number, value: string): void;
    updateSelectionsOnDelete(index: number, length: number): void;
    private _checkSelection;
    private _onMouseMove;
    private _checkResize;
    private _updateScroller;
}
