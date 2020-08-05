/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import ElementNodeInterface from './ElementNodeInterface';

/**
 * Represents an entire Markdown document
 */
export default class DocumentNode implements ElementNodeInterface {
    constructor(private elements: ElementNodeInterface[]) {}

    toHtml(): string {
        return this.elements.map((element) => element.toHtml()).join('');
    }
}

export const factory = (): typeof DocumentNode => {
    return DocumentNode;
};
