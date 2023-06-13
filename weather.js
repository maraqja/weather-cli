#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather, getIcon } from './services/api.service.js'
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js'
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'


const saveToken = async (token) => {
	if (!token.length) {
		printError('Токен не передан')
		return
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token)
		printSuccess('Токен сохранен')
	} catch (e) {
		printError(e.message)
	}
	
}


const saveCity = async (city) => {
	if (!city.length) {
		printError('Город не передан')
		return
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city)
		printSuccess('City сохранен')
	} catch (e) {
		printError(e.message)
	}
	
}


const getForecast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
		const weather = await getWeather(city)
		printWeather(weather, getIcon(weather.weather[0].icon))
	} catch (e) {
		if (e?.response?.status == 404) { // обработка ошибки axios
			printError('Неверно указан город')
		} else if (e?.response?.status == 401) {
			printError('Неверно указан токен')
		} else { // обрабока других ошибок 
			printError(e.message)
		}
	}
}

const initCLI = () => {
	const args = getArgs(process.argv) 
	// console.log(process.env)
	// console.log(args)
	if (args.h) {
		return printHelp();
	}

	if (args.c) {
		return saveCity(args.c)
	}

	if (args.t) {
		return saveToken(args.t)
	}

	return getForecast()

	// Вывести погоду
}

initCLI();