import type { PTDCElementRaw } from "./elements_raw";
import { write_ptdc_data_refined } from "./filesystem_integration";

type MeasurementUnits = "" | "amu" | "g/cm3" | "g/l" | "°C" | "K" | "MPa"| "kJ/mol" | "J/(kg K)" | "W/(m K)" | "1/K" | "m³/mol" | "GPa" | "m/s" |
    "S/m" | "Ω m" | "m³/kg" | "%" | "pm" | "b" | "m²/kg"

export const UNITS: {[key in  keyof PTDCElementRefined ]: MeasurementUnits | MeasurementUnits[]} = {
    symbol: "",
    name: "",
    atomic_number: "",
    atomic_weight: "amu",
    density: ["g/cm3", "g/l"],
    density_liquid: ["g/cm3", "g/l"],
    melting: "°C",
    melting_absolute: "K",
    boiling: "°C",
    boiling_absolute: "K",
    phase: "",
    critical_pressure: "MPa",
    critial_temperature: "K",
    heat_fusion: "kJ/mol",
    heat_vaporisation: "kJ/mol",
    specific_heat: "J/(kg K)",
    adiabatic_index: "",
    neel_point: "K",
    thermal_conductivity: "W/(m K)",
    thermal_expansion: "1/K",
    molar_volume: "m³/mol",
    hardness_brinell: "MPa",
    hardness_mohs: "",
    hardness_vickers: "MPa",
    modulus_bulk: "GPa",
    modulus_shear: "GPa",
    modulus_young: "GPa",
    ratio_poisson: "",
    refractive_index: "",
    speed_sound: "m/s",
    valence: "",
    electronegativity: "",
    electroaffinity: "kJ/mol",
    ionization_energy: "kJ/mol",
    dot_hazard_class: "",
    dot_number: "",
    rtecs_number: "",
    nfpa_label: "",
    name_alternative: "",
    name_allotropes: "",
    block: "",
    group: "",
    period: "",
    series: "",
    electron_configuration: "",
    color: "",
    discovery: "",
    gas_phase: "",
    cas_number: "",
    cid_number: "",
    electrical_type: "",
    electrical_conductivity: "S/m",
    resistivity: "Ω m",
    superconducting_point: "K",
    magnetic_type: "",
    curie_point: "K",
    magnetic_susceptibility_mass: "m³/kg",
    magnetic_susceptibility_molar: "m³/mol",
    magnetic_susceptibility_volume: "m³/mol",
    abundance_universe: "%",
    abundance_sun: "%",
    abundance_meteorite: "%",
    abundance_earth_crust: "%",
    abundance_ocean: "%",
    abundance_human: "%",
    radius_atomic: "pm",
    radius_covalent: "pm",
    radius_van_der_waals: "pm",
    crystal_structure: "",
    lattice_angles: "",
    lattice_constants: "pm",
    space_group_name: "",
    space_group_number: "",
    half_life: "",
    lifetime: "",
    decay_mode: "",
    quantum_number: "",
    neutron_cross_section: "b",
    neutron_mass_absorbtion: "m²/kg",
    isotopes_known: "",
    isotopes_stable: "",
    isotopes_abundance: "%"
}

export type MaybeNumber = number | "N/A"
export type Phase = "" | "gas" | "liquid" | "solid"
export type GasAtomicMultiplicities = "" | "diatomic" | "monoatomic"
export type Series = "actinide" | "alkali_metal" | "alkali_earth_metal" | "chalcogen" | "halogen" | "lanthanide" |
    "noble_gas" | "metalloid" | "non_metal" | "poor_metal" | "transition_metal"
export type Color = "" | "colorless" | "silver" | "slate_gray" | "black" | "gray" | "yellow" | "copper" | "red" | "gold" 
export type ElectricalType = "" | "conductor" | "insulator" | "semiconductor" 
export type MagneticType = "" | "diamagnetic" | "paramagnetic" | "antiferromagnetic" | "ferromagnetic"
export type CrystalStructure = "" | "simple_hexagonal" | "simple_trigonal" | "face_centered_cubic" | "body_centered_cubic" |
    "base_centered_monoclinic" | "tetrahedral_packing" | "simple_triclinic" | "face_centered_orthorhombic" | "base_orthorhombic" |
    "simple_monoclinic" | "simple_orthorhombic"
