/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import ElementNodeInterface from './ElementNodeInterface';

export default class ItalicNode implements ElementNodeInterface {
    constructor(private elements: ElementNodeInterface[]) {}

    toHtml(): string {
        return (
            '<em>' +
            this.elements.map((element) => element.toHtml()).join('') +
            '</em>'
        );
    }
}

export const factory = (): typeof ItalicNode => {
    return ItalicNode;
};
