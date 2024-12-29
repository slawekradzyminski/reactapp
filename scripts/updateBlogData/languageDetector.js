export const languageMap = {
  'yml': 'yaml',
  'typescript': 'typescript',
  'yaml': 'yaml',
  'java': 'java',
  'plaintext': 'java',
  'bash': 'bash',
  'javascript': 'typescript'
};

export const detectLanguage = (code) => {
  if (code.includes('console.log(') || 
      code.includes('setTimeout(')) {
    return 'typescript';
  }
  if (code.includes('defineConfig') ||
      code.includes('module.exports') ||
      code.includes('describe(') ||
      code.includes('it(') ||
      code.includes('require(') ||
      code.includes('import ') ||
      code.includes('export ')) {
    return 'typescript';
  }
  if (code.includes('@Test') || 
      code.includes('public class') || 
      code.includes('private void') ||
      code.includes('@Before') ||
      code.includes('@Benchmark') ||
      code.includes('@Override') ||
      code.includes('extends ')) {
    return 'java';
  }
  if (code.includes('image:') || 
      code.includes('stage:') || 
      code.includes('script:')) {
    return 'yaml';
  }
  return 'plaintext';
}; 