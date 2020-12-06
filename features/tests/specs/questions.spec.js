const { get, visit, the, clickThe, intercept, wait, server, route } = cy

describe("Networking loading", () => {
  it("shows a loading indicator while a page is loading", () => {
    server()
    route({
      method: "POST",
      url: "https://thinkfast-api.sikaeducation.com/get-question",
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
      promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
      stemText: 'AppIndex.vue',
    }
    const answer = {
      isCorrect: true,
      feedback: 'feedback',
    }
    server()
    route("POST", "https://thinkfast-api.sikaeducation.com/get-question", { question }).as("getQuestion")
    route("POST", "https://thinkfast-api.sikaeducation.com/evaluate-answer", { answer }).as("answerQuestion")
    visit("/")
    wait("@getQuestion")
    the("loading-indicator").should("not.exist")
  })
  describe("Viewing questions", () => {
    it("shows a question", () => {
      the("prompt").contains("AppIndex.vue")
    })
    it("shows multiple questions", () => {
      let question = {
        promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
        stemText: 'app-index.vue',
      }
      route("POST", "https://thinkfast-api.sikaeducation.com/get-question", { question }).as("getQuestion")
      the("prompt").contains("AppIndex.vue")
      clickThe("yes-button")
      wait("@answerQuestion")
      question = {
        promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
        stemText: 'the-component.vue',
      }
      route("POST", "https://thinkfast-api.sikaeducation.com/get-question", { question }).as("getQuestion")
      clickThe("next-button")
      wait("@getQuestion")
      the("prompt").contains("the-component.vue")
    })
  })

  describe("Answering questions", () => {
    it("can answer a question correctly", () => {
      clickThe("yes-button")
      wait("@answerQuestion")
      the("is-correct-message").contains("Correct!")
    })
    it("can answer a question incorrectly", () => {
      const answer = {
        isCorrect: false,
        feedback: 'feedback',
      }
      route("POST", "https://thinkfast-api.sikaeducation.com/evaluate-answer", { answer }).as("answerQuestion")
      clickThe("no-button")
      wait("@answerQuestion")
      the("is-correct-message").contains("Incorrect.")
    })
  })

  describe("Streaks", () => {
    beforeEach(() => {
      the("streak").should("not.exist")
      clickThe("yes-button")
      wait("@answerQuestion")
      clickThe("next-button")
      the("streak").should("not.exist")
      clickThe("yes-button")
      wait("@answerQuestion")
      clickThe("next-button")
    })
    it("displays a streak if multiple questions are answered correctly", () => {
      the("streak").contains("2")
      clickThe("yes-button")
      clickThe("next-button")
      const question = {
        promptText: '<p>According to the official <a href="https://v3.vuejs.org/style-guide">Vue style guide</a>, is this a good name for Vue component?</p>',
        stemText: 'the-component.vue',
      }
      route("POST", "https://thinkfast-api.sikaeducation.com/get-question", { question }).as("getQuestion")
      wait("@getQuestion")
      the("streak").contains("3")
    })
    it("stops display a streak if it's broken", () => {
      const answer = {
        isCorrect: false,
        feedback: 'feedback',
      }
      route("POST", "https://thinkfast-api.sikaeducation.com/evaluate-answer", { answer }).as("answerQuestion")
      clickThe("no-button")
      wait("@answerQuestion")
      the("streak").should("not.exist")
    })
  })
})
