// import flattenDeep from 'lodash/flattenDeep'

import { RouteElement } from '@/Layouts/Routes'

const flattenDeep = (arr: any[]): any[] => {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
    []
  )
}

const generateFlattenRoutes = (routes: RouteElement[]): RouteElement[] => {
  if (!routes) return []
  return flattenDeep(
    routes.map(({ routes: subRoutes, ...rest }) => [
      rest,
      generateFlattenRoutes(subRoutes || [])
    ])
  ) as RouteElement[]
}

export default generateFlattenRoutes
