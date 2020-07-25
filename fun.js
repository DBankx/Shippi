function* sayHi() {
  yield 'hey';
  yield 'world';
  yield 'hi';
  return 'hi';
}

// const result = sayHi();
// console.log(result.next());
// console.log(result.next());
// console.log(result.next());

const forOf = sayHi();

for (const items of forOf) {
  console.log(items);
}
