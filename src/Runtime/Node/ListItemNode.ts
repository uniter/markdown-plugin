/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import ElementNodeInterface from './ElementNodeInterface';

export default class ListItemNode implements ElementNodeInterface {
    constructor(private elements: ElementNodeInterface[]) {}

    toHtml(): string {
        return (
            '<li>' +
            this.elements.map((element) => element.toHtml()).join('') +
            '</li>'
        );
    }
}

export const factory = (): typeof ListItemNode => {
    return ListItemNode;
};
