/*
 * Uniter Markdown Plugin - Adds support for an inline Markdown syntax to PHP
 * Copyright (c) Dan Phillimore (asmblah)
 * https://github.com/uniter/markdown-plugin/
 *
 * Released under the MIT license
 * https://github.com/uniter/markdown-plugin/raw/master/MIT-LICENSE.txt
 */

module.exports = {
    'plugins': [
        // Import this plugin itself
        require('../../../../..'),
    ],
    'settings': {
        'dotphp': {
            // Just for the purposes of these integration tests, turn off the standard I/O
            // hookup, so that we don't end up dumping out to stdout or stderr during the test run
            'stdio': false,
        },
        'phptojs': {
            'mode': 'async',
        },
    },
};
