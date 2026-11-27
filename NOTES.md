# Notes — Describe Your Ex in One Word

## Entry

**Unsubscribed** (12 characters, exactly one word)

## Why this word

The bounty asks for a single word describing an ex, at most 111 characters,
with nothing else attached — so there is deliberately no punchline, caption,
or extra text. The joke has to arrive with the word itself.

"Unsubscribed" treats the ex like a newsletter: cancelled, no renewal, and
you opted out on purpose. It is instantly readable as a verdict on a former
partner, it lands as a joke at a glance rather than a plain insult, and it is
not the obvious choice (no "toxic", "cheater", "mistake"). Anyone who has
ever hit unsubscribe on something that kept showing up gets it.

## How it works

`main.ts` writes the word, and nothing else, to `/output/entry.txt` — no
trailing newline, so the file's bytes are exactly the entry. Running it is
deterministic: every run produces the same 12 bytes.