export type DecayMode = "" | "beta_decay" | "electron_capture" | "alpha_emission" | "beta_plus_decay" 
export type Block = "" | "s" | "p" | "d" | "f"
export type IsotopicAbundance = {
    isotope: string,
    percent: number
}
export type PTDCElementRefined = {
    name: string,
    symbol: string
    atomic_number: MaybeNumber,
    atomic_weight: MaybeNumber,
    density: MaybeNumber,
    density_liquid: MaybeNumber,
    melting: MaybeNumber,
    melting_absolute: MaybeNumber,
    boiling: MaybeNumber,
    boiling_absolute: MaybeNumber,
    phase: Phase,
    critical_pressure: MaybeNumber,
    critial_temperature: MaybeNumber,
    heat_fusion: MaybeNumber,
    heat_vaporisation: MaybeNumber,
    specific_heat: MaybeNumber,
    adiabatic_index: string,
    neel_point: MaybeNumber,
    thermal_conductivity:MaybeNumber,
    thermal_expansion: MaybeNumber,
    molar_volume: MaybeNumber,
    hardness_brinell: MaybeNumber,
    hardness_mohs: MaybeNumber
    hardness_vickers: MaybeNumber,
    modulus_bulk: MaybeNumber,
    modulus_shear: MaybeNumber,
    modulus_young: MaybeNumber,
    ratio_poisson: MaybeNumber,
    refractive_index: MaybeNumber,
    speed_sound: MaybeNumber,
    valence: MaybeNumber,
    electronegativity: MaybeNumber,
    electroaffinity: MaybeNumber,
    ionization_energy: MaybeNumber[],
    dot_hazard_class: string,
    dot_number: string,
    rtecs_number: string,
    nfpa_label: string,
    name_alternative: string,
    name_allotropes: string,
    block: string,
    group: MaybeNumber,
    period: MaybeNumber,
    series: Series,
    electron_configuration: string,
    color: Color,
    discovery: string,
    gas_phase: GasAtomicMultiplicities,
    cas_number: string,
    cid_number: string,
    electrical_type: ElectricalType,
    electrical_conductivity: MaybeNumber,
    resistivity: MaybeNumber,
    superconducting_point:MaybeNumber,
    magnetic_type: MagneticType,
    curie_point: MaybeNumber,
    magnetic_susceptibility_mass: MaybeNumber,
    magnetic_susceptibility_molar: MaybeNumber,
    magnetic_susceptibility_volume: MaybeNumber,
    abundance_universe: MaybeNumber,
    abundance_sun: MaybeNumber,
    abundance_meteorite: MaybeNumber,
    abundance_earth_crust: MaybeNumber,
    abundance_ocean: MaybeNumber,
    abundance_human: MaybeNumber,
    radius_atomic: MaybeNumber,
    radius_covalent: MaybeNumber,
    radius_van_der_waals: MaybeNumber,
    crystal_structure: CrystalStructure,
    lattice_angles: [string, string, string] | undefined,
    lattice_constants: [number, number, number] | undefined,
    space_group_name:string,
    space_group_number: MaybeNumber
    half_life: string,
    lifetime: string,
    decay_mode: DecayMode,
    quantum_number: string,
    neutron_cross_section: MaybeNumber,
    neutron_mass_absorbtion: MaybeNumber,
    isotopes_known: string[],
    isotopes_stable: string[],
    isotopes_abundance: IsotopicAbundance[]

}

function c_phase(str: string): Phase{
    switch (str){
        case "Gas":
            return "gas"
        case "Liquid":
            return "liquid"
        case "Solid":
            return "solid"
        case "N/A":
            return ""
        default:
            throw `unknow c_phase: ${str}`
    }
}
function c_gas_phase(str: string): GasAtomicMultiplicities{
    switch (str){
        case "N/A":
            return ""
        case "Diatomic":
            return "diatomic"
        case "Monoatomic":
            return "monoatomic"
        default:
            throw `unknow c_gas_phase: ${str}`
    }
}

