import { homedir } from 'os'
import { join, basename, dirname, extname, relative, resolve,sep } from 'path'
import { promises } from 'fs'

const filePath = join(homedir(), 'weather-data.json')

const TOKEN_DICTIONARY = {
	token: 'token',
	city: 'city'
}

const saveKeyValue = async (key, value) => {
	// console.log(basename(filePath))
	// console.log(dirname(filePath))
	// console.log(extname(filePath))
	// console.log(relative(filePath, dirname(filePath))) // показывает что нужно сделать, что прийти из первого во второе
	// console.log(resolve('..')) // где окажемся, если поднимемся на один уровень вверх
	// console.log(sep) // ПОказать что за сепаратор в операционке (пригодится тогда, когда надо делать split для каждой операционки)
	let data = {}
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		data = JSON.parse(file)
	}
	data[key] = value;
	await promises.writeFile(filePath, JSON.stringify(data))
}

const getKeyValue = async (key) => {
	if (await isExist(filePath)) {
		const file = await promises.readFile(filePath);
		const data = JSON.parse(file)
		return data[key]
	}
	return undefined
}

const isExist = async (path) => {
	try {
		await promises.stat(path) 
		return true
	} catch (e) {
		return false
	}
	
}


export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }