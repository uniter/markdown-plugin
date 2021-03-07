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

export default class ItalicNode implements ElementNodeInterface {
    constructor(
        private internals: InternalsInterface,
        private elements: ElementNodeInterface[]
    ) {}

    toHtml(): FFIResult<string> {
        const valueHelper = this.internals.valueHelper;

        return this.internals.createFFIResult(
            () => {
                // For both sync and psync modes
                return (
                    '<em>' +
                    this.elements
                        .map((element) =>
                            valueHelper.toNativeWithSyncApi(element)
                        )
                        .map((element) => element.toHtml())
                        .join('') +
                    '</em>'
                );
            },
            () => {
                // Only for async mode
                return Promise.all(
                    this.elements.map((element) => element.toHtml())
                ).then((htmls) => {
                    return '<em>' + htmls.join('') + '</em>';
                });
            }
        );
    }
}

export const factory = (internals: InternalsInterface): unknown => {
    return class ModeSpecificItalicNode extends ItalicNode {
        constructor(elements: ElementNodeInterface[]) {
            super(internals, elements);
        }
    };
};
