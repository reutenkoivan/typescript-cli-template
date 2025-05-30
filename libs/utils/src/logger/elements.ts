export class Elements {
  shelf(text: string): string {
    return `\n${'-'.repeat(text.length + 4)}\n  ${text}\n${'-'.repeat(text.length + 4)}\n`
  }
}
