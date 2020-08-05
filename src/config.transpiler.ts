/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import { ContextInterface, interpret as interpretType } from 'parsing';
import { SourceNode } from 'source-map';
import BoldNodeInterface from './AST/Node/BoldNodeInterface';
import DocumentNodeInterface from './AST/Node/DocumentNodeInterface';
import ElementNodeInterface from './AST/Node/ElementNodeInterface';
import ExpressionNodeInterface from './AST/Node/ExpressionNodeInterface';
import HeadingNodeInterface from './AST/Node/HeadingNodeInterface';
import InlineCodeNodeInterface from './AST/Node/InlineCodeNodeInterface';
import ItalicNodeInterface from './AST/Node/ItalicNodeInterface';
import ListItemNodeInterface from './AST/Node/ListItemNodeInterface';
import PlainTextNodeInterface from './AST/Node/PlainTextNodeInterface';
import UnorderedListNodeInterface from './AST/Node/UnorderedListNodeInterface';

function interpretElementList(
    elements: ElementNodeInterface[],
    interpret: interpretType
): (SourceNode | string)[] {
    return elements.reduce(
        (
            accumulator: (SourceNode | string)[],
            elementNode: ElementNodeInterface
        ) => {
            const elementChunks = interpret(elementNode, {
                getValue: true,
            });

            if (accumulator.length > 0) {
                // Insert a comma between each element
                return [...accumulator, ',', elementChunks];
            }

            return [elementChunks];
        },
        []
    );
}

export = {
    nodes: {
        'N_MARKDOWN_BOLD_ELEMENT': (
            node: BoldNodeInterface,
            interpret: interpretType,
            context: ContextInterface
        ): SourceNode => {
            const elementChunks = interpretElementList(
                node.elements.elements,
                interpret
            );

            return context.createExpressionSourceNode(
                [
                    'tools.createInstance(namespaceScope, tools.valueFactory.createString("Uniter\\\\Markdown\\\\Node\\\\BoldNode"), [',
                    'tools.valueFactory.createArray([',
                    elementChunks,
                    '])',
                    '])',
                ],
                node
            );
        },

        'N_MARKDOWN_DOCUMENT': (
            node: DocumentNodeInterface,
            interpret: interpretType,
            context: ContextInterface
        ): SourceNode => {
            const elementChunks = interpretElementList(
                node.elements.elements,
                interpret
            );

            return context.createExpressionSourceNode(
                [
                    'tools.createInstance(namespaceScope, tools.valueFactory.createString("Uniter\\\\Markdown\\\\Node\\\\DocumentNode"), [',
                    'tools.valueFactory.createArray([',
                    elementChunks,
                    '])',
                    '])',
                ],
                node
            );
        },

        'N_MARKDOWN_EXPRESSION_ELEMENT': (
            node: ExpressionNodeInterface,
            interpret: interpretType,
            context: ContextInterface
        ): SourceNode => {
            const expressionChunks = interpret(node.expression);

            return context.createExpressionSourceNode(
                [
                    'tools.createInstance(namespaceScope, tools.valueFactory.createString("Uniter\\\\Markdown\\\\Node\\\\ExpressionNode"), [',
                    expressionChunks,
                    '])',
                ],
                node
            );
        },

        'N_MARKDOWN_HEADING_ELEMENT': (
            node: HeadingNodeInterface,
            interpret: interpretType,
            context: ContextInterface
        ): SourceNode => {
            const elementChunks = interpretElementList(
                node.elements.elements,
                interpret
            );

            return context.createExpressionSourceNode(
                [
                    'tools.createInstance(namespaceScope, tools.valueFactory.createString("Uniter\\\\Markdown\\\\Node\\\\HeadingNode"), [',
                    `tools.valueFactory.createInteger(${node.level}),`,
                    'tools.valueFactory.createArray([',
                    elementChunks,
                    '])',
                    '])',
                ],
                node
            );
        },

        'N_MARKDOWN_INLINE_CODE': (
            node: InlineCodeNodeInterface,
            interpret: interpretType,
            context: ContextInterface
        ): SourceNode => {
            return context.createExpressionSourceNode(
                [
                    'tools.createInstance(namespaceScope, tools.valueFactory.createString("Uniter\\\\Markdown\\\\Node\\\\InlineCodeNode"), [',
                    `tools.valueFactory.createString(${JSON.stringify(
                        node.code
                    )})`,
                    '])',
                ],
                node
            );
        },

        'N_MARKDOWN_ITALIC_ELEMENT': (
            node: ItalicNodeInterface,
            interpret: interpretType,
            context: ContextInterface
        ): SourceNode => {
            const elementChunks = interpretElementList(
                node.elements.elements,
                interpret
            );

            return context.createExpressionSourceNode(
                [
                    'tools.createInstance(namespaceScope, tools.valueFactory.createString("Uniter\\\\Markdown\\\\Node\\\\ItalicNode"), [',
                    'tools.valueFactory.createArray([',
                    elementChunks,
                    '])',
                    '])',
                ],
                node
            );
        },

        'N_MARKDOWN_LIST_ITEM_ELEMENT': (
            node: ListItemNodeInterface,
            interpret: interpretType,
            context: ContextInterface
        ): SourceNode => {
            const elementChunks = interpretElementList(
                node.elements.elements,
                interpret
            );

            return context.createExpressionSourceNode(
                [
                    'tools.createInstance(namespaceScope, tools.valueFactory.createString("Uniter\\\\Markdown\\\\Node\\\\ListItemNode"), [',
                    'tools.valueFactory.createArray([',
                    elementChunks,
                    '])',
                    '])',
                ],
                node
            );
        },

        'N_MARKDOWN_PLAIN_TEXT': (
            node: PlainTextNodeInterface,
            interpret: interpretType,
            context: ContextInterface
        ): SourceNode => {
            return context.createExpressionSourceNode(
                [
                    'tools.createInstance(namespaceScope, tools.valueFactory.createString("Uniter\\\\Markdown\\\\Node\\\\PlainTextNode"), [',
                    `tools.valueFactory.createString(${JSON.stringify(
                        node.text
                    )})`,
                    '])',
                ],
                node
            );
        },

        'N_MARKDOWN_UNORDERED_LIST_ELEMENT': (
            node: UnorderedListNodeInterface,
            interpret: interpretType,
            context: ContextInterface
        ): SourceNode => {
            const itemListChunks = interpretElementList(
                node.itemElements,
                interpret
            );

            return context.createExpressionSourceNode(
                [
                    'tools.createInstance(namespaceScope, tools.valueFactory.createString("Uniter\\\\Markdown\\\\Node\\\\UnorderedListNode"), [',
                    'tools.valueFactory.createArray([',
                    itemListChunks,
                    '])',
                    '])',
                ],
                node
            );
        },
    },
};
