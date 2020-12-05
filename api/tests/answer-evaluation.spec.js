const { evaluateAnswer, determineCorrectness, getReasonMessages } = require("../dist/answer-evaluation")

describe("#evaluateAnswer", () => {
  describe("never", () => {
    it("marks <ButtonActive /> as correct", () => {
      const stem = "<ButtonActive />"
      const response = false

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: false,
        feedback: "That's a valid component name because it uses multiple words, it's a component that uses PascalCase, and it ends with a modifier.",
      })
    })
    it("marks <IncMessage /> as incorrect", () => {
      const stem = "<IncMessage />"
      const response = false

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's an invalid component name because it uses an abbreviation.",
      })
    })
    it("marks <One /> as incorrect", () => {
      const stem = "<One />"
      const response = false

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's an invalid component name because it uses a single word.",
      })
    })
  })
  describe("component", () => {
    it("marks <SomeComponent /> as correct", () => {
      const stem = "<SomeComponent />"
      const response = true

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's a valid component name because it uses multiple words, and it's a component that uses PascalCase.",
      })
    })
    it("marks <some-component /> as correct", () => {
      const stem = "<some-component />"
      const response = true

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's a valid component name because it uses multiple words, and it's a component that uses kebab-case.",
      })
    })
    it("marks <someComponent /> as incorrect", () => {
      const stem = "<someComponent />"
      const response = true

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: false,
        feedback: "That's an invalid component name because it uses camelCase.",
      })
    })
    it("marks <some_component /> as incorrect", () => {
      const stem = "<some_component />"
      const response = true

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: false,
        feedback: "That's an invalid component name because it uses snake_case.",
      })
    })
  })
  describe("variable", () => {
    it("marks SomeVariable as correct", () => {
      const stem = "import SomeVariable from 'SomeVariable.vue'"
      const response = false

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: false,
        feedback: "That's a valid variable name because it uses multiple words, and it's a variable that uses PascalCase.",
      })
    })
    it("marks someVariable as incorrect", () => {
      const stem = "import someVariable from 'someVariable.vue'"
      const response = false

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's an invalid variable name because it uses camelCase.",
      })
    })
    it("marks some-variable as incorrect", () => {
      const stem = "import some-variable from 'some-variable.vue'"
      const response = false

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's an invalid variable name because it's a variable that uses kebab-case.",
      })
    })
    it("marks some_variable as incorrect", () => {
      const stem = "import some_variable from 'some_variable.vue'"
      const response = false

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's an invalid variable name because it uses snake_case.",
      })
    })
  })
  describe("file", () => {
    it("marks TheApp.vue as correct", () => {
      const stem = "TheApp.vue"
      const response = true

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's a valid file name because it uses multiple words, it's a file name that uses PascalCase, and it uses the \"the\" prefix.",
      })
    })
    it("marks the-app.vue as correct", () => {
      const stem = "the-app.vue"
      const response = true

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's a valid file name because it uses multiple words, it's a file name that uses kebab-case, and it uses the \"the\" prefix.",
      })
    })
    it("marks the_app.vue as incorrect", () => {
      const stem = "the_app.vue"
      const response = false

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's an invalid file name because it uses snake_case.",
      })
    })
    it("marks theApp.vue as incorrect", () => {
      const stem = "theApp.vue"
      const response = false

      expect(evaluateAnswer(stem, response)).toEqual({
        isCorrect: true,
        feedback: "That's an invalid file name because it uses camelCase.",
      })
    })
  })
})
describe("#determineCorrectness", () => {
  describe("never", () => {
    it("never accepts single words", () => {
      const stem = "component.vue"

      expect(determineCorrectness(stem)).toEqual(false)
    })
    it("never accepts abbreviations", () => {
      const stem = "the-btn.vue"

      expect(determineCorrectness(stem)).toEqual(false)
    })
    it("never accepts snake_case", () => {
      const stem = "the_component.vue"

      expect(determineCorrectness(stem)).toEqual(false)
    })
    it("never accepts camel case", () => {
      const stem = "theComponent.vue"

      expect(determineCorrectness(stem)).toEqual(false)
    })
  })
  describe("always", () => {
    it("always accepts multiple words", () => {
      const stem = "the-component.vue"

      expect(determineCorrectness(stem)).toEqual(true)
    })
  })
  describe("files", () => {
    it("allows kebab case", () => {
      const stem = "the-component.vue"

      expect(determineCorrectness(stem)).toEqual(true)
    })
    it("allows pascal case", () => {
      const stem = "TheComponent.vue"

      expect(determineCorrectness(stem)).toEqual(true)
    })
  })
  describe("components", () => {
    it("allows PascalCase", () => {
      const stem = "import TheComponent from './TheComponent.vue'"

      expect(determineCorrectness(stem)).toEqual(true)
    })
    it("allows kebab case", () => {
      const stem = "<the-component />"

      expect(determineCorrectness(stem)).toEqual(true)
    })
  })
  describe("variables", () => {
    it("allows pascal case", () => {
      const stem = "import TheComponent from './TheComponent.vue'"

      expect(determineCorrectness(stem)).toEqual(true)
    })
    it("doesn't allow kebab case", () => {
      const stem = "import the-component from './the-component.vue'"

      expect(determineCorrectness(stem)).toEqual(false)
    })
  })
})
describe("#getReasonMessages", () => {
  it("generates a success message for TheComponent as a variable", () => {
    const stem = "TheComponent"
    const context = "variable"
    const isCorrect = true

    expect(getReasonMessages(isCorrect, stem, context)).toEqual([
      "it uses multiple words",
      "it\'s a variable that uses PascalCase",
      "it uses the \"the\" prefix",
    ])
  })
  it("generates a failure message theComponent as a file", () => {
    const stem = "theComponent"
    const context = "file"
    const isCorrect = false

    expect(getReasonMessages(isCorrect, stem, context)).toEqual([
      "it uses camelCase"
    ])
  })
  it("generates a failure message for the-component as a variable", () => {
    const stem = "the-component"
    const context = "variable"
    const isCorrect = false

    expect(getReasonMessages(isCorrect, stem, context)).toEqual([
      "it's a variable that uses kebab-case"
    ])
  })
})
