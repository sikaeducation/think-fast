const { get, visit, the, clickThe, intercept, wait, server, route } = cy

describe("Networking loading", () => {
  it("shows a loading indicator while a page is loading", () => {
    server()
    route({
      method: "POST",
      url: "https://thinkfast-api.sikaeducation.com/get-next-question",
      response: { question: { promptText: "anything" }},
      delay: 1000,
    }).as("getQuestion")
    visit("/")
    the("loading-indicator").should("exist")
  })
})
describe("Taking quizzes", () => {
  beforeEach(() => {
    const question = {
      correctFeedback: "That's PascalCase, two words, and uses the App prefix.",
      incorrectFeedback: "That's PascalCase, two words, and uses the App prefix.",
      promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
      stemText: 'AppIndex.vue',
      isCorrect: false,
    }
    server()
    route("POST", "https://thinkfast-api.sikaeducation.com/get-next-question", { question }).as("getQuestion")
    visit("/")
    wait("@getQuestion")
    the("loading-indicator").should("not.exist")
  })
  describe("Viewing questions", () => {
    it("shows a question", () => {
      the("prompt").contains("AppIndex.vue")
    })
    it("shows multiple questions", () => {
      const question = {
        correctFeedback: "That's PascalCase, two words, and uses the App prefix.",
        incorrectFeedback: "That's PascalCase, two words, and uses the App prefix.",
        promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
        stemText: 'app-index.vue',
        isCorrect: false,
      }
      route("POST", "https://thinkfast-api.sikaeducation.com/get-next-question", { question }).as("getQuestion")
      the("prompt").contains("AppIndex.vue")
      clickThe("yes-button")
      clickThe("next-button")
      wait("@getQuestion")
      the("prompt").contains("app-index.vue")
    })
  })

  describe("Answering questions", () => {
    it("can answer a question correctly", () => {
      clickThe("yes-button")
      the("is-correct-message").contains("Correct!")
    })
    it("can answer a question incorrectly", () => {
      clickThe("no-button")
      the("is-correct-message").contains("Incorrect.")
    })
  })

  describe("Streaks", () => {
    beforeEach(() => {
      the("streak").should("not.exist")
      clickThe("yes-button")
      clickThe("next-button")
      the("streak").should("not.exist")
      clickThe("yes-button")
      clickThe("next-button")
    })
    it("displays a streak if multiple questions are answered correctly", () => {
      the("streak").contains("2")
      clickThe("yes-button")
      clickThe("next-button")
      the("streak").contains("3")
    })
    it("stops display a streak if it's broken", () => {
      clickThe("no-button")
      the("streak").should("not.exist")
    })
  })
})
