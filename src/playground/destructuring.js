// const person = {
//   name: 'Kendrick',
//   age: 26,
//   location: {
//     city: 'Austin',
//     temp: 924
//   }
// };
//
// const { name: personName = 'Anonymous', age } = person;
// console.log(`${personName} is ${age} years old`)
//
// const {city, temp: temperature} = person.location
// if (city && temperature) {
//   console.log(`It's ${temperature} degrees in ${city}`);
// }
//
// const { name: publisherName = 'Self-Published' } = book.publisher.name;
//
//

const address = [];

const [ , city, state = 'New York' ] = address

console.log(`You are in ${city}, ${state}`)

const menu = ['coffee (hot)', '4.00', '6.00', '10.00' ]

const [item, ,mediumPrice] = menu;

console.log(`A  medium ${item} costs $${mediumPrice}`);
