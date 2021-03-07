/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import ElementNodeInterface from './ElementNodeInterface';
import { FFIResult, InternalsInterface } from 'phpcore';

/**
 * Represents an entire Markdown document
 */
export default class DocumentNode implements ElementNodeInterface {
    constructor(
        private internals: InternalsInterface,
        private elements: ElementNodeInterface[]
    ) {}

    toHtml(): FFIResult<string> {
        const valueHelper = this.internals.valueHelper;

        return this.internals.createFFIResult(
            () => {
                // For both sync and psync modes
                return this.elements
                    .map((element) => valueHelper.toNativeWithSyncApi(element)) // checks a ProxyClass instance was passed in
                    .map((element) => element.toHtml())
                    .join('');
            },
            () => {
                // Only for async mode
                return Promise.all(
                    this.elements.map((element) => element.toHtml())
                ).then((htmls) => {
                    return htmls.join('');
                });
            }
        );
    }
}

export const factory = (internals: InternalsInterface): unknown => {
    return class ModeSpecificDocumentNode extends DocumentNode {
        constructor(elements: ElementNodeInterface[]) {
            super(internals, elements);
        }
    };
};
