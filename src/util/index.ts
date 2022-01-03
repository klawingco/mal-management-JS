import { AnimeFields } from "../types"

export const queryfyObj = (targetObj: { [key: string]: string }) => {
  const params = new URLSearchParams()
  for (const key in targetObj) {
    params.append(key as string, targetObj[key])
  }
  return params.toString()
}

export const manageFields = (fields?:  AnimeFields[] ) =>{
  const manageFields = fields?.map((field) =>  {
    if(typeof field === 'string'){
      return field
    }
    return AnimeFields[field]

  }) || []
  return manageFields.join(',')
}
