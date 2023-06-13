import chalk from 'chalk' // для покраски текста
import dedent from 'dedent-js' // для того чтобы убрать лишние пробелы при выводе с консоль


const printError = (error) => {
	console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}


const printSuccess = (message) => {
	console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}


const printHelp = () => {
	console.log(
		dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] - установка города
		-h - вывод помощи
		-t [API_KEY]- установка токена
		`	
	)
}

export { printError, printSuccess, printHelp }

