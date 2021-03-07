/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import { factory as BoldNode } from './Runtime/Node/BoldNode';
import { factory as DocumentNode } from './Runtime/Node/DocumentNode';
import { factory as ExpressionNode } from './Runtime/Node/ExpressionNode';
import { factory as HeadingNode } from './Runtime/Node/HeadingNode';
import { factory as InlineCodeNode } from './Runtime/Node/InlineCodeNode';
import { factory as ItalicNode } from './Runtime/Node/ItalicNode';
import { factory as ListItemNode } from './Runtime/Node/ListItemNode';
import { factory as PlainTextNode } from './Runtime/Node/PlainTextNode';
import { factory as UnorderedListNode } from './Runtime/Node/UnorderedListNode';

export = {
    addons: [
        {
            // Expose all the classes that will be instantiated to represent the nodes
            // of the Markdown document to PHP-land:
            classGroups: (): Record<string, unknown> => {
                return {
                    'Uniter\\Markdown\\Node\\BoldNode': BoldNode as unknown,
                    'Uniter\\Markdown\\Node\\DocumentNode': DocumentNode as unknown,
                    'Uniter\\Markdown\\Node\\ExpressionNode': ExpressionNode as unknown,
                    'Uniter\\Markdown\\Node\\HeadingNode': HeadingNode as unknown,
                    'Uniter\\Markdown\\Node\\InlineCodeNode': InlineCodeNode as unknown,
                    'Uniter\\Markdown\\Node\\ItalicNode': ItalicNode as unknown,
                    'Uniter\\Markdown\\Node\\ListItemNode': ListItemNode as unknown,
                    'Uniter\\Markdown\\Node\\PlainTextNode': PlainTextNode as unknown,
                    'Uniter\\Markdown\\Node\\UnorderedListNode': UnorderedListNode as unknown,
                };
            },
        },
    ],
};
