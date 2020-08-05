/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

import dotPHPFactory = require('dotphp');
import type { DotPHPFactoryInterface, DotPHPInterface } from 'dotphp';

describe('Basic markdown usage integration', () => {
    let dotPHP: DotPHPInterface;

    beforeEach(() => {
        dotPHP = (dotPHPFactory as DotPHPFactoryInterface).create(
            __dirname + '/fixtures/basic_usage'
        );
    });

    it('should be able to render a parsed Markdown tree containing just plain text', () => {
        const resultValue = dotPHP.evaluateSync(
            `
<?php

$myMarkdownTree = markdown {
    Hello world!
};

return $myMarkdownTree->toHtml();
`,
            '/my/module.php'
        );

        expect(resultValue.getType()).toEqual('string');
        expect(resultValue.getNative()).toEqual('Hello world!');
    });

    it('should be able to render a parsed Markdown tree containing just special characters', () => {
        const resultValue = dotPHP.evaluateSync(
            `
<?php

$myMarkdownTree = markdown {
    Hello < \\\\ there \\\` \\$ \\* # - my \\_ \\} world \\ { !
};

return $myMarkdownTree->toHtml();
`,
            '/my/module.php'
        );

        expect(resultValue.getType()).toEqual('string');
        expect(resultValue.getNative()).toEqual(
            'Hello < \\ there ` $ * # - my _ } world \\ { !'
        );
    });

    it('should be able to render a parsed Markdown tree containing two bold sections using both syntaxes', () => {
        const resultValue = dotPHP.evaluateSync(
            `
<?php

$myMarkdownTree = markdown {Hello **there**, __world__!};

return $myMarkdownTree->toHtml();
`,
            '/my/module.php'
        );

        expect(resultValue.getType()).toEqual('string');
        expect(resultValue.getNative()).toEqual(
            'Hello <strong>there</strong>, <strong>world</strong>!'
        );
    });

    it('should be able to render a parsed Markdown tree containing two nested bold & italic sections, using both syntaxes', () => {
        const resultValue = dotPHP.evaluateSync(
            `
<?php

$myMarkdownTree = markdown {Hello ***there***, my ___world___!};

return $myMarkdownTree->toHtml();
`,
            '/my/module.php'
        );

        expect(resultValue.getType()).toEqual('string');
        expect(resultValue.getNative()).toEqual(
            'Hello <strong><em>there</em></strong>, my <strong><em>world</em></strong>!'
        );
    });

    it('should be able to render a parsed Markdown tree containing two italic sections using both syntaxes', () => {
        const resultValue = dotPHP.evaluateSync(
            `
<?php

$myMarkdownTree = markdown {Hello *there*, my _world_!};

return $myMarkdownTree->toHtml();
`,
            '/my/module.php'
        );

        expect(resultValue.getType()).toEqual('string');
        expect(resultValue.getNative()).toEqual(
            'Hello <em>there</em>, my <em>world</em>!'
        );
    });

    it('should be able to render a parsed Markdown tree containing an unordered list with a single item', () => {
        const resultValue = dotPHP.evaluateSync(
            `
<?php

$myMarkdownTree = markdown {
- Hello there!
};

return $myMarkdownTree->toHtml();
`,
            '/my/module.php'
        );

        expect(resultValue.getType()).toEqual('string');
        expect(resultValue.getNative()).toEqual(
            '<ul><li>Hello there!</li></ul>'
        );
    });

    it('should be able to render a parsed Markdown tree containing a single bold section with interpolated variable', () => {
        const resultValue = dotPHP.evaluateSync(
            `
<?php

$name = 'Mariana';

$myMarkdownTree = markdown {Hello there **$name!**};

return $myMarkdownTree->toHtml();
`,
            '/my/module.php'
        );

        expect(resultValue.getType()).toEqual('string');
        expect(resultValue.getNative()).toEqual(
            'Hello there <strong>Mariana!</strong>'
        );
    });

    it('should be able to render a parsed Markdown tree containing an unordered list with two items, embedded formatting and interpolated variable', () => {
        const resultValue = dotPHP.evaluateSync(
            `
<?php

$name = 'George';

$myMarkdownTree = markdown {
- Hello there!
- And hello _again_ $name!
};

return $myMarkdownTree->toHtml();
`,
            '/my/module.php'
        );

        expect(resultValue.getType()).toEqual('string');
        expect(resultValue.getNative()).toEqual(
            '<ul><li>Hello there!</li><li>And hello <em>again</em> George!</li></ul>'
        );
    });

    it('should be able to render a parsed complex Markdown tree', () => {
        const resultValue = dotPHP.evaluateSync(
            `
<?php

$name = 'Agatha';
$where = 'here';

$myMarkdownTree = markdown {
### My intro
- First, hello *$name*, how are _you_?
- Second, $where is some \`inline *code* that \\\`should\\\` _not_ be parsed\`!
};

return $myMarkdownTree->toHtml();
`,
            '/my/module.php'
        );

        expect(resultValue.getType()).toEqual('string');
        expect(resultValue.getNative()).toEqual(
            '<h3>My intro</h3><ul><li>First, hello <em>Agatha</em>, how are <em>you</em>?</li><li>Second, here is some <code>inline *code* that `should` _not_ be parsed</code>!</li></ul>'
        );
    });

    it('should not support unescaped free special characters', () => {
        expect(() => {
            dotPHP.evaluateSync(
                `
<?php

$myMarkdownTree = markdown {
    My plain text with * an asterisk
};
`,
                '/my/module.php'
            );
        }).toThrow('PHP Parse error: syntax error');
    });
});
