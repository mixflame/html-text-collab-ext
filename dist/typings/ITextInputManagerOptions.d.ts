export interface ITextInputManagerOptions {
    control: HTMLTextAreaElement;
    onInsert: (index: number, value: string) => void;
    onDelete: (index: number, length: number) => void;
}
