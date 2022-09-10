import { transformEntityData } from "./transformEntityData"


export function assign(data:any, props:any){
    return Object.assign(data, transformEntityData(props, 'entity'))
}