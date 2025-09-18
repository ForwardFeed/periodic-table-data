import type { PTDCElementRaw } from "./elements_raw"
import type { PTDCElementRefined } from "./elements_refined"

const CACHE_PATH = "./cache/"
const PTDC_DATA_RAW = "./data/raw.json"
const PTDC_DATA_REFINED = "./data/refined.json"

export async function write_to_cache(filename: string, data:string){
    return Bun.write(CACHE_PATH+filename, data)
}

export async function get_data_from_cache(filename: string): Promise<string>{
    return Bun.file(CACHE_PATH + filename).text()
}

export async function write_ptdc_data_raw(content: PTDCElementRaw[]){
    Bun.write(PTDC_DATA_RAW, JSON.stringify(content, null, 2))
}

export async function get_ptdc_data_raw(): Promise<PTDCElementRaw[]>{
    return Bun.file(PTDC_DATA_RAW).json()
}

export async function write_ptdc_data_refined(content: PTDCElementRefined[]){
    Bun.write(PTDC_DATA_REFINED, JSON.stringify(content, null, 2))
}

export async function get_ptdc_data_refined(): Promise<PTDCElementRefined[]>{
    return Bun.file(PTDC_DATA_REFINED).json()
}