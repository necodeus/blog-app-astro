'use strict'

// import emoji_html from './lib/render';
import twemoji from 'twemoji'

import emoji_replace from './lib/replace'
import normalize_opts from './lib/normalize_opts'
import emojies_defs from './lib/data/full.json'
import emojies_shortcuts from './lib/data/shortcuts'

export default (md: any) => {
    const opts = normalize_opts(md.utils.assign({}, {
        defs: emojies_defs,
        shortcuts: emojies_shortcuts,
        enabled: [],
    }, {}))

    // md.renderer.rules.emoji = emoji_html;
    md.renderer.rules.emoji = function (token: any, idx: any) {
        return twemoji.parse(token[idx].content)
    }

    md.core.ruler.after(
        'linkify',
        'emoji',
        emoji_replace(md, opts.defs, opts.shortcuts, opts.scanRE, opts.replaceRE),
    )
}
