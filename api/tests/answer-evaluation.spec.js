const { evaluateAnswer } = require("../dist/answer-evaluation")

describe("#evaluateAnswer", () => {
  it("marks a correct answer as correct", () => {
    const stem = "TheApp.vue"
    const context = "file"
    const response = true

    expect(evaluateAnswer({ stem, context, response })).toEqual({
      isCorrect: true,
      feedback: "It's Pascal Case, ends with a .vue extension.",
    })
  })
})
