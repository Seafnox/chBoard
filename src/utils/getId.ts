let counter = 0;

export function getId(): string {
  return `#${counter++}`
}
