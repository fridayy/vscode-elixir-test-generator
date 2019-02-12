// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { EXTENSION_COMMAND } from './metadata';
import { DefaultGenerator } from './generator';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(EXTENSION_COMMAND, () => {
		const generator = new DefaultGenerator();
		const currentTextEditor = vscode.window.visibleTextEditors[0];

		generator.generateTest(currentTextEditor.document);
		
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
