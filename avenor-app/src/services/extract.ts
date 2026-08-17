// Text extraction from resume files. PDF via pdf-parse, DOCX via mammoth,
// TXT as-is. Scanned (image-only) PDFs yield near-empty text and are
// reported back to the caller for the vision-parse path.

export async function extractText(
  buffer: Buffer,
  filename: string,
): Promise<{ text: string; method: string }> {
  const ext = filename.toLowerCase().split('.').pop() ?? '';

  if (ext === 'pdf') {
    const pdfParse = (await import('pdf-parse')).default;
    const out = await pdfParse(buffer);
    return { text: out.text ?? '', method: 'pdf-parse' };
  }

  if (ext === 'docx' || ext === 'doc') {
    const mammoth = await import('mammoth');
    const out = await mammoth.extractRawText({ buffer });
    return { text: out.value ?? '', method: 'mammoth' };
  }

  return { text: buffer.toString('utf-8'), method: 'plain' };
}
