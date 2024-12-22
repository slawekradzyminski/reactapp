export const languageMap = {
  'yml': 'yaml',
  'typescript': 'typescript',
  'yaml': 'yaml',
  'java': 'java',
  'plaintext': 'java'
};

export const detectLanguage = (code) => {
  if (code.includes('defineConfig') ||
      code.includes('module.exports') ||
      code.includes('require(') ||
      code.includes('import ') ||
      code.includes('export ')) {
    return 'typescript';
  }
  if (code.includes('@Test') || 
      code.includes('public class') || 
      code.includes('private void') ||
      code.includes('@Before') ||
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