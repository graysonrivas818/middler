import { promises as fs } from 'fs';
import path from 'path';

export async function appendResponse(data) {
  const filePath = path.join(process.cwd(), 'app', 'data', 'responses.json');

  await fs.mkdir(path.dirname(filePath), { recursive: true });

  let content = [];
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    content = JSON.parse(raw);
  } catch { }

  const [createdDate, timePartWithZ] = new Date().toISOString().split('T');
  const createdTime = timePartWithZ.slice(0, 8) + 'Z';

  content.push({ createdDate, createdTime, ...data });

  await fs.writeFile(filePath, JSON.stringify(content, null, 2));
}
