import { deepMerge, isPlainObject } from '../helpers/util'
import { AxiosRequestConfig } from '../types'

const strategies = Object.create(null)

function defaultStrategy(val1: any, val2: any): any {
  return val2 || val1
}

function fromVal2Strategy(val1: any, val2: any): any {
  if (val2) {
    return val2
  }
}

function deepMergeStrategy(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (val2) {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (val1) {
    return val1
  }
}

const strategyKeysFromVal2 = ['url', 'params', 'data']

strategyKeysFromVal2.forEach((key) => {
  strategies[key] = fromVal2Strategy
})

const strategyKeysDeepMerge = ['headers']

strategyKeysDeepMerge.forEach((key) => {
  strategies[key] = deepMergeStrategy
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  config2 = config2 || {}

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strategy = strategies[key] || defaultStrategy
    config[key] = strategy(config1[key], config2![key])
  }

  return config
}
