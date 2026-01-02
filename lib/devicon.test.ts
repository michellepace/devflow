import { describe, expect, it } from "vitest";
import { getDeviconClassName } from "@/lib/devicon";

describe("getDeviconClassName", () => {
  describe("known icons", () => {
    it("returns correct class for react (original style)", () => {
      expect(getDeviconClassName("react")).toBe(
        "devicon-react-original colored",
      );
    });

    it("returns correct class for javascript (plain style)", () => {
      expect(getDeviconClassName("javascript")).toBe(
        "devicon-javascript-plain colored",
      );
    });

    it("returns correct class for nextjs (plain style)", () => {
      expect(getDeviconClassName("nextjs")).toBe(
        "devicon-nextjs-plain colored",
      );
    });

    it("returns correct class for tailwindcss (original style)", () => {
      expect(getDeviconClassName("tailwindcss")).toBe(
        "devicon-tailwindcss-original colored",
      );
    });

    it("returns correct class for typescript (plain style)", () => {
      expect(getDeviconClassName("typescript")).toBe(
        "devicon-typescript-plain colored",
      );
    });
  });

  describe("alias resolution", () => {
    it("resolves js to javascript", () => {
      expect(getDeviconClassName("js")).toBe(
        "devicon-javascript-plain colored",
      );
    });

    it("resolves ts to typescript", () => {
      expect(getDeviconClassName("ts")).toBe(
        "devicon-typescript-plain colored",
      );
    });

    it("resolves reactjs to react", () => {
      expect(getDeviconClassName("reactjs")).toBe(
        "devicon-react-original colored",
      );
    });

    it("resolves pugjs to pug", () => {
      expect(getDeviconClassName("pugjs")).toBe("devicon-pug-plain colored");
    });
  });

  describe("normalisation", () => {
    it("handles uppercase input", () => {
      expect(getDeviconClassName("REACT")).toBe(
        "devicon-react-original colored",
      );
    });

    it("handles mixed case input", () => {
      expect(getDeviconClassName("JavaScript")).toBe(
        "devicon-javascript-plain colored",
      );
    });

    it("trims whitespace", () => {
      expect(getDeviconClassName("  react  ")).toBe(
        "devicon-react-original colored",
      );
    });
  });

  describe("unknown tags", () => {
    it("returns null for unknown tag", () => {
      expect(getDeviconClassName("unknowntag123")).toBeNull();
    });

    it("returns null for empty string", () => {
      expect(getDeviconClassName("")).toBeNull();
    });

    it("returns null for whitespace only", () => {
      expect(getDeviconClassName("   ")).toBeNull();
    });
  });

  describe("style fallback", () => {
    // threejs only has original style (no plain)
    it("falls back to original when plain unavailable", () => {
      expect(getDeviconClassName("threejs")).toBe(
        "devicon-threejs-original colored",
      );
    });

    // aarch64 has plain and line (no original)
    it("selects plain over line when both available", () => {
      expect(getDeviconClassName("aarch64")).toBe(
        "devicon-aarch64-plain colored",
      );
    });
  });

  describe("colored option", () => {
    it("includes colored class by default", () => {
      expect(getDeviconClassName("react")).toBe(
        "devicon-react-original colored",
      );
    });

    it("excludes colored class when colored is false", () => {
      expect(getDeviconClassName("react", false)).toBe(
        "devicon-react-original",
      );
    });

    it("includes colored class when colored is true", () => {
      expect(getDeviconClassName("react", true)).toBe(
        "devicon-react-original colored",
      );
    });
  });
});
