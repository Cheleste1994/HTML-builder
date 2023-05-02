const fs = require('fs');
const readline = require('readline');

const filePath = '02-write-file/text.txt';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
  console.log(`Файл ${filePath} создан`);
});

function appendToFile(text) {
  fs.appendFile(filePath, `${text}\n`, (err) => {
    if (err) throw err;
    console.log(`Текст "${text}" добавлен в файл`);
  });
}

rl.setPrompt('Введите текст для добавления в файл: ');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('Завершение работы');
    rl.close();
    process.exit(0);
  } else {
    appendToFile(input);
    rl.prompt();
  }
});

rl.on('SIGINT', () => {
  console.log('Завершение работы');
  rl.close();
  process.exit(0);
});

rl.prompt();
