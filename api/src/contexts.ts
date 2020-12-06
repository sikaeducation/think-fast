type context = 'file' | 'component' | 'variable';
const contexts: context[] = ['file', 'component', 'variable'];
const messageContexts: Record<string, string> = {
  file: 'file name',
  component: 'component name',
  variable: 'variable name',
};
type stringTransform = (string: string) => string
const stemContexts: Record<string, stringTransform> = {
  file: (string) => `${string}.vue`,
  component: (string) => `<${string} />`,
  variable: (string) => `import ${string} from './${string}.vue';`,
};

export {
  messageContexts,
  contexts,
  stemContexts,
  context,
};