function c_series(str: string): Series{
    switch (str){
        case "Actinide":
            return "actinide"
        case "Alkali Metal":
            return "alkali_metal"
        case "Alkaline Earth Metal":
            return "alkali_earth_metal"
        case "Chalcogen":
            return "chalcogen"
        case "Halogen":
            return "halogen"
        case "Lanthanide":
            return "lanthanide"
        case "Noble Gas":
            return "noble_gas"
        case "Metalloid":
            return "metalloid"
        case "Nonmetal":
            return "non_metal"
        case "Poor Metal":
            return "poor_metal"
        case "Transition Metal":
            return "transition_metal"
        default:
            throw `unknown c_series: ${str}`
    }
}
function c_color(str: string): Color{
    switch (str){
        case "N/A":
            return ""
        case "Colorless":
            return "colorless"
        case "Silver":
            return "silver"
        case "SlateGray":
            return "slate_gray"
        case "Black":
            return "black"
        case "Gray":
            return "gray"
        case "Yellow":
            return "yellow"
        case "Copper":
            return "copper"
        case "Red":
            return "red"
        case "Gold":
            return "gold"
        default:
            throw `unknown c_color: ${str}`
    }
}
function c_electrical_type(str: string): ElectricalType{
    switch (str){
        case "N/A":
            return ""
        case "Conductor":
            return "conductor"
        case "Insulator":
            return "insulator"
        case "Semiconductor":
            return "conductor"
        default:
            throw `unknown c_electrical_type: ${str}`
    }
}
function c_magnetic_type(str: string): MagneticType{
    switch (str){
        case "N/A":
            return ""
        case "Diamagnetic":
            return "diamagnetic"
        case "Paramagnetic":
            return "paramagnetic"
        case "Antiferromagnetic":
            return "antiferromagnetic"
        case "Ferromagnetic":
            return "ferromagnetic"
        default:
            throw `unknown c_magnetic_type: ${str}`
    }
}

function c_crystal_structure(str: string): CrystalStructure{
    switch (str){
        case "Simple Hexagonal":
            return ""
        case "Face-centered Cubic":
            return ""
         case "Body-centered Cubic":
            return ""
        case "Simple Trigonal":
            return ""
        case"Base-centered Monoclinic":
            return ""
        case "Tetrahedral Packing":
            return ""
        case"Simple Triclinic":
            return ""
        case "Face-centered Orthorhombic":
            return ""
        case "Base Orthorhombic":
            return ""
        case "Simple Monoclinic":
            return ""
        case "Centered Tetragonal":
            return ""
        case "N/A":
            return ""
        case "Simple Cubic":
            return ""
        case"Simple Orthorhombic":
            return ""
        default:
            throw `unknown c_crystal_structure: ${str}` 
    }
}
function c_decay_mode(str: string): DecayMode{
    switch (str){
        case "N/A":
            return ""
        case "BetaDecay":
            return "beta_decay"
        case "ElectronCapture":
            return "electron_capture"
        case "AlphaEmission":
            return "alpha_emission"
        case "BetaPlusDecay":
            return "beta_plus_decay"
        default:
            throw `unknown c_decay_mode: ${str}`
    }
}

function c_block(str: string): Block{
    switch (str){
        case "N/A":
            return ""
        case "s":
            return "s"
        case "p":
            return "p"
        case "d":
            return "d"
        case "f": 
            return "f"
        default:
            throw `unknown c_block: ${str}`
    }
}

function c_nfpa_label(str: string): string{
    return str.replace('../../', 'https://periodictable.com/')
}

function c_ionization(str: string): number[]{
    if (str == "N/A")
        return []

    const list = str .replace('kJ/mol', '')
        .replaceAll(',', '')
        .split(' ')
        .slice(0, -1)
        .map(x => +x)
    if (~list.findIndex(x => { return isNaN(x) || x == null}))
        throw `couldn't make a number series of: ${str}`
    return list
}

function c_isotopes_abundance(isotopes: string[]): IsotopicAbundance[]{
    return isotopes.map((x, i) => {
        const isotope = x.replace(/[0-9\.]+%/, '') 
        const percent = to_n_mu(x.replace(isotope, ''), '%')
        if (percent == "N/A")
            throw `c_isotopes_abundance didn't expected ${isotope[i]} percent value`
        return {
            isotope: isotope,
            percent
        } satisfies IsotopicAbundance
    })
}

