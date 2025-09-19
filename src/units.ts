import type { PTDCElementRefined } from "./elements_refined"


export type MaybeNumber = number | "N/A"
export const Phase = [ "N/A", "gas", "liquid", "solid"] as const
export type Phase = typeof Phase[number]
export const GasAtomicMultiplicities = ["N/A", "diatomic", "monoatomic"] as const
export type GasAtomicMultiplicities = typeof GasAtomicMultiplicities[number]
export const Series = ["actinide", "alkali_metal", "alkali_earth_metal", "chalcogen", "halogen", "lanthanide",
    "noble_gas", "metalloid", "non_metal", "poor_metal", "transition_metal"] as const
export type Series = typeof Series[number]
export const Color = ["N/A", "colorless", "silver", "slate_gray", "black", "gray", "yellow", "copper", "red", "gold" ] as const
export type Color = typeof Color[number]
export const ElectricalType =  ["N/A", "conductor", "insulator", "semiconductor" ] as const
export type ElectricalType = typeof ElectricalType[number]
export const MagneticType = ["N/A", "diamagnetic", "paramagnetic", "antiferromagnetic", "ferromagnetic"] as const
export type MagneticType = typeof MagneticType[number]
export const CrystalStructure = ["N/A", "simple_hexagonal", "simple_trigonal", "face_centered_cubic", "body_centered_cubic",
    "base_centered_monoclinic", "tetrahedral_packing", "simple_triclinic", "face_centered_orthorhombic", "base_orthorhombic",
    "simple_monoclinic", "simple_orthorhombic", "centered_tetragonal", "simple_cubic"] as const
export type CrystalStructure = typeof CrystalStructure[number]
export const DecayMode = ["N/A", "beta_decay", "electron_capture", "alpha_emission", "beta_plus_decay" ] as const
export type DecayMode = typeof DecayMode[number]
export const Block = ["N/A", "s", "p", "d", "f"] as const
export type Block = typeof Block[number]
export type IsotopicAbundance = {
    isotope: string,
    percent: number
}

const MeasurementUnits = [
    "", "amu", "g/cm3", "g/l", "°C", "K", "MPa",  "kJ/mol", "J/(kg K)", "W/(m K)", "1/K", "m³/mol", "GPa", "m/s",
    "S/m", "Ω m", "m³/kg", "%", "pm", "b", "m²/kg"
] as const
export type MeasurementUnits = typeof MeasurementUnits[number] | Phase | GasAtomicMultiplicities | Series | Color | ElectricalType |
    MagneticType | CrystalStructure | DecayMode | Block


export type UnitsMap =  {[key in  keyof PTDCElementRefined ]:  MeasurementUnits | MeasurementUnits[] | readonly MeasurementUnits[]}
export const UNITS: UnitsMap = {
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
    phase: Phase,
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
    block: Block,
    group: "",
    period: "",
    series: Series,
    electron_configuration: "",
    color: Color,
    discovery: "",
    gas_phase: GasAtomicMultiplicities,
    cas_number: "",
    cid_number: "",
    electrical_type: ElectricalType,
    electrical_conductivity: "S/m",
    resistivity: "Ω m",
    superconducting_point: "K",
    magnetic_type: MagneticType,
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
    crystal_structure: CrystalStructure,
    lattice_angles: "",
    lattice_constants: "pm",
    space_group_name: "",
    space_group_number: "",
    half_life: "",
    lifetime: "",
    decay_mode: DecayMode,
    quantum_number: "",
    neutron_cross_section: "b",
    neutron_mass_absorbtion: "m²/kg",
    isotopes_known: "",
    isotopes_stable: "",
    isotopes_abundance: "%"
}
