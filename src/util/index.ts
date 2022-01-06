import {
  HTTP_METHOD,
  QueryOpts,
} from '../types'

export const queryfyObj = (targetObj: { [key: string]: string }) => {
  const params = new URLSearchParams()
  for (const key in targetObj) {
    params.append(key as string, targetObj[key])
  }
  return params.toString()
}

const manageFields = (
  fieldSource: any,
  fields?: any[],

) => {
  const _fields =
    fields?.map((field) => {
      if (typeof field === 'string') {
        return field
      }
      return fieldSource[field]
    }) || []
  return _fields.join(',')
}

export const shapeQuery = (
  URL: string,
  opts: QueryOpts,
  fieldSource?: any
) => {
  return {
    Method: HTTP_METHOD.GET,
    Url: URL,
    Query: {
      ...opts,
      fields: manageFields(fieldSource, opts?.fields),
    },
  }
}

export function shapeDataList<T extends object>(dataList: any[], injectedFunc:any, key: string = 'node', key_id = 'id' ) {
    const animeList = dataList?.map(
      (data) =>
       {
        const keyObj = key ? data[key] as any: data;
        return {
          ...keyObj,
          getDetail: (opts: any) =>
            injectedFunc({ ...opts, [key_id]: keyObj[key_id] }),
        } as T
       }
    )
    return animeList as T[]

}


