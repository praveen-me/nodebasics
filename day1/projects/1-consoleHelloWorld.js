console.log("Hello World!");

if(process.env.NODE_ENV === 'production') {
  console.log('I am  in production.')
} else {
  console.log('I am in development.');
}

console.log(process.env.API_KEY);

// Try doing 
// console.log(document);
// console.log(window);
// console.log(process);
console.log(process.env.NODE_ENV);