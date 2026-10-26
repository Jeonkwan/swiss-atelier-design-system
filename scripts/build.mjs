import { readFile, writeFile } from 'node:fs/promises';

const tokens = JSON.parse(await readFile('dist/tokens.json', 'utf8'));
const declarations = [];
for (const token of Object.values(tokens)) {
  if (!token || typeof token !== 'object' || !('$value' in token)) continue;
  const { name, unit = '', value: cssValue } = token.$extensions['org.swiss-atelier.css'];
  let value = token.$value;
  if (cssValue !== undefined) value = cssValue;
  else if (token.$type === 'color') value = '#' + value.components.map(component => Math.round(component * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
  else if (token.$type === 'dimension') value = `${value.value}${value.unit}`;
  else if (token.$type === 'fontFamily') value = value.map(family => family.includes(' ') ? `'${family}'` : family).join(', ');
  else value = `${value}${unit}`;
  declarations.push(`  ${name}: ${value};`);
}
const fonts = "@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..600&family=Geist+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Geist:wght@400..600&family=Literata:ital,opsz,wght@0,7..72,400..600;1,7..72,400..600&display=swap');";
await writeFile('dist/atelier.css', `/* Swiss Atelier 1.0.0 — generated; edit tokens.json and styles/atelier.css. */\n${fonts}\n\n:root {\n${declarations.join('\n')}\n}\n\n${await readFile('styles/atelier.css', 'utf8')}`);
await writeFile('dist/site.js', await readFile('scripts/site.js'));
