---
name: preset-expansion
description: Add new language presets with JSON data and UI updates.
license: MIT
compatibility: opencode
metadata:
  audience: developers
  feature: presets
---

## What I do
- Create JSON files in src/presets/ with word/translation arrays (e.g., [{word: "hello", translation: "你好"}]).
- Update CardList.tsx to add language buttons.
- Modify page.tsx to load and handle new presets.

## When to use me
Use for expanding multi-language support. Provide language name and sample words.

## Examples
For French preset:

Create src/presets/french-lv1.json:

```json
[
  {"word": "bonjour", "translation": "hello"},
  {"word": "merci", "translation": "thank you"}
]
```

Update src/app/PresetCards.tsx to include French in presetOptions and getPresetCards.