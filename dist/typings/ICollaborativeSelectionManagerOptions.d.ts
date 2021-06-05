import { ISelectionCallback } from "./CollaborativeSelectionManager";
export interface ICollaborativeSelectionManagerOptions {
    control: HTMLTextAreaElement;
    onSelectionChanged: ISelectionCallback;
}