function c_lattice_angles(angles: string): [string, string, string]  | undefined{
    if (angles == "N/A")
        return undefined
    const list = angles.split(', ')
    if (list.length != 3)
        throw `c_lattice_angles: ${angles} did not expect a length of ${list.length}`
    const e1 = list[0] ?? "N/A"
    const e2 = list[1] ?? "N/A"
    const e3 = list[2] ?? "N/A"
    return [e1, e2, e3]
}

function c_lattice_constant(lattice_constant: string): [number, number, number] | undefined{
    if (lattice_constant == "N/A"){
        return undefined
    }
    const list = lattice_constant.replace(' pm', '')
        .split(', ')
    if (list.length != 3)
        throw `c_lattice_constant: ${lattice_constant}, did not expect a length of ${list.length}`
    const e1 = +(list[0] ?? NaN)
    const e2 = +(list[1] ?? NaN)
    const e3 = +(list[2] ?? NaN)
    const return_list = [e1, e2, e3] 
    if (~return_list.findIndex(x => isNaN(x)))
        throw `c_lattice_constant: ${lattice_constant}, bad list: ${return_list}`
    // @ts-expect-error kys typescript
    return return_list
}

function to_n(str: string): MaybeNumber{
    if (str == "N/A"){
        return "N/A"
    }
    const simple = +str
    if (! isNaN(simple))
        return simple
    
    
    // @ts-expect-error ts being dumb here, split ALWAYS return an array of length one
    const first_word: string = str.split(' ')[0]
    if (! isNaN(+first_word)){
        return +first_word
    }

    const is_x10 = +first_word.replace('×10', 'e')
    if (! isNaN(is_x10)){
        return is_x10
    }
    throw `string: ${str} cannot be transformed to number`
    
}

function to_n_mu(str: string, units: MeasurementUnits | MeasurementUnits[]): MaybeNumber{
    if (typeof units === "string"){
        units = [units]
    }
    const no_unit_str = units.reduce((cumu, curr)=>{
        return cumu.replace(curr, '')
    }, str)
    return to_n(no_unit_str)
}

