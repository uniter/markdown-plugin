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

export default class HeadingNode implements ElementNodeInterface {
    constructor(
        private internals: InternalsInterface,
        private level: number,
        private elements: ElementNodeInterface[]
    ) {}

    toHtml(): FFIResult<string> {
        const valueHelper = this.internals.valueHelper;
        const tagName = 'h' + this.level;

        return this.internals.createFFIResult(
            () => {
                // For both sync and psync modes
                return (
                    `<${tagName}>` +
                    this.elements
                        .map((element) =>
                            valueHelper.toNativeWithSyncApi(element)
                        )
                        .map((element) => element.toHtml())
                        .join('') +
                    `</${tagName}>`
                );
            },
            () => {
                // Only for async mode
                return Promise.all(
                    this.elements.map((element) => element.toHtml())
                ).then((htmls) => {
                    return `<${tagName}>` + htmls.join('') + `</${tagName}>`;
                });
            }
        );
    }
}

export const factory = (internals: InternalsInterface): unknown => {
    return class ModeSpecificHeadingNode extends HeadingNode {
        constructor(level: number, elements: ElementNodeInterface[]) {
            super(internals, level, elements);
        }
    };
};
