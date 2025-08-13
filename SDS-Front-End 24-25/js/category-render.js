    (function () {
        const host = document.querySelector('main[data-type][data-category]');
        if (!host) return;

        const type = host.dataset.type;
        const category = host.dataset.category;
        const grid = document.getElementById('catGrid') || document.querySelector('.grid');
        if (!grid) return;

        const el = (tag, cls, text) => {
            const e = document.createElement(tag);
            if (cls) e.className = cls;
            if (text !== undefined) e.textContent = text;
            return e;            
        };

        const slugify = (s) =>
            String(s || '')
                .toLowerCase()
                .replace(/&/g, 'and')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

        const data = (type === 'quotes' ? (window.QUOTES_DATA || []) : (window.POEMS_DATA || []))
                .filter(x => x && x.category === category)

        if (!data.length) {
            grid.appendChild(el('div', 'tile empty', `No ${type} added yet for "${category}".`));
            return;
        }

        document.querySelectorAll('.cat-btn').forEach(a => {
            if (a.textContent.trim() === category) a.setAttribute('aria-current', 'true');
        });

        data.forEach(item => {
            const card = el('figure', 'tile');

            const badge = el('span', 'badge', category);

            if (type === 'quotes') {
                const text = el('blockquote', 'qtext', item.text || '');
                const by = item.author ? el('figcaption', 'byline', '— ' + item.author) : null;
                card.appendChild(badge);
                card.appendChild(text);
                if (by) card.appendChild(by);
            } else {
                if (item.title) card.appendChild(el('figcaption', 'ptitle', item.title));
                const poemText =
                typeof item.text === 'string' ? item.text : Array.isArray(item.lines) ? item.lines.join('\n') : '';
                const text = el('div', 'ptext', poemText);
                const by = item.author ? el('figcaption', 'byline', '— ' + item.author) : null;
                card.appendChild(badge);
                card.appendChild(text);
                if (by) card.appendChild(by);
            }

            grid.appendChild(card);
        });      
    }) ();