/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import ElementNodeInterface from './ElementNodeInterface';

export default class InlineCodeNode implements ElementNodeInterface {
    constructor(private code: string) {}

    toHtml(): string {
        return '<code>' + this.code + '</code>';
    }
}

export const factory = (): typeof InlineCodeNode => {
    return InlineCodeNode;
};
