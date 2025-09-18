import {JSDOM} from "jsdom";
import { get_data_from_cache, write_ptdc_data_raw, write_to_cache } from "./filesystem_integration";

export type PTDCElementRaw = {
    name: string,
    symbol: string
    atomic_number: number,
    atomic_weight: string,
    density: string,
    density_liquid: string,
    melting: string,
    melting_absolute: string,
    boiling: string,
    boiling_absolute: string,
    phase: string,
    critical_pressure: string,
    critial_temperature: string,
    heat_fusion: string,
    heat_vaporisation: string,
    specific_heat: string,
    adiabatic_index: string,
    neel_point: string,
    thermal_conductivity:string,
    thermal_expansion: string,
    molar_volume: string,
    hardness_brinell: string,
    hardness_mohs: string
    hardness_vickers: string,
    modulus_bulk: string,
    modulus_shear: string,
    modulus_young: string,
    ratio_poisson: string,
    refractive_index: string,
    speed_sound: string,
    valence: string,
    electronegativity: string,
    electroaffinity: string,
    ionization_energy: string,
    dot_hazard_class: string,
    dot_number: string,
    rtecs_number: string,
    nfpa_label: string,
    name_alternative: string,
    name_allotropes: string,
    block: string,
    group: string,
    period: string,
    series: string,
    electron_configuration: string,
    color: string,
    discovery: string,
    gas_phase: string,
    cas_number: string,
    cid_number: string,
    electrical_type: string,
    electrical_conductivity: string,
    resistivity: string,
    superconducting_point:string,
    magnetic_type: string,
    curie_point: string,
    magnetic_susceptibility_mass: string,
    magnetic_susceptibility_molar: string,
    magnetic_susceptibility_volume: string,
    abundance_universe: string,
    abundance_sun: string,
    abundance_meteorite: string,
    abundance_earth_crust: string,
    abundance_ocean: string,
    abundance_human: string,
    radius_atomic: string,
    radius_covalent: string,
    radius_van_der_waals: string,
    crystal_structure: string,
    lattice_angles: string,
    lattice_constants: string,
    space_group_name:string,
    space_group_number: number
    half_life: string,
    lifetime: string,
    decay_mode: string,
    quantum_number: string,
    neutron_cross_section: string,
    neutron_mass_absorbtion: string,
    isotopes_known: string[],
    isotopes_stable: string[],
    isotopes_abundance: string[]
    notes: string[]
}

const PTDCFields = [
  "Name", "Symbol", "Atomic Number", "Atomic Weight", "Density", "Melting Point", "Boiling Point",
  "Phase", "Melting Point", "Boiling Point", "Absolute Melting Point", "Absolute Boiling Point",
  "Critical Pressure", "Critical Temperature", "Heat of Fusion", "Heat of Vaporization", "Specific Heat",
  "Adiabatic Index", "Neel Point", "Thermal Conductivity", "Thermal Expansion", "Density", "Density (Liquid)",
  "Molar Volume", "Brinell Hardness", "Mohs Hardness", "Vickers Hardness", "Bulk Modulus", "Shear Modulus",
  "Young Modulus", "Poisson Ratio", "Refractive Index", "Speed of Sound", "Thermal Conductivity",
  "Thermal Expansion", "Valence", "Electronegativity", "ElectronAffinity", "Ionization Energies",
  "DOT Hazard Class", "DOT Numbers", "RTECS Number", "NFPA Label", "Alternate Names", "Names of Allotropes",
  "Block", "Group", "Period", "Series", "Electron Configuration", "Color", "Discovery", "Gas phase",
  "CAS Number", "CID Number", "RTECS Number", "Electrical Type", "Electrical Conductivity",
  "Resistivity", "Superconducting Point", "Magnetic Type", "Curie Point", "Mass Magnetic Susceptibility",
  "Molar Magnetic Susceptibility", "Volume Magnetic Susceptibility", "% in Universe", "% in Sun",
  "% in Meteorites", "% in Earth's Crust", "% in Oceans", "% in Humans", "Atomic Radius", "Covalent Radius",
  "Van der Waals Radius", "Crystal Structure", "Lattice Angles", "Lattice Constants", "Space Group Name",
  "Space Group Number", "Half-Life", "Lifetime", "Decay Mode", "Quantum Numbers", "Neutron Cross Section",
  "Neutron Mass Absorption", "Known Isotopes", "Stable Isotopes", "Isotopic Abundances"
] as const
type PTDCFields = typeof PTDCFields[number]


function get_periodictable_dotcom_data_url(atomic_number: number): string {
    // because 1 => 001
    const str_element_len = ("" + atomic_number).length
    const str_element = `${"0".repeat(3 - str_element_len)}${atomic_number}`
    return `https://periodictable.com/Elements/${str_element}/data.html`
}

function find_parent_with_tag(node: Element, tag: string): Element{
    const tagname = node.nodeName.toLowerCase()
    if (tagname == tag)
        return node
    if (!node.parentElement)
        throw `couldn't find parent with tag: ${tag}`
    return find_parent_with_tag(node.parentElement, tag)
}


