import { writeFile, mkdir } from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import { dirname } from 'path';

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const { pdfData } = JSON.parse(body);

  const fileName = `./tmp/${uuidv4()}.pdf`;
  const dir = dirname(fileName);
  await mkdir(dir, { recursive: true });

  await writeFile(fileName, Buffer.from(pdfData));
  
  return "OK"
});
