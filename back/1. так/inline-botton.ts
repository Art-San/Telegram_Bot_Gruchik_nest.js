// function formatTextToEqualBlockWidth(string) {
// 	// Special zero-width connector in hex format that doesn't cut off the bot:

// 	const nullSeparator = '&#x200D;'

// 	// The maximum number of characters, upon reaching the number of which the bot starts to stretch the width of the block with buttons:

// 	const maxNumberOfSymbol = 29

// 	// Pad the right side of each new line with spaces and a special character, thanks to which the bot does not cut off these spaces, and then add them to the array:

// 	let resultStringArray = []

// 	while (string.length) {
// 		// Get a substring with the length of the maximum possible width of the option block:

// 		let partOfString = string.substring(0, maxNumberOfSymbol).trim()

// 		// Find the first space on the left of the substring to pad with spaces and a line break character:

// 		let positionOfCarriageTransfer =
// 			string.length < maxNumberOfSymbol
// 				? string.length
// 				: partOfString.lastIndexOf(' ')
// 		positionOfCarriageTransfer =
// 			positionOfCarriageTransfer == -1
// 				? partOfString.length
// 				: positionOfCarriageTransfer

// 		// Pad the substring with spaces and a line break character at the end:

// 		partOfString = partOfString.substring(0, positionOfCarriageTransfer)

// 		partOfString =
// 			partOfString +
// 			new Array(maxNumberOfSymbol - partOfString.length).join(' ') +
// 			nullSeparator

// 		// Add to array of strings:

// 		resultStringArray.push(`<pre>${partOfString}</pre>`)

// 		// Leave only the unprocessed part of the string:

// 		string = string.substring(positionOfCarriageTransfer).trim()
// 	}

// 	// Send a formatted string as a column equal to the maximum width of the message that the bot does not deform:

// 	return resultStringArray.join('\n')
// }

// let textMessage = formatTextToEqualBlockWidth(
// 	'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
// )

// sendMenuKeyboardMessageToUser(
// 	'1572394019',
// 	textMessage,
// 	{
// 		inline_keyboard: [[{ text: 'Test1', callback_data: 'TestId' }]],
// 	},
// 	'HTML'
// )

// textMessage = formatTextToEqualBlockWidth(
// 	'It is a long established fact that a reader '
// )

// sendMenuKeyboardMessageToUser(
// 	'1572394019',
// 	textMessage,
// 	{
// 		inline_keyboard: [[{ text: 'Test2', callback_data: 'TestId2' }]],
// 	},
// 	'HTML'
// )

// textMessage = formatTextToEqualBlockWidth('It is test')

// sendMenuKeyboardMessageToUser(
// 	'1572394019',
// 	textMessage,
// 	{
// 		inline_keyboard: [[{ text: 'Test2', callback_data: 'TestId2' }]],
// 	},
// 	'HTML'
// )
