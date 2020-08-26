function* printName() {
    yield 'khuong'
    yield 'khuong2'
    yield 'khuong3'
}
function* hello() {
    yield 'hello'
    yield* printName()
    yield 'goodbye'
}
const res = hello()
console.log(res.next())
console.log(res.next())
console.log(res.next())
console.log(res.next())
console.log(res.next())
