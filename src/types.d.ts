/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

/*
 * Defines types for the various related Uniter sub-libraries.
 *
 * TODO: Declare these types within each library (and potentially port them all to TypeScript eventually!)
 */

declare module 'dotphp' {
    import type { ValueInterface } from 'phpcore';

    export interface DotPHPFactoryInterface {
        create(contextDirectory: string): DotPHPInterface;
    }

    export interface DotPHPInterface {
        evaluateSync(php: string, filePath: string): ValueInterface;
    }
}

declare module 'parsing' {
    import { SourceNode } from 'source-map';

    export interface ASTNodeInterface {
        name: string;
    }

    export interface ContextDataInterface {
        getValue: boolean;
    }

    type Chunks = Array<SourceNode | string | Chunks>;

    export interface ContextInterface extends ContextDataInterface {
        createExpressionSourceNode(
            chunks: Chunks,
            node: ASTNodeInterface,
            name?: string
        ): SourceNode;

        createStatementSourceNode(
            chunks: Chunks,
            node: ASTNodeInterface,
            name?: string
        ): SourceNode;
    }

    export type interpret = (
        node: ASTNodeInterface,
        newData?: ContextDataInterface
    ) => SourceNode;
}

declare module 'phpcore' {
    export interface ValueInterface {
        getNative(): boolean | Function | number | string;

        getType(): string;
    }
}
