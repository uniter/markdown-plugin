/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import { ASTNodeInterface } from 'parsing';
import ElementListNodeInterface from './ElementListNodeInterface';

export default interface ItalicNodeInterface extends ASTNodeInterface {
    elements: ElementListNodeInterface;
}
