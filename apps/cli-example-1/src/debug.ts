import debugCreator from 'debug'

export const debug = (namespace: string) => debugCreator(`cli-example-1:${namespace}`)
