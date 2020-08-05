/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import { ASTNodeInterface } from 'parsing';
import ElementNodeInterface from './ElementNodeInterface';

export default interface ElementListNodeInterface extends ASTNodeInterface {
    elements: ElementNodeInterface[];
}
