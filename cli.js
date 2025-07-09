// cli.js
import inquirer from 'inquirer';
import generarCarta from './card-generator.js';

async function main() {
  console.log('🃏 Generador de Cartas Yu-Gi-Oh');

  const respuestas = await inquirer.prompt([
    {
      name: 'nombre',
      message: 'Nombre de la carta:',
    },
    {
      name: 'tipo',
      message: 'Tipo (ej: DRAGON / EFFECT):',
    },
    {
      name: 'efecto',
      message: 'Efecto de la carta:',
    },
    {
      name: 'atk',
      message: 'ATK:',
      validate: value => !isNaN(value) || 'Debe ser un número',
    },
    {
      name: 'def',
      message: 'DEF:',
      validate: value => !isNaN(value) || 'Debe ser un número',
    },
    {
      name: 'imagenPath',
      message: 'Ruta de la imagen (ej: ./input.jpg):',
      validate: value => !!value || 'La ruta es obligatoria',
    }
  ]);

  await generarCarta({
    ...respuestas,
    atk: parseInt(respuestas.atk, 10),
    def: parseInt(respuestas.def, 10),
    outputPath: 'output.png'
  });
}

main();