function grab_data_from_tr(node: Element, field_name: PTDCFields, dom: JSDOM): {field: string, note?: string}{
    const parent = find_parent_with_tag(node, "tr")
    if (!parent) throw `Couldn't find parent`
    const sibling = parent.children[1]
    if (!sibling) throw `Couldn't find sibling`
    const has_note = sibling.querySelector('sup>a')
    let note: string | undefined = "" 
    if (has_note){ // Helium.MeltingPoint.note
        // @ts-expect-error
        const link = has_note.href.replace('about:blank#', '')
        const note_target = dom.window.document.querySelector(`a[name="${link}"]`)
        if (note_target) {
            note = note_target.textContent
                .trim()
                .replace('\n\nUp to date, curated data provided by', '')
                .replace(/\n +2/, '')
        }
        has_note.remove()
    }

    switch (field_name) {
        // @ts-expect-error
        case "NFPA Label":
            const link = sibling.querySelector('img')
            if (link) {
                return {field: link.src, note}
            }
        case "Name":
        case "Symbol":
        case "Atomic Number":
        case "Atomic Weight":
        case "Density":
        case "Melting Point":
        case "Boiling Point":
        case "Phase":
        case "Absolute Melting Point":
        case "Absolute Boiling Point":
        case "Critical Pressure":
        case "Critical Temperature":
        case "Heat of Fusion":
        case "Heat of Vaporization":
        case "Specific Heat":
        case "Adiabatic Index":
        case "Neel Point":
        case "Thermal Conductivity":
        case "Thermal Expansion":
        case "Density (Liquid)":
        case "Molar Volume":
        case "Brinell Hardness":
        case "Mohs Hardness":
        case "Vickers Hardness":
        case "Bulk Modulus":
        case "Shear Modulus":
        case "Young Modulus":
        case "Poisson Ratio":
        case "Refractive Index":
        case "Speed of Sound":
        case "Valence":
        case "Electronegativity":
        case "ElectronAffinity":
        case "Ionization Energies":
        case "DOT Hazard Class":
        case "DOT Numbers":
        case "RTECS Number":
        case "Alternate Names":
        case "Names of Allotropes":
        case "Block":
        case "Group":
        case "Period":
        case "Series":
        case "Electron Configuration":
        case "Color":
        case "Discovery":
        case "Gas phase":
        case "CAS Number":
        case "CID Number":
        case "Electrical Type":
        case "Electrical Conductivity":
        case "Resistivity":
        case "Superconducting Point":
        case "Magnetic Type":
        case "Curie Point":
        case "Mass Magnetic Susceptibility":
        case "Molar Magnetic Susceptibility":
        case "Volume Magnetic Susceptibility":
        case "% in Earth's Crust":
        case "% in Universe":
        case "% in Sun":
        case "% in Meteorites":
        case "% in Oceans":
        case "% in Humans":
        case "Atomic Radius":
        case "Covalent Radius":
        case "Van der Waals Radius":
        case "Crystal Structure":
        case "Lattice Angles":
        case "Lattice Constants":
        case "Space Group Name":
        case "Space Group Number":
        case "Half-Life":
        case "Lifetime":
        case "Decay Mode":
        case "Quantum Numbers":
        case "Neutron Cross Section":
        case "Neutron Mass Absorption":

        case "Known Isotopes":
        case "Stable Isotopes":
            if (sibling)
            if (!sibling.textContent) throw `failed to retrieve textcontent`
            return {field: sibling.textContent.replaceAll('\n', ', '), note}
            
        case "Isotopic Abundances":
            const trs = sibling.querySelectorAll('tr')
            if (!trs) throw `expected trs`
            return {field: [...trs].map(x => x.textContent).join(', '), note}
        default:
            throw `field: ${field_name}`
    }
}

