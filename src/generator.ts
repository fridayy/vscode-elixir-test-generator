import { TextDocument, version, window } from "vscode";
import * as fs from "fs";
import { template } from "./testTemplate";

export class DefaultGenerator {

    public generateTest(document: TextDocument) {
        if (!this.isElixirSourceFile(document)) {
            window.showErrorMessage(`${document.fileName} is not an elixir file`);
        } else {
            const moduleName = this.toModuleName(document)
            window.showInformationMessage(`moduleName: ${moduleName}`);
            this.writeTestFile(document)
        }
    }

    private writeTestFile(document: TextDocument) {
        const moduleName = this.toModuleName(document)
        const testFilePath = document.fileName.split("/")
            .reverse()
            .slice(1)
            .reverse()
            .map(s => {
                if (s === "lib") {
                    return "test";
                }
                return s;
            }).reduce((acc, curr) => acc + "/" + curr);

        const path = `${testFilePath}/${moduleName}_test.exs`;
        window.showInformationMessage(`writing to: ${testFilePath}/${moduleName}_test.exs`);

        fs.writeFile(path, template(moduleName), (err) => {
            if (err) {
                window.showErrorMessage(`could not write to ${path}: ${err.message}`);
            }
            window.showInformationMessage(`done (${path})`);
        });
    }

    private isElixirSourceFile(document: TextDocument): boolean {
        return document.languageId === "elixir" || document.fileName.endsWith(".ex");
    }

    private toModuleName(document: TextDocument): string {
        return document.fileName.split("/")
            .filter(v => this.search(".+\.(ex)", v))
        [0].split(".")[0];
    }

    private search(match: string, str: string) {
        const result = str.search(match);
        if (result === -1) {
            return false;
        }
        return true;
    }
}