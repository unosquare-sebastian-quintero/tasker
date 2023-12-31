import "@testing-library/jest-dom/vitest";
import { type AxeMatchers } from "vitest-axe";
import * as matchers from "vitest-axe/matchers";
import "vitest-canvas-mock";

expect.extend(matchers);

declare module "vitest" {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}

// vi.mock("zustand/vanilla");
