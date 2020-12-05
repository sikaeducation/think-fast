const { reasons } = require("../dist/reasons")
const {
  multipleWords, prefixBase, prefixThe, prefixApp,
  endsWithModifer, abbreviations, snakeCase, startsWithModifer,
  singleWord, fileKebabCase, filePascalCase, componentPascalCase,
  componentKebabCase, variablePascalCase, camelCase, variableNoKebabCase,
} = reasons

describe("Reasons", () => {
  describe("#multipleWords", () => {
    it("accepts a good stem", () => {
      expect(multipleWords.check("MultipleWords")).toBe(true)
    })
    it("rejects a bad stem", () => {
      expect(multipleWords.check("Word")).toBe(false)
    })
  })
  describe("#prefixBase", () => {
    it("accepts a good stem", () => {
      expect(prefixBase.check("BaseButton")).toBe(true)
    })
    it("rejects a bad stem", () => {
      expect(prefixBase.check("Button")).toBe(false)
    })
  })
  describe("#prefixThe", () => {
    it("accepts a good stem", () => {
      expect(prefixThe.check("TheButton")).toBe(true)
    })
    it("rejects a bad stem", () => {
      expect(prefixThe.check("Button")).toBe(false)
    })
  })
  describe("#prefixApp", () => {
    it("accepts a good stem", () => {
      expect(prefixApp.check("AppButton")).toBe(true)
    })
    it("rejects a bad stem", () => {
      expect(prefixApp.check("Button")).toBe(false)
    })
  })
  describe("#endsWithModifer", () => {
    it("accepts a good stem", () => {
      expect(endsWithModifer.check("ButtonActive")).toBe(true)
    })
    it("rejects a bad stem", () => {
      expect(endsWithModifer.check("ActiveButton")).toBe(false)
    })
  })
  describe("#abbreviations", () => {
    it("accepts a matching stem", () => {
      expect(abbreviations.check("btn")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(abbreviations.check("Button")).toBe(false)
    })
  })
  describe("#snakeCase", () => {
    it("accepts a matching stem", () => {
      expect(snakeCase.check("the_words")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(snakeCase.check("thewords")).toBe(false)
    })
  })
  describe("#startsWithModifer", () => {
    it("accepts a matching stem", () => {
      expect(startsWithModifer.check("ActiveButton")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(startsWithModifer.check("ButtonActive")).toBe(false)
    })
  })
  describe("#startsWithModifer", () => {
    it("accepts a matching stem", () => {
      expect(startsWithModifer.check("ActiveButton")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(startsWithModifer.check("ButtonActive")).toBe(false)
    })
  })
  describe("#singleWord", () => {
    it("accepts a matching stem", () => {
      expect(singleWord.check("button")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(singleWord.check("ButtonActive")).toBe(false)
    })
  })
  describe("#camelCase", () => {
    it("accepts a matching stem", () => {
      expect(camelCase.check("theButton")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(camelCase.check("TheButton")).toBe(false)
    })
  })
  describe("#fileKebabCase", () => {
    it("accepts a matching stem", () => {
      expect(fileKebabCase.check("file-kebab-case")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(fileKebabCase.check("fileKebabCase")).toBe(false)
    })
    it("rejects a non-matching stem", () => {
      expect(fileKebabCase.check("FileKebabCase")).toBe(false)
    })
    it("rejects a non-matching stem", () => {
      expect(fileKebabCase.check("file_kebab_case")).toBe(false)
    })
  })
  describe("#filePascalCase", () => {
    it("accepts a matching stem", () => {
      expect(filePascalCase.check("FilePascalCase")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(filePascalCase.check("filePascalCase")).toBe(false)
    })
    it("rejects a non-matching stem", () => {
      expect(filePascalCase.check("file-pascal-case")).toBe(false)
    })
    it("rejects a non-matching stem", () => {
      expect(filePascalCase.check("file_pascal_case")).toBe(false)
    })
  })
  describe("#ComponentPascalCase", () => {
    it("accepts a matching stem", () => {
      expect(componentPascalCase.check("ComponentPascalCase")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(componentPascalCase.check("componentPascalCase")).toBe(false)
    })
    it("rejects a non-matching stem", () => {
      expect(componentPascalCase.check("component-pascal-case")).toBe(false)
    })
    it("rejects a non-matching stem", () => {
      expect(componentPascalCase.check("component_pascal_case")).toBe(false)
    })
  })
  describe("#ComponentKebabCase", () => {
    it("accepts a matching stem", () => {
      expect(componentKebabCase.check("component-kebab-case")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(componentKebabCase.check("componentKebabCase")).toBe(false)
    })
    it("rejects a non-matching stem", () => {
      expect(componentKebabCase.check("ComponentKebabCase")).toBe(false)
    })
    it("rejects a non-matching stem", () => {
      expect(componentKebabCase.check("component_kebab_case")).toBe(false)
    })
  })
  describe("#VariablePascalCase", () => {
    it("accepts a matching stem", () => {
      expect(variablePascalCase.check("VariablePascalCase")).toBe(true)
    })
    it("rejects a non-matching stem", () => {
      expect(variablePascalCase.check("variablePascalCase")).toBe(false)
    })
    it("rejects a non-matching stem", () => {
      expect(variablePascalCase.check("variable-pascal-case")).toBe(false)
    })
    it("rejects a non-matching stem", () => {
      expect(variablePascalCase.check("variable_pascal_case")).toBe(false)
    })
  })
  describe("#VariableNoKebabCase", () => {
    it("accepts a matching stem", () => {
      expect(variableNoKebabCase.check("variable-kebab-case")).toBe(true)
    })
    it("accepts a matching stem", () => {
      expect(variableNoKebabCase.check("VariablePascalCase")).toBe(false)
    })
  })
})
