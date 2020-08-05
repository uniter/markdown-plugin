# Uniter markdown plugin (experimental)

[![Build Status](https://github.com/uniter/markdown-plugin/workflows/CI/badge.svg)](https://github.com/uniter/markdown-plugin/actions?query=workflow%3ACI)

Implements an inline [Markdown]() syntax in PHP for [Uniter]().

## What?

Please note that you *probably shouldn't use this in production*. It's intended to demonstrate the [unified platform config]() feature of Uniter only.
That said, feel free to contribute any improvements that still fit within that (admittedly contrived) use-case.

In reality, you'd probably want to avoid extending PHP's syntax for this particular feature, or at least perform a PHP source-to-source transpilation.
That said, PHP currently lacks a source-map equivalent, so you'd probably have to bunch your generated code up onto a smaller number of lines
in order to maintain the correct line numbers after transpilation.

## I understand, but how do I use it?

### Install the dependencies
```shell
$ npm install --save uniter uniter-markdown-plugin
```

### Create your unified platform config
`uniter.config.js`:
```javascript
module.exports = {
    'plugins': [
        // Import this plugin itself
        require('uniter-markdown-plugin'),
    ],
};
```

### Use it in a script

Note that interpolation works too:

`my_markdown.php`:
```php
<?php

$name = 'Anastasia';
$where = 'here';

$myMarkdownTree = markdown {
### My intro
- Firstly, hello *$name*, how are _you_?
- Secondly, $where did you go?
};

return $myMarkdownTree->toHtml();
```

### Run it

Note that the `uniter.config.js` file [will be detected automatically](),
assuming it is in the same folder as your entry script:

```shell
$ uniter my_markdown.php
```

## Limitations

### Not designed for production use!

[As above](#What?), I don't recommend you use this plugin in production - but feel free to experiment!

### "Free" special characters are not consistently supported

Something like the following:
```php
<?php

$myMarkdownTree = markdown {
    My plain text with * an asterisk.
};
```

will raise a `PHP Parse error:  syntax error, unexpected ...` error.
To overcome this, you'll need to backslash-escape the special character, like so:

`my_markdown.php`
```php
<?php

$myMarkdownTree = markdown {
    My plain text with \* an asterisk.
};

print $myMarkdownTree->toHtml();
```

\- this should then give the desired result. Note that the backslash will be removed:

```shell
$ uniter my_markdown.php

My plain text with * an asterisk.
```

Keeping up to date
------------------
- [Follow me on Twitter](https://twitter.com/@asmblah) for updates: [https://twitter.com/@asmblah](https://twitter.com/@asmblah)

[Markdown]: https://daringfireball.net/projects/markdown/syntax
[Uniter]: https://github.com/asmblah/uniter
[unified platform config]: https://uniter.github.io/docs/uniter/config.html#unified-platform-config
[will be detected automatically]: https://uniter.github.io/docs/uniter/config.html#automatic-config-detection
