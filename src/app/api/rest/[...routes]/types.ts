export interface RestContext {
  params: Promise<Record<string, string[]>>;
}
