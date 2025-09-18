

/**
 * Thanks to:  https://periodictable.com/
 */

import { download_periodictabledotcom_data_to_cache, scrap_periodictabledotcom_data_from_cache } from "./elements_raw"
import { refine_ptdc_elements } from "./elements_refined"
import { get_ptdc_data_raw } from "./filesystem_integration"


const args = Bun.argv.slice(2)


const start_from: number = (!!~args.indexOf("-s") || !!~args.indexOf("--start")) ?
    ~args.indexOf("-s") ? +(args[args.indexOf("-s") + 1 ] || 1) : +(args[args.indexOf("--start") + 1] || 1)
    : 1 
if (isNaN(start_from)) {
    console.error('please enter an acceptable number for start from')
    process.exit(2)
}
const end_at: number = (!!~args.indexOf("-e") || !!~args.indexOf("--end")) ?
    ~args.indexOf("-e") ? +(args[args.indexOf("-e") + 1 ] || 118) : +(args[args.indexOf("--end") + 1] || 118)
    : 118
if (isNaN(end_at)) {
    console.error('please enter an acceptable number for end at')
    process.exit(3)
}
if (start_from >= end_at){
    console.error(`you can't start at ${start_from} and end at ${end_at}`)
    process.exit(1)
}

const download_only = !!~args.indexOf("-d") || !!~args.indexOf("--download-only")
if (download_only){
    console.log("downloading only the web data to cache")
    await download_periodictabledotcom_data_to_cache(start_from,end_at)
    process.exit(0)
}
const raw_only = !!~args.indexOf("-r") || !!~args.indexOf("--raw-only")
if (raw_only){
    console.log("making raw data only")
    await scrap_periodictabledotcom_data_from_cache(start_from, end_at)
    process.exit(0)
}
const refined_only = !!~args.indexOf("-f") || !!~args.indexOf("--refined-only")
if (refined_only){
    console.log("making the refined data only")
    await refine_ptdc_elements(await get_ptdc_data_raw())
    process.exit(0)
}
const no_download = !!~args.indexOf("-n") || !!~args.indexOf("--no-download")
if (no_download) {
    console.log("skipping the download: -> raw -> refined")
} else {
    console.log("doing the full process download -> cache -> raw -> refined")
    await download_periodictabledotcom_data_to_cache(start_from,end_at)
}
await scrap_periodictabledotcom_data_from_cache(start_from, end_at)
await refine_ptdc_elements(await get_ptdc_data_raw())