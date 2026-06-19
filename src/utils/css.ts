export function toViewTransitionName(title: string, uniqueId?: string): string {
  const safeName = title
    .toLowerCase()
    .replace(/[\s_\/]+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/^-+|-+$/g, '');
  const validIdent = /^[0-9]/.test(safeName) ? `n-${safeName}` : safeName;
  return uniqueId ? `${validIdent}-${uniqueId}` : validIdent;
}
