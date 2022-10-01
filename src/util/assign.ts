import { transform } from "./transform"


export function assign(data:any, props:any){
    return Object.assign(data, transform(props, 'entity'))
}