function scrap_data_from_html(html_text: string): PTDCElementRaw{
    //@ts-expect-error
    const d: {[key in PTDCFields]: string}  = {}
    const dom = new JSDOM(html_text)
    const properties_nodes = [...dom.window.document.querySelectorAll('font>a')]
    let notes: string[] = []
    for (const node of properties_nodes){
        const field_name = node.textContent as PTDCFields
        if (!~PTDCFields.indexOf(field_name))
            throw `unrecognized field: ${field_name}`
        const field_data = grab_data_from_tr(node, field_name, dom)
        d[field_name] = field_data.field
        if (field_data.note) notes.push(field_data.note)
    }
    return {
        name: d["Name"],
        symbol: d["Symbol"],
        atomic_number: +d["Atomic Number"],
        atomic_weight: d["Atomic Weight"],
        density: d["Density"],
        density_liquid: d["Density (Liquid)"],
        melting: d["Melting Point"],
        melting_absolute: d["Absolute Melting Point"],
        boiling: d["Boiling Point"],
        boiling_absolute: d["Absolute Boiling Point"],
        phase: d["Phase"],
        critical_pressure: d["Critical Pressure"],
        critial_temperature: d["Critical Temperature"],
        heat_fusion: d["Heat of Fusion"],
        heat_vaporisation: d["Heat of Vaporization"],
        specific_heat: d["Specific Heat"],
        adiabatic_index: d["Adiabatic Index"],
        neel_point: d["Neel Point"],
        thermal_conductivity: d["Thermal Conductivity"],
        thermal_expansion: d["Thermal Expansion"],
        molar_volume: d["Molar Volume"],
        hardness_brinell: d["Brinell Hardness"],
        hardness_mohs: d["Mohs Hardness"],
        hardness_vickers: d["Vickers Hardness"],
        modulus_bulk: d["Bulk Modulus"],
        modulus_shear: d["Shear Modulus"],
        modulus_young: d["Young Modulus"],
        ratio_poisson: d["Poisson Ratio"],
        refractive_index: d["Refractive Index"],
        speed_sound: d["Speed of Sound"],
        valence: d["Valence"],
        electronegativity: d["Electronegativity"],
        electroaffinity: d["ElectronAffinity"],
        ionization_energy: d["Ionization Energies"],
        dot_hazard_class: d["DOT Hazard Class"],
        dot_number: d["DOT Numbers"],
        rtecs_number: d["RTECS Number"],
        nfpa_label: d["NFPA Label"],
        name_alternative: d["Alternate Names"],
        name_allotropes: d["Names of Allotropes"],
        block: d["Block"],
        group: d["Group"],
        period: d["Period"],
        series: d["Series"],
        electron_configuration: d["Electron Configuration"],
        color: d["Color"],
        discovery: d["Discovery"],
        gas_phase: d["Gas phase"],
        cas_number: d["CAS Number"],
        cid_number: d["CID Number"],
        electrical_type: d["Electrical Type"],
        electrical_conductivity: d["Electrical Conductivity"],
        resistivity: d["Resistivity"],
        superconducting_point: d["Superconducting Point"],
        magnetic_type: d["Magnetic Type"],
        curie_point: d["Curie Point"],
        magnetic_susceptibility_mass: d["Mass Magnetic Susceptibility"],
        magnetic_susceptibility_molar: d["Molar Magnetic Susceptibility"],
        magnetic_susceptibility_volume: d["Volume Magnetic Susceptibility"],
        abundance_universe: d["% in Universe"],
        abundance_sun: d["% in Sun"],
        abundance_meteorite: d["% in Meteorites"],
        abundance_earth_crust: d["% in Earth's Crust"],
        abundance_ocean: d["% in Oceans"],
        abundance_human: d["% in Humans"],
        radius_atomic: d["Atomic Radius"],
        radius_covalent: d["Covalent Radius"],
        radius_van_der_waals: d["Van der Waals Radius"],
        crystal_structure: d["Crystal Structure"],
        lattice_angles: d["Lattice Angles"],
        lattice_constants: d["Lattice Constants"],
        space_group_name: d["Space Group Name"],
        space_group_number: +d["Space Group Number"],
        half_life: d["Half-Life"],
        lifetime: d["Lifetime"],
        decay_mode: d["Decay Mode"],
        quantum_number: d["Quantum Numbers"],
        neutron_cross_section: d["Neutron Cross Section"],
        neutron_mass_absorbtion: d["Neutron Mass Absorption"],
        isotopes_known: d["Known Isotopes"].split(', '),
        isotopes_stable: d["Stable Isotopes"].split(', '),
        isotopes_abundance: d["Isotopic Abundances"].split(', '),
        notes
    } satisfies PTDCElementRaw
}

export async function periodictabledotcom_data(numbers_of_elements = 118, fetch_from_ptdc = false){
    const elements_data: PTDCElementRaw[] = []
    for (let i = 0; i < numbers_of_elements; i++){
        const element_id = i + 1
        const filepath = `element_${element_id}.html`
        if (fetch_from_ptdc){
            const url =  get_periodictable_dotcom_data_url(element_id)
            console.log(`fetching: ${url}`)
            const textdata = await fetch_html_data(url)
            await write_to_cache(filepath, textdata)
            continue
        }
        const text_html = await get_data_from_cache(filepath)
        try{
            elements_data.push(scrap_data_from_html(text_html))
        } catch(e){
            console.warn(`failed to get element ${element_id}:  ${e}`)
        }
    }
    write_ptdc_data_raw(elements_data)
    return elements_data
}


async function fetch_html_data(url: string): Promise<string>{
    return new Promise((resolve, reject)=>{
        fetch(url)
        .then((response)=>{
            if (!response.ok)
                return reject('answer was not ok')
            response.text()
            .then((text)=>{
                resolve(text)
            })
            .catch((err)=>{
                reject(`wasn't text: ${err}`)
            })
        })
        .catch((err)=>{
            reject(err)
        })
    })
}