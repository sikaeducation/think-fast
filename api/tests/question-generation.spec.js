const { generateQuestion } = require("../dist/question-generation")

describe("#generateQuestion", () => {
  it("generates a camelCase component question with one word", () => {
    const words = ["app"]
    const context = "component"
    const stringCase = "camel"

    expect(generateQuestion({ words, context, stringCase })).toEqual({
      promptText: "<p>According to the official <a href='https://v3.vuejs.org/style-guide'>Vue style guide</a>, is this a good <strong>component name</strong> for Vue component?</p>",
      stemText: "<app />",
    })
  })
  it("generates a camelCase component question", () => {
    const words = ["the", "app"]
    const context = "component"
    const stringCase = "camel"

    expect(generateQuestion({ words, context, stringCase })).toEqual({
      promptText: "<p>According to the official <a href='https://v3.vuejs.org/style-guide'>Vue style guide</a>, is this a good <strong>component name</strong> for Vue component?</p>",
      stemText: "<theApp />",
    })
  })
  it("generates a camelCase variable question", () => {
    const words = ["the", "app"]
    const context = "variable"
    const stringCase = "camel"

    expect(generateQuestion({ words, context, stringCase })).toEqual({
      promptText: "<p>According to the official <a href='https://v3.vuejs.org/style-guide'>Vue style guide</a>, is this a good <strong>variable name</strong> for Vue component?</p>",
      stemText: "import theApp from './theApp.vue';",
    })
  })
  it("generates a snake case file question", () => {
    const words = ["the", "app"]
    const context = "file"
    const stringCase = "snake"

    expect(generateQuestion({ words, context, stringCase })).toEqual({
      promptText: "<p>According to the official <a href='https://v3.vuejs.org/style-guide'>Vue style guide</a>, is this a good <strong>file name</strong> for Vue component?</p>",
      stemText: "the_app.vue",
    })
  })
  it("generates a PascalCase file question", () => {
    const words = ["the", "app"]
    const context = "file"
    const stringCase = "pascal"

    expect(generateQuestion({ words, context, stringCase })).toEqual({
      promptText: "<p>According to the official <a href='https://v3.vuejs.org/style-guide'>Vue style guide</a>, is this a good <strong>file name</strong> for Vue component?</p>",
      stemText: "TheApp.vue",
    })
  })
  it("generates a camel-case file question", () => {
    const words = ["the", "app"]
    const context = "file"
    const stringCase = "camel"

    expect(generateQuestion({ words, context, stringCase })).toEqual({
      promptText: "<p>According to the official <a href='https://v3.vuejs.org/style-guide'>Vue style guide</a>, is this a good <strong>file name</strong> for Vue component?</p>",
      stemText: "theApp.vue",
    })
  })
  it("generates a kebab-case file question", () => {
    const words = ["the", "app"]
    const context = "file"
    const stringCase = "kebab"

    expect(generateQuestion({ words, context, stringCase })).toEqual({
      promptText: "<p>According to the official <a href='https://v3.vuejs.org/style-guide'>Vue style guide</a>, is this a good <strong>file name</strong> for Vue component?</p>",
      stemText: "the-app.vue",
    })
  })
})
