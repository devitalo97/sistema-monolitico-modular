export const transformEntityData = (props: any, type: 'db' | 'entity') => {
    let obj
    type == 'db' && (obj = Object.keys(props).reduce((output, input) => Object.assign(output, {[input.replace('_', '')]: props[input as keyof Object]}), {}))
    type == 'entity' && (obj = Object.keys(props).reduce((output, input) => Object.assign(output, {[`_${input}`]: props[input as keyof Object]}), {}))
    return obj
}
