const DEFAULT_DESTINATION = "/";

export function getSafeReturnTo(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.length > 2048 ||
    !value.startsWith("/") ||
    value.startsWith("//")
  ) {
    return DEFAULT_DESTINATION;
  }

  try {
    const baseUrl = new URL("https://board.local");
    const destination = new URL(value, baseUrl);

    if (destination.origin !== baseUrl.origin) {
      return DEFAULT_DESTINATION;
    }

    return `${destination.pathname}${destination.search}${destination.hash}`;
  } catch {
    return DEFAULT_DESTINATION;
  }
}
