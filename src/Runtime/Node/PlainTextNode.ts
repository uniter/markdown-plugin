/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import ElementNodeInterface from './ElementNodeInterface';

export default class PlainTextNode implements ElementNodeInterface {
    constructor(private text: string) {}

    toHtml(): string {
        return this.text;
    }
}

export const factory = (): typeof PlainTextNode => {
    return PlainTextNode;
};
