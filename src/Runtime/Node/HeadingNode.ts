/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import ElementNodeInterface from './ElementNodeInterface';

export default class HeadingNode implements ElementNodeInterface {
    constructor(
        private level: number,
        private elements: ElementNodeInterface[]
    ) {}

    toHtml(): string {
        const tagName = 'h' + this.level;

        return (
            `<${tagName}>` +
            this.elements.map((element) => element.toHtml()).join('') +
            `</${tagName}>`
        );
    }
}

export const factory = (): typeof HeadingNode => {
    return HeadingNode;
};
