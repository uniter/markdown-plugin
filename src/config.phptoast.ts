/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import { ASTNodeInterface } from 'parsing';
import ElementListNodeInterface from './AST/Node/ElementListNodeInterface';
import HeadingNodeInterface from './AST/Node/HeadingNodeInterface';

interface RawHeadingNodeInterface extends ASTNodeInterface {
    level: string; // This is captured as a string for the raw node, whereas for the final one we want the count
    elements: ElementListNodeInterface;
}

const inlineCodeStringEscapeReplacements = [
    {
        // Escaped backslash or escaped single backtick should result in just the escaped character
        // All other characters cannot be escaped, the backslash will be left untouched
        pattern: /\\([\\`])/g,
        replacement: '$1',
    },
];

const plainTextStringEscapeReplacements = [
    {
        // Escaped backslash or escaped single symbols should result in just the escaped character
        // All other characters cannot be escaped, the backslash will be left untouched
        pattern: /\\([\\\r\n`$*_}])/g,
        replacement: '$1',
    },
];

export = {
    /*
     * Extensions for the PHP grammar to support the `markdown { ... }` syntax.
     * Note that these rules will be added to the grammar specified by the PHPToAST library.
     *
     * We install this new expression type at the lowest precedence level: see the override
     * of the N_EXPRESSION_LEVEL_0 rule at the bottom of this object literal.
     */
    rules: {
        'N_MARKDOWN_INLINE_CODE': {
            components: [
                {
                    name: 'code',
                    what: /`((?:\\`|[^`])+)`/,
                    captureIndex: 1,
                    replace: inlineCodeStringEscapeReplacements,
                },
            ],
        },
        'N_MARKDOWN_PLAIN_TEXT': {
            components: [
                {
                    name: 'text',
                    what: /(?:\\[\\\r\n`$*_}]|[^\r\n`$*_}])+/i,
                    replace: plainTextStringEscapeReplacements,
                    //what: /(?:[^\r\n`$*_}]|`(?!.*`)|\$[^{_a-z]|([*_])(?!.*\1))+/i,
                    //what: /(?:[^\r\n`$*_}]|`(?!.*`)|\$[^_a-z]|[*_](?=\s))+/i,
                },
            ],
        },
        'N_MARKDOWN_BOLD_ELEMENT': {
            components: {
                oneOf: [
                    [
                        /\*\*/,
                        {
                            name: 'elements',
                            rule: 'N_MARKDOWN_INLINE_ELEMENT_LIST',
                        },
                        /\*\*/,
                    ],
                    [
                        /__/,
                        {
                            name: 'elements',
                            rule: 'N_MARKDOWN_INLINE_ELEMENT_LIST',
                        },
                        /__/,
                    ],
                ],
            },
        },
        'N_MARKDOWN_HEADING_ELEMENT': {
            components: [
                { name: 'level', what: /#+/ },
                /\s*/,
                { name: 'elements', rule: 'N_MARKDOWN_INLINE_ELEMENT_LIST' },
                // Consume the newline at the end if any
                /[\r\n]+|$/,
            ],
            processor: (
                node: RawHeadingNodeInterface
            ): HeadingNodeInterface => {
                return {
                    name: 'N_MARKDOWN_HEADING_ELEMENT',
                    level: node.level.length,
                    elements: node.elements,
                };
            },
        },
        'N_MARKDOWN_ITALIC_ELEMENT': {
            components: {
                oneOf: [
                    [
                        /\*(?!\*)/,
                        {
                            name: 'elements',
                            rule: 'N_MARKDOWN_INLINE_ELEMENT_LIST',
                        },
                        /\*/, // Allow a second asterisk here, for a bold & italic combo (three symbols)
                    ],
                    [
                        /_(?!_)/,
                        {
                            name: 'elements',
                            rule: 'N_MARKDOWN_INLINE_ELEMENT_LIST',
                        },
                        /_/, // Allow a second underscore here, for a bold & italic combo (three symbols)
                    ],
                ],
            },
        },
        'N_MARKDOWN_LIST_ITEM_ELEMENT': {
            components: [
                {
                    name: 'elements',
                    rule: 'N_MARKDOWN_INLINE_ELEMENT_LIST',
                },
            ],
        },
        'N_MARKDOWN_UNORDERED_LIST_ELEMENT': {
            components: [
                {
                    name: 'itemElements',
                    oneOrMoreOf: [
                        /-\s+/,
                        { rule: 'N_MARKDOWN_LIST_ITEM_ELEMENT' },
                        // Consume the newline at the end if any
                        /[\r\n]+|$/,
                    ],
                },
            ],
        },
        'N_MARKDOWN_BLOCK_ELEMENT': {
            components: {
                oneOf: [
                    'N_MARKDOWN_HEADING_ELEMENT',
                    'N_MARKDOWN_UNORDERED_LIST_ELEMENT',
                    'N_MARKDOWN_INLINE_ELEMENT',
                ],
            },
        },
        'N_MARKDOWN_BLOCK_ELEMENT_LIST': {
            captureAs: 'N_MARKDOWN_ELEMENT_LIST',
            components: {
                name: 'elements',
                oneOrMoreOf: 'N_MARKDOWN_BLOCK_ELEMENT',
            },
        },
        'N_MARKDOWN_EXPRESSION_ELEMENT': {
            components: {
                name: 'expression',
                rule: 'N_STRING_INTERPOLATED_EXPRESSION',
            },
        },
        'N_MARKDOWN_INLINE_ELEMENT': {
            components: {
                oneOf: [
                    'N_MARKDOWN_PLAIN_TEXT',
                    'N_MARKDOWN_BOLD_ELEMENT',
                    'N_MARKDOWN_ITALIC_ELEMENT',
                    'N_MARKDOWN_EXPRESSION_ELEMENT',
                    'N_MARKDOWN_INLINE_CODE',
                ],
            },
        },
        'N_MARKDOWN_INLINE_ELEMENT_LIST': {
            captureAs: 'N_MARKDOWN_ELEMENT_LIST',
            components: {
                name: 'elements',
                oneOrMoreOf: 'N_MARKDOWN_INLINE_ELEMENT',
            },
        },
        'N_MARKDOWN_DOCUMENT': {
            components: [
                /markdown/,
                // Allow comments in here
                /{\s*/,
                {
                    name: 'elements',
                    rule: 'N_MARKDOWN_BLOCK_ELEMENT_LIST',
                    ignoreWhitespace: false,
                },
                /\s*}/,
            ],
        },
        'N_EXPRESSION_LEVEL_0': {
            components: {
                // Add the inline Markdown syntax at the lowest precedence level
                oneOf: ['N_MARKDOWN_DOCUMENT', 'N_EXPRESSION_LEVEL_0'],
            },
        },
    },
};
