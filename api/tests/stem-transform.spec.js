const getWordFromStem = require("../dist/stem-transform").default

describe("#getWordFromStem", () => {
  it("transforms a file into a word", () => {
    const word = getWordFromStem("the-component.vue")
    expect(word).toBe("the-component")
  })
  it("transforms a variable into a word", () => {
    const word = getWordFromStem("import TheComponent from 'TheComponent.vue'")
    expect(word).toBe("TheComponent")
  })
  it("transforms a component into a word", () => {
    const word = getWordFromStem("<the-component />")
    expect(word).toBe("the-component")
  })
})
