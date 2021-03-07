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
import { FFIResult, InternalsInterface } from 'phpcore';

export default class UnorderedListNode implements ElementNodeInterface {
    constructor(
        private internals: InternalsInterface,
        private listItemNodes: ListItemNode[]
    ) {}

    toHtml(): FFIResult<string> {
        const valueHelper = this.internals.valueHelper;

        return this.internals.createFFIResult(
            () => {
                // For both sync and psync modes
                return (
                    '<ul>' +
                    this.listItemNodes
                        .map((element) =>
                            valueHelper.toNativeWithSyncApi(element)
                        )
                        .map((element) => element.toHtml())
                        .join('') +
                    '</ul>'
                );
            },
            () => {
                // Only for async mode
                return Promise.all(
                    this.listItemNodes.map((element) => element.toHtml())
                ).then((htmls) => {
                    return '<ul>' + htmls.join('') + '</ul>';
                });
            }
        );
    }
}

export const factory = (internals: InternalsInterface): unknown => {
    return class ModeSpecificUnorderedListNode extends UnorderedListNode {
        constructor(listItemNodes: ListItemNode[]) {
            super(internals, listItemNodes);
        }
    };
};
