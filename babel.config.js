module.exports = {
    presets: [
      // Permite usar features modernas do JavaScript
      ['@babel/preset-env', { targets: { node: 'current' } }],
      
      // Habilita suporte ao JSX do React sem precisar importar React
      ['@babel/preset-react', { runtime: 'automatic' }]
    ]
};