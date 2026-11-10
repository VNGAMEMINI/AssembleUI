let id = 0;

function generateId(prefix?: string): string {
  id += 1;
  return prefix ? `${prefix}-${id}` : `aui-${id}`;
}

function resetGenerateId(): void {
  id = 0;
}

export { generateId, resetGenerateId };
