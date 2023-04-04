import * as vscode from "vscode";
import { wrapTextInFragment } from "./wrap-in-fragment";

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.registerCommand("extension.wrapInFragment.run", () => {
    run();
  });
}

export function run() {
  const editor = vscode.window.activeTextEditor;

  const configuration = vscode.workspace.getConfiguration("changeCase");
  const fragmentFactory = configuration
    ? configuration.get("fragmentFactory", "")
    : "";

  const { document, selections } = editor;

  let replacementActions: Array<{
    selection: vscode.Selection;
    replacement: string;
    newSelection: vscode.Selection;
  }> = [];

  editor
    .edit((editBuilder) => {
      replacementActions = selections.map((selection) => {
        const initialText = document.getText(selection);

        const replacement = wrapTextInFragment(initialText, fragmentFactory);
        // We always add a balanced amount of chars +1 to the right (because of the closing tag)
        const offset = (replacement.length - initialText.length - 1) / 2;

        return {
          selection,
          replacement,
          newSelection: new vscode.Selection(
            selection.start.line,
            selection.start.character + offset,
            selection.end.line,
            selection.end.character + offset
          ),
        };
      });

      replacementActions.forEach((x) => {
        editBuilder.replace(x.selection, x.replacement);
      });
    })
    .then(() => {
      editor.selections = replacementActions.map(
        ({ newSelection }) => newSelection
      );
    });
}
