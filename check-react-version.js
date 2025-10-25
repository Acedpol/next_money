// check-react-version.js
import { execSync } from 'child_process';
import fs from 'fs';

function checkReactVersion() {
  const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const reactVersion = pkg.dependencies?.react || '';
  const nextVersion = pkg.dependencies?.next || '';

  const reactMajor = parseInt(reactVersion.replace(/[^0-9]/g, '').charAt(0), 10);
  const nextMajor = parseInt(nextVersion.replace(/[^0-9]/g, '').charAt(0), 10);

  if (nextMajor === 16 && reactMajor > 18) {
    console.log('⚠️  React 19 no es totalmente compatible con Next.js 16.');
    console.log('👉 Reajustando automáticamente a React 18...');
    execSync('npm install react@18.3.1 react-dom@18.3.1 --save', { stdio: 'inherit' });
  } else {
    console.log('✅ Versiones compatibles de React y Next.js detectadas.');
  }
}

checkReactVersion();
