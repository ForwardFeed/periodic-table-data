# periodic-table-data
Serialized data for the periodic table of elements. With a web scrapper of https://periodictable.com/.


## What is it?

This project scraps the https://periodictable.com/ website.
And then makes a serialized format into a file into /data
there's:
- raw.json, a raw version that serves as intermediary between the scrapping and refining
- refined.json, a version refined, wich gives numbers that then can be used without having to parse it.

## How to use it?

you already have the data in data/
But else setup the project (see below).

## Setup
To install dependencies:

```bash
bun install
```

This project was created using `bun init` in bun v1.2.20. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

## Running it
When it downloads it will fetch all the target HTML and put it inside the cache/ folder.
No process in that program is piping to others, everything is bound to cache/ or data/ files, at one point or another.

```bash
# Note: all mutually exclusive arguments are here bundled in paragraphs (not separated by an empty line)

# This will run the download, raw, and refining
bun dev

## This will only download 
bun dev -- -d --download-only
## This will only transform to raw
bun dev -- -r --raw-only
## This will only refine
bun dev -- -f --refine-only
## This will transform to raw and refine
bun dev -- -n --no-download

## This will setup the raw and download start from element 005 aka Boron
bun dev -- -s 5 --start 5

## This will setup the raw and download to end at element 10 aka Neon
bun dev -- -e 10 --end 10
```


## Notes & Contribution

I am completely unrelated to https://periodictable.com/, however I thank them.

If you see a mistake in my scrapping, please notify me using the issues of git.

If you want to add a new format other than JSON, feel free to contribute.