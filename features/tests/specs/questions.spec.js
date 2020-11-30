const { get, visit, the, clickThe } = cy

describe("Viewing questions", () => {
  beforeEach(() => {
    visit("/")
  })
  it("shows a question", () => {
    the("prompt").contains("AppIndex.vue")
  })
})

describe("Answering questions", () => {
  beforeEach(() => {
    visit("/")
  })
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
    visit("/")
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
