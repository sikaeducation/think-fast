const { request } = cy

describe("/question", () => {
  it("generates a question", () => {
    request("POST", "http://backend:80/get-question").then(response => {
      expect(response.body.question).to.have.property("promptText")
      expect(response.body.question).to.have.property("stemText")
    })
  })
  it("evaluates an answer", () => {
    request("POST", "http://backend:80/evaluate-answer", {
      stem: "AppIndex.vue",
      userResponse: true,
    }).then(response => {
      expect(response.body.answer).to.have.property("isCorrect")
      expect(response.body.answer).to.have.property("feedback")
    })
  })
})
