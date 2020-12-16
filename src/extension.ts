import { commands, ExtensionContext, languages } from 'vscode';
import { CodelensProvider } from './CodelensProvider';
import { add, remove, removeAll, removeOthers, toggle, toggleAll, toggleOthers } from './commands';

export async function activate(context: ExtensionContext) {
  const codelensProvider = new CodelensProvider();
  languages.registerCodeLensProvider("*", codelensProvider);

  context.subscriptions.push(commands.registerCommand('aid.add', add));
  context.subscriptions.push(commands.registerCommand('aid.remove', remove));
  context.subscriptions.push(commands.registerCommand('aid.removeOthers', removeOthers));
  context.subscriptions.push(commands.registerCommand('aid.removeAll', removeAll));
  context.subscriptions.push(commands.registerCommand('aid.toggle', toggle));
  context.subscriptions.push(commands.registerCommand('aid.toggleOthers', toggleOthers));
  context.subscriptions.push(commands.registerCommand('aid.toggleAll', toggleAll));
}

export function deactivate() { }