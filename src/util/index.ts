export const queryfyObj = (targetObj: { [key: string]: string }) => {
  const params = new URLSearchParams()
  for (const key in targetObj) {
    params.append(key as string, targetObj[key])
  }
  return params.toString()
}
