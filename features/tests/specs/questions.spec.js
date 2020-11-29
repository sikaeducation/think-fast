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
    the("correct-message").should("exist")
    the("incorrect-message").should("not.exist")
  })
  it("can answer a question incorrectly", () => {
    clickThe("no-button")
    the("correct-message").should("not.exist")
    the("incorrect-message").should("exist")
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
