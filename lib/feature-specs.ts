/**
 * Specification names that describe what a product *does* rather than what it
 * measures ("Smart Functions", "Assistant Support", "Highlighted Features").
 * Shared by ProductHighlights, which shows them as a Features list, and
 * ProductAccordion, which keeps them out of the Specifications sheet.
 *
 * No imports: both consumers can be client components.
 */
export const FEATURE_SPEC_PATTERN =
  /feature|highlight|function|capabilit|support|included|control method|assistant|automation/i;

export const isFeatureSpec = (name: string) => FEATURE_SPEC_PATTERN.test(name);

/** "Voice Control, Display Screen" -> one item each; commas inside brackets stay put. */
export const featureItems = (value: string) =>
  value
    .split(/,(?![^(]*\))/)
    .map((v) => v.trim())
    .filter(Boolean);
