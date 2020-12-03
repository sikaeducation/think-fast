const { request, server, route } = cy

describe("/question", () => {
  it("generates a question", () => {
    const question = {
      promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
      stemText: 'AppIndex.vue',
    }
    request("POST", "http://backend:80/get-next-question").then(response => {
      expect(question).to.have.property("promptText")
      expect(question).to.have.property("stemText")
    })
  })
})
