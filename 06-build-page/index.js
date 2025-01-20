const path = require('path');
const fs = require('fs');

const project = path.join(__dirname, 'project-dist');
let assets = path.join(__dirname, 'assets');
const copyAssets = path.join(project, 'assets');
const styles = path.join(__dirname, 'styles');
const copyStyles = path.join(project, 'style.css');
const componentsCopy = path.join(__dirname, 'components');
const template = path.join(__dirname, 'template.html');
const resultHtml = path.join(project, 'index.html');

const createPage = async () => {
  await fs.promises.mkdir(project, { recursive: true });
  await fs.promises.mkdir(copyAssets, { recursive: true });

  await copyAssetsResult(assets, copyAssets);
  await copyStylesResult();
  await returnCopyHTML();
};

async function copyAssetsResult(srcDir, destDir) {
  const items = await fs.promises.readdir(srcDir, { withFileTypes: true });

  for (const item of items) {
    const srcPath = path.join(srcDir, item.name);
    const destPath = path.join(destDir, item.name);

    if (item.isFile()) {
      await fs.promises.mkdir(destPath, { recursive: true });
      await copyAssetsResult(srcPath, destPath);
    }
  }
}

async function copyStylesResult() {
  const stylesStream = fs.createWriteStream(copyStyles);
  const files = await fs.promises.readdir(styles, { withFileTypes: true });

  for (const file of files) {
    if (file.isFile() && file.name.endsWith('.css')) {
      const filePath = path.join(styles, file.name);
      const data = await fs.promises.readFile(filePath);
      stylesStream.write(data);
    }
  }
  stylesStream.end();
}

async function returnCopyHTML() {
  const templateContent = await fs.promises.readFile(template, 'utf-8');
  const components = await fs.promises.readdir(componentsCopy, {
    withFileTypes: true,
  });

  let str = templateContent;

  for (const component of components) {
    if (component.isFile() && component.name.endsWith('.html')) {
      const componentPath = path.join(componentsCopy, component.name);
      const componentContent = await fs.promises.readFile(
        componentPath,
        'utf-8',
      );
      const componentTag = `{{${component.name.replace('.html', '')}}}`;
      str = str.replace(new RegExp(componentTag, 'g'), componentContent);
    }
  }
  await fs.promises.writeFile(resultHtml, str);
}

createPage().catch((err) => console.error(err));
