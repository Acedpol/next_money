#!/usr/bin/env node
import chalk from "chalk";

/**
 * === Estilos unificados para los scripts de verificación ===
 */

export const printHeader = (title) => {
  const content = `===  ${title} ===`;
  const line = "-".repeat(content.length); // genera línea del mismo largo

  console.log(chalk.cyanBright(`\n${line}`));
  console.log(chalk.cyanBright(content));
  console.log(chalk.cyanBright(`${line}\n`));
};

export const printFooter = (success, successMsg, failMsg) => {
  const message = success
    ? `✅ ${successMsg}`
    : `🚫${failMsg}`;

  const line = "-".repeat(message.length);

  console.log("\n" + chalk.cyanBright(line));
  console.log(success ? chalk.green.bold(message) : chalk.red.bold(message));
  console.log(chalk.cyanBright(line) + "\n");
};

/**
 * === Mensajes de estado ===
 */
export const logInfo = (msg) => console.log(chalk.blackBright(`🔍${msg}`));
export const logSuccess = (msg) => console.log(chalk.green(`✅ ${msg}`));
export const logWarn = (msg) => console.log(chalk.rgb(255, 136, 0)(`⚠️ ${msg}`));
export const logError = (msg) => console.log(chalk.redBright(`❌ ${msg}`));
