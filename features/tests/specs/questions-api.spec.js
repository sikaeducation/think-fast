const { request, server, route } = cy

describe("/question", () => {
  it("generates a question", () => {
    const question = {
      correctFeedback: "That's PascalCase, two words, and uses the App prefix.",
      incorrectFeedback: "That's PascalCase, two words, and uses the App prefix.",
      promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
      stemText: 'AppIndex.vue',
    }
    request("GET", "http://backend:80/questions").then(response => {
      const properties = [
        "correctFeedback", "incorrectFeedback", "promptText",
        "stemText", "id",
      ]
      const { question } = response.body
      properties.forEach(property => {
        expect(question).to.have.property(property)
      })
    })
  })
})
