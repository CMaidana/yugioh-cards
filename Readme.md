# Yu-Gi-Oh! Card Generator CLI

A Node.js command-line tool that generates custom Yu-Gi-Oh!-style cards. Provide your own image, stats, and description — and generate a complete card image ready to share or print.


## Requirements

- Node.js ≥ 18 (ESM support required)
- npm
- A base card template image (`assets/template.png`)
- Your own image to use as card artwork

---

## Installation

```bash
git clone https://github.com/yourusername/yugioh-cli.git
cd yugioh-cli
npm install
```

## File structure

```bash
yugioh-cli/
├── assets/
│   └── template.png         ← Yu-Gi-Oh! card frame image
├── cli.js                   ← CLI entry point
├── card-generator.js        ← Card rendering logic
├── package.json
├── output.png               ← Generated card image
```