function convert_raw_to_refined(e: PTDCElementRaw): PTDCElementRefined{
    
    try {
        return {
            name: e.name,
            symbol: e.symbol,
            atomic_number: e.atomic_number,
            atomic_weight: to_n_mu(e.atomic_weight, UNITS.atomic_weight),
            density: to_n_mu(e.density, UNITS.density),
            density_liquid: to_n_mu(e.density_liquid, UNITS.density_liquid),
            melting: to_n_mu(e.melting, UNITS.melting),
            melting_absolute: to_n_mu(e.melting_absolute, UNITS.melting_absolute),
            boiling: to_n_mu(e.boiling, UNITS.boiling),
            boiling_absolute: to_n_mu(e.boiling_absolute, UNITS.boiling_absolute),
            phase: c_phase(e.phase),
            critical_pressure: to_n_mu(e.critical_pressure, UNITS.critical_pressure),
            critial_temperature: to_n_mu(e.critial_temperature, UNITS.critial_temperature),
            heat_fusion: to_n_mu(e.heat_fusion, UNITS.heat_fusion),
            heat_vaporisation: to_n_mu(e.heat_vaporisation, UNITS.heat_vaporisation),
            specific_heat: to_n_mu(e.specific_heat, UNITS.specific_heat),
            adiabatic_index: e.adiabatic_index,
            neel_point: to_n_mu(e.neel_point, UNITS.neel_point),
            thermal_conductivity: to_n_mu(e.thermal_conductivity, UNITS.thermal_conductivity),
            thermal_expansion: to_n_mu(e.thermal_expansion, UNITS.thermal_expansion),
            molar_volume: to_n_mu(e.molar_volume, UNITS.molar_volume),
            hardness_brinell: to_n_mu(e.hardness_brinell, UNITS.hardness_brinell),
            hardness_mohs: to_n_mu(e.hardness_mohs, UNITS.hardness_mohs),
            hardness_vickers: to_n_mu(e.hardness_vickers, UNITS.hardness_vickers),
            modulus_bulk: to_n_mu(e.modulus_bulk, UNITS.modulus_bulk),
            modulus_shear: to_n_mu(e.modulus_shear, UNITS.modulus_shear),
            modulus_young: to_n_mu(e.modulus_young, UNITS.modulus_young),
            ratio_poisson: to_n_mu(e.ratio_poisson, UNITS.ratio_poisson),
            refractive_index: to_n_mu(e.refractive_index, UNITS.refractive_index),
            speed_sound: to_n_mu(e.speed_sound, UNITS.speed_sound),
            valence: to_n_mu(e.valence, UNITS.valence),
            electronegativity: to_n_mu(e.electronegativity, UNITS.electronegativity),
            electroaffinity: to_n_mu(e.electroaffinity, UNITS.electroaffinity),
            ionization_energy: c_ionization(e.ionization_energy),
            dot_hazard_class: e.dot_hazard_class,
            dot_number: e.dot_number,
            rtecs_number: e.rtecs_number,
            nfpa_label: c_nfpa_label(e.nfpa_label),
            name_alternative: e.name_alternative,
            name_allotropes: e.name_allotropes,
            block: c_block(e.block),
            group: to_n_mu(e.group, UNITS.group),
            period: to_n_mu(e.period, UNITS.period),
            series: c_series(e.series),
            electron_configuration: e.electron_configuration,
            color: c_color(e.color),
            discovery: e.discovery,
            gas_phase: c_gas_phase(e.gas_phase),
            cas_number: e.cas_number,
            cid_number: e.cid_number,
            electrical_type: c_electrical_type(e.electrical_type),
            electrical_conductivity: to_n_mu(e.electrical_conductivity, UNITS.electrical_conductivity),
            resistivity: to_n_mu(e.resistivity, UNITS.resistivity),
            superconducting_point: to_n_mu(e.superconducting_point, UNITS.superconducting_point),
            magnetic_type: c_magnetic_type(e.magnetic_type),
            curie_point: to_n_mu(e.curie_point, UNITS.curie_point),
            magnetic_susceptibility_mass: to_n_mu(e.magnetic_susceptibility_mass, UNITS.magnetic_susceptibility_mass),
            magnetic_susceptibility_molar: to_n_mu(e.magnetic_susceptibility_molar, UNITS.magnetic_susceptibility_molar),
            magnetic_susceptibility_volume: to_n_mu(e.magnetic_susceptibility_volume, UNITS.magnetic_susceptibility_volume),
            abundance_universe: to_n_mu(e.abundance_universe, UNITS.abundance_universe),
            abundance_sun: to_n_mu(e.abundance_sun, UNITS.abundance_sun),
            abundance_meteorite: to_n_mu(e.abundance_meteorite, UNITS.abundance_meteorite),
            abundance_earth_crust: to_n_mu(e.abundance_earth_crust, UNITS.abundance_earth_crust),
            abundance_ocean: to_n_mu(e.abundance_ocean, UNITS.abundance_ocean),
            abundance_human: to_n_mu(e.abundance_human, UNITS.abundance_human),
            radius_atomic: to_n_mu(e.radius_atomic, UNITS.radius_atomic),
            radius_covalent: to_n_mu(e.radius_covalent, UNITS.radius_covalent),
            radius_van_der_waals: to_n_mu(e.radius_van_der_waals, UNITS.radius_van_der_waals),
            crystal_structure: c_crystal_structure(e.crystal_structure),
            lattice_angles: c_lattice_angles(e.lattice_angles),
            lattice_constants: c_lattice_constant(e.lattice_constants),
            space_group_name: "",
            space_group_number: e.space_group_number,
            half_life: e.half_life,
            lifetime: e.lifetime,
            decay_mode: c_decay_mode(e.decay_mode),
            quantum_number: e.quantum_number,
            neutron_cross_section: to_n_mu(e.neutron_cross_section, UNITS.neutron_cross_section),
            neutron_mass_absorbtion: to_n_mu(e.neutron_cross_section, UNITS.neutron_cross_section),
            isotopes_known: e.isotopes_known,
            isotopes_stable: e.isotopes_stable,
            isotopes_abundance: c_isotopes_abundance(e.isotopes_abundance)
        } satisfies PTDCElementRefined
    } catch(err){
        console.warn(`element: ${e.name} couldn't be parsed: ${err}`)
        return {} as PTDCElementRefined
    }
}


export async function refine_ptdc_elements(elements: PTDCElementRaw[]){
    const refined_elements: PTDCElementRefined[] = elements.map(convert_raw_to_refined)
    await write_ptdc_data_refined(refined_elements)
}