/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import ElementNodeInterface from './ElementNodeInterface';

export default class ExpressionNode implements ElementNodeInterface {
    constructor(private expression: unknown) {}

    toHtml(): string {
        if (
            typeof this.expression !== 'string' &&
            typeof this.expression !== 'number'
        ) {
            throw new Error(
                `Expression is of unknown type: ${typeof this.expression}`
            );
        }

        return String(this.expression);
    }
}

export const factory = (): typeof ExpressionNode => {
    return ExpressionNode;
};
