/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import { ASTNodeInterface } from 'parsing';
import ListItemNodeInterface from './ListItemNodeInterface';

export default interface UnorderedListNodeInterface extends ASTNodeInterface {
    itemElements: ListItemNodeInterface[];
}
