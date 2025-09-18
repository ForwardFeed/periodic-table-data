

/**
 * Thanks to:  https://periodictable.com/
 */


const args = Bun.argv.slice(2)

const download_only = !!~args.indexOf("-d") || !!~args.indexOf("--download-only")
