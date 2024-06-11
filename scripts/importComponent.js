const fs = require('fs');
const path = require('path');

console.log("hello")
const createIndexFile = (componentDir, componentName) => {
    const indexPath = path.join(componentDir, 'index.tsx');
    if (!fs.existsSync(indexPath)) {
        const indexContent = `export * from './${componentName}';`;
        fs.writeFileSync(indexPath, indexContent, 'utf8');
        console.log(`Created index file at ${indexPath}`);
    }
};

const createCompositionFile = (componentDir, componentName) => {
    const compositionPath = path.join(componentDir, `${componentName}.composition.tsx`);
    if (!fs.existsSync(compositionPath)) {
        const compositionContent = `import { ${componentName} } from './${componentName}';

export const Basic${componentName} = () => {
  return (
    <${componentName}>hello world!</${componentName}>
  );
};`;
        fs.writeFileSync(compositionPath, compositionContent, 'utf8');
        console.log(`Created composition file at ${compositionPath}`);
    }
};

const createDocumentationFile = (componentDir, componentName) => {
    const docPath = path.join(componentDir, `${componentName}.docs.mdx`);
    if (!fs.existsSync(docPath)) {
        const docContent = `---
description: A ${componentName} component.
---

import { ${componentName} } from './${componentName}';

A component that renders text.

### Component usage
\`\`\`js
<${componentName}>Hello world!</${componentName}>
\`\`\`

### Render hello world!

\`\`\`js live
<${componentName}>Hello world!</${componentName}>
\`\`\``;
        fs.writeFileSync(docPath, docContent, 'utf8');
        console.log(`Created documentation file at ${docPath}`);
    }
};

const importComponent = (componentPath) => {
    if (!fs.existsSync(componentPath)) {
        console.error(`The path ${componentPath} does not exist.`);
        return;
    }

    const stats = fs.statSync(componentPath);

    if (stats.isFile()) {
        const componentDir = path.join(path.dirname(componentPath), path.basename(componentPath, path.extname(componentPath)));
        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir);
            console.log(`Created directory ${componentDir}`);
        }
        const componentName = path.basename(componentPath, path.extname(componentPath));
        const newFilePath = path.join(componentDir, path.basename(componentPath));
        fs.renameSync(componentPath, newFilePath);
        console.log(`Moved file to ${newFilePath}`);

        createIndexFile(componentDir, componentName);
        createCompositionFile(componentDir, componentName);
        createDocumentationFile(componentDir, componentName);
    } else if (stats.isDirectory()) {
        const componentName = path.basename(componentPath);
        createIndexFile(componentPath, componentName);
        createCompositionFile(componentPath, componentName);
        createDocumentationFile(componentPath, componentName);
    } else {
        console.error(`The path ${componentPath} is neither a file nor a directory.`);
    }
};

// Accept the component path as a command-line argument
const componentPath = process.argv[2];
if (!componentPath) {
    console.error('Please provide the path to the component.');
    process.exit(1);
}

importComponent(componentPath);

console.log(`Now you can run example: \n bit add packages/shared/* --namespace shared --scope your-org.scope \n ${componentPath}`)