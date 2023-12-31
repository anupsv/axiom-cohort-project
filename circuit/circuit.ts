//This file is generated by the AxiomREPL. DO NOT DIRECTLY EDIT THIS FILE!
//To make changes, go to https://repl.axiom.xyz/ and export a new circuit.
//
//                 _                 _____  ______ _____  _
//     /\         (_)               |  __ \|  ____|  __ \| |
//    /  \   __  ___  ___  _ __ ___ | |__) | |__  | |__) | |
//   / /\ \  \ \/ / |/ _ \| '_ ` _ \|  _  /|  __| |  ___/| |
//  / ____ \  >  <| | (_) | | | | | | | \ \| |____| |    | |____
// /_/    \_\/_/\_\_|\___/|_| |_| |_|_|  \_\______|_|    |______|
//
//

import {
  Halo2Lib,
  AxiomData,
  CircuitValue
} from "@axiom-crypto/experimental/halo2-js";
import { CircuitValue256 } from "@axiom-crypto/experimental/v2/circuit/CircuitValue256";
const defaultInputs = {
  blockNumber: 9909556,
  stakeRegistry: "0x1D647B665e2Ef365d46e791a85c852ba7BF64812",
  rawSlotReference:
    "0x86dfc0930cb222883cc0138873d68c1c9864fc2fe59d208c17f3484f489bef04",
  quorumNumber: 0
};
type CircuitInputType = typeof defaultInputs;
export interface CircuitInputs extends CircuitInputType {}
export interface CircuitValueInputs {
  blockNumber: CircuitValue;
  stakeRegistry: CircuitValue;
  rawSlotReference: CircuitValue256;
  quorumNumber: CircuitValue;
}
const circuitFn = async (
  halo2Lib: Halo2Lib,
  axiomData: AxiomData,
  {
    blockNumber,
    stakeRegistry,
    rawSlotReference,
    quorumNumber
  }: CircuitValueInputs
) => {
  const { add, or, value } = halo2Lib;
  const { getStorage, addToCallback } = axiomData;

  // Get the storage at the block from the stakeRegistry
  // stakeRegistryStorage: ref to mapping(bytes32 => mapping(uint8 => OperatorStakeUpdate[]))
  const stakeRegistryStorage = getStorage(blockNumber, stakeRegistry);

  // Gets the actual value in the array of OperatorStakeUpdate.
  // storageValue: the full packed OperatorStakeUpdate value
  const slotValue = stakeRegistryStorage.slot(rawSlotReference);

  // Add to the callback so that the contract can receive it for further processing.
  addToCallback(slotValue);

  // Maybe split for the "Stake" value from the slotValue var.
};
const config = {
  k: 13,
  numAdvice: 4,
  numLookupAdvice: 1,
  numInstance: 1,
  numLookupBits: 12,
  numVirtualInstance: 2
};
const vk = [
  2,
  13,
  0,
  0,
  0,
  0,
  6,
  0,
  0,
  0,
  22,
  53,
  175,
  191,
  189,
  44,
  47,
  125,
  102,
  223,
  68,
  183,
  53,
  24,
  221,
  245,
  11,
  40,
  210,
  84,
  147,
  34,
  241,
  111,
  251,
  44,
  176,
  97,
  40,
  23,
  111,
  5,
  236,
  172,
  54,
  30,
  205,
  68,
  139,
  37,
  34,
  255,
  110,
  222,
  63,
  213,
  167,
  105,
  46,
  125,
  148,
  2,
  105,
  228,
  6,
  175,
  114,
  9,
  31,
  238,
  182,
  133,
  168,
  45,
  169,
  110,
  68,
  54,
  87,
  170,
  118,
  231,
  74,
  66,
  143,
  68,
  75,
  93,
  186,
  147,
  208,
  61,
  112,
  29,
  64,
  101,
  162,
  204,
  48,
  243,
  98,
  0,
  144,
  70,
  39,
  27,
  166,
  210,
  229,
  123,
  87,
  123,
  113,
  211,
  218,
  242,
  75,
  251,
  198,
  89,
  212,
  39,
  214,
  130,
  254,
  242,
  24,
  16,
  131,
  77,
  127,
  80,
  118,
  128,
  113,
  62,
  137,
  21,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  181,
  158,
  231,
  143,
  162,
  41,
  195,
  250,
  164,
  12,
  120,
  20,
  212,
  174,
  190,
  144,
  36,
  49,
  183,
  95,
  124,
  55,
  96,
  0,
  227,
  57,
  37,
  245,
  113,
  56,
  232,
  24,
  29,
  215,
  239,
  196,
  118,
  112,
  173,
  212,
  48,
  97,
  127,
  186,
  176,
  160,
  118,
  220,
  205,
  122,
  151,
  99,
  174,
  13,
  27,
  231,
  225,
  27,
  159,
  120,
  144,
  11,
  151,
  45,
  165,
  46,
  247,
  149,
  253,
  150,
  157,
  212,
  90,
  210,
  113,
  18,
  126,
  211,
  176,
  222,
  82,
  159,
  210,
  12,
  244,
  122,
  204,
  197,
  100,
  72,
  222,
  143,
  169,
  96,
  142,
  39,
  137,
  198,
  188,
  190,
  243,
  4,
  23,
  220,
  33,
  220,
  184,
  137,
  205,
  141,
  124,
  147,
  190,
  195,
  72,
  3,
  64,
  163,
  192,
  83,
  11,
  84,
  56,
  147,
  252,
  165,
  178,
  29,
  129,
  32,
  221,
  160,
  2,
  15,
  131,
  249,
  95,
  54,
  190,
  51,
  37,
  210,
  75,
  10,
  123,
  164,
  170,
  220,
  46,
  2,
  32,
  0,
  126,
  162,
  161,
  23,
  118,
  254,
  8,
  8,
  145,
  202,
  133,
  199,
  119,
  206,
  57,
  43,
  71,
  250,
  177,
  202,
  247,
  247,
  49,
  208,
  24,
  55,
  134,
  206,
  167,
  14,
  195,
  5,
  67,
  75,
  229,
  119,
  93,
  216,
  75,
  48,
  129,
  127,
  109,
  132,
  109,
  219,
  168,
  23,
  159,
  8,
  162,
  147,
  15,
  247,
  240,
  86,
  108,
  80,
  248,
  240,
  65,
  159,
  237,
  247,
  215,
  190,
  191,
  70,
  240,
  218,
  95,
  15,
  139,
  84,
  196,
  177,
  252,
  158,
  196,
  233,
  173,
  21,
  59,
  139,
  120,
  126,
  241,
  79,
  176,
  156,
  21,
  225,
  98,
  163,
  218,
  200,
  210,
  106,
  88,
  71,
  32,
  119,
  134,
  30,
  248,
  17,
  160,
  55,
  121,
  168,
  124,
  85,
  5,
  232,
  156,
  11,
  224,
  89,
  116,
  78,
  181,
  45,
  120,
  198,
  223,
  203,
  156,
  189,
  160,
  140,
  117,
  105,
  10,
  53,
  212,
  37,
  140,
  202,
  224,
  95,
  204,
  114,
  5,
  234,
  227,
  19,
  84,
  3,
  218,
  83,
  80,
  10,
  207,
  66,
  72,
  41,
  104,
  80,
  210,
  173,
  6,
  147,
  3,
  3,
  204,
  9,
  218,
  43,
  174,
  194,
  117,
  30,
  170,
  200,
  139,
  75,
  207,
  121,
  105,
  204,
  163,
  229,
  71,
  190,
  189,
  137,
  61,
  63,
  117,
  26,
  188,
  5,
  138,
  247,
  97,
  182,
  70,
  171,
  242,
  29,
  174,
  247,
  17,
  195,
  148,
  156,
  111,
  89,
  153,
  156,
  248,
  208,
  177,
  44,
  124,
  37,
  103,
  0,
  230,
  236,
  103,
  53,
  4,
  151,
  11,
  186,
  176,
  118,
  194,
  218,
  216,
  31,
  167,
  131,
  73,
  193,
  69,
  198,
  170,
  54,
  125,
  153,
  159,
  149,
  125,
  107,
  15,
  207,
  193,
  6,
  196,
  176,
  246,
  97,
  19,
  84,
  66,
  215,
  66,
  88,
  151,
  154,
  168,
  13,
  107,
  247,
  48,
  110,
  131,
  164,
  231,
  3,
  231,
  195,
  110,
  200,
  204,
  150,
  33,
  161,
  157,
  54,
  119,
  84,
  255,
  130,
  164,
  3,
  75,
  77,
  178,
  13,
  241,
  167,
  165,
  4
];
export const circuit = Object.freeze({
  circuit: circuitFn,
  config,
  defaultInputs,
  vk
});
