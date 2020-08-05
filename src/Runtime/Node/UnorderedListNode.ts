/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import ElementNodeInterface from './ElementNodeInterface';
import ListItemNode from './ListItemNode';

export default class UnorderedListNode implements ElementNodeInterface {
    constructor(private listItemNodes: ListItemNode[]) {}

    toHtml(): string {
        return (
            '<ul>' +
            this.listItemNodes
                .map((listItemNode) => listItemNode.toHtml())
                .join('') +
            '</ul>'
        );
    }
}

export const factory = (): typeof UnorderedListNode => {
    return UnorderedListNode;
};
