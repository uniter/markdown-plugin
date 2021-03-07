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
        evaluate(
            php: string,
            filePath: string
        ): Promise<ValueInterface> | ValueInterface;
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
    // eslint-disable-next-line @typescript-eslint/ban-types
    export type native = boolean | Function | number | string;

    export interface ValueInterface {
        getNative(): native;

        getType(): string;
    }

    export interface FFIResult<T extends ValueInterface | native> {
        getAsync(): Promise<T>;

        getSync(): T;
    }

    export interface ValueHelperInterface {
        toNativeWithSyncApi<T>(proxy: T): T;
    }

    export interface InternalsInterface {
        createFFIResult<T extends ValueInterface | native>(
            getSync: () => ValueInterface | native,
            getAsync: () => Promise<ValueInterface | native>
        ): FFIResult<T>;

        isSyncMode(): boolean;

        valueHelper: ValueHelperInterface;
    }
}
