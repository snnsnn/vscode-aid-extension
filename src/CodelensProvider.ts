import { CancellationToken, CodeLens, CodeLensProvider, Event, EventEmitter, TextDocument, window } from 'vscode';

export class CodelensProvider implements CodeLensProvider {
  private codeLenses: Array<CodeLens> = [];
  private _onDidChangeCodeLenses: EventEmitter<void> = new EventEmitter<void>();
  public readonly onDidChangeCodeLenses: Event<void> = this._onDidChangeCodeLenses.event;

  public constructor() {
    window.onDidChangeTextEditorSelection(() => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  public provideCodeLenses(document: TextDocument, token: CancellationToken): CodeLens[] | Thenable<CodeLens[]> {
    this.codeLenses = [];
    const editor = window.activeTextEditor;
    if (!editor) {
      return this.codeLenses;
    }
    const { line } = editor.selection.active;
    const { range } = editor.document.lineAt(line);
    this.codeLenses.push(new CodeLens(range));
    return this.codeLenses;
  }

  public resolveCodeLens(codeLens: CodeLens, _token: CancellationToken) {
    const editor = window.activeTextEditor;
    if (!editor) return;
    const { line, character } = editor.selection.active;
    codeLens.command = {
      title: `line is ${line} and character is ${character}`,
      tooltip: "Tooltip provided by sample extension",
      command: "aid.add",
    };
    return codeLens;
  }
}

