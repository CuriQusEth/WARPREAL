export const ATTRIBUTION_CODE = "WarpRealm";
export const BUILDER_CODE = "bc_no3i1h6j";

/**
 * ERC-8021: Cross-App Execution Attribution.
 * Attaches metadata to transactions so builders be recognized on-chain.
 */
export function getERC8021AttributionData() {
  // Simplistic placeholder for calldata attribution or transaction tagging.
  // In a real implementation this might encode calldata suffixes.
  return {
    attributionCode: ATTRIBUTION_CODE,
    builderCode: BUILDER_CODE,
  };
}

export function encodeAttributionCalldata(baseCalldata: `0x${string}`): `0x${string}` {
  // Placeholder: Some apps append the attribution directly to tx data
  // For now, we assume simple return of base as we don't have a specific contract ABI
  return baseCalldata;
}
