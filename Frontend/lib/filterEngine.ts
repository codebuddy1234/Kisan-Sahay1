export function filterDataByInputs(
  data: any[],
  userInput: Record<string, any>
) {
  return data.filter(item =>
    item.inputsRequired.every(
      (key: string) => userInput[key] !== undefined
    )
  )
}
