import { getRelativeTime } from "@/lib/utils";

describe("getRelativeTime", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-12-15T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it.each([
    // Hours and minutes (finer granularity)
    ["2025-12-15T11:59:30Z", "just now"],
    ["2025-12-15T11:59:00Z", "1 minute ago"],
    ["2025-12-15T11:55:00Z", "5 minutes ago"],
    ["2025-12-15T11:00:00Z", "1 hour ago"],
    ["2025-12-15T09:00:00Z", "3 hours ago"],
    // Basic ranges
    ["2025-12-15T08:00:00Z", "4 hours ago"],
    ["2025-12-14T12:00:00Z", "yesterday"],
    ["2025-12-12T12:00:00Z", "3 days ago"],
    ["2025-12-01T12:00:00Z", "2 weeks ago"],
    ["2025-09-15T12:00:00Z", "3 months ago"],
    ["2023-12-15T12:00:00Z", "2 years ago"],
    // Boundaries & singular forms
    ["2025-12-09T12:00:00Z", "6 days ago"],
    ["2025-12-08T12:00:00Z", "1 week ago"],
    ["2025-11-16T12:00:00Z", "4 weeks ago"],
    ["2025-11-15T12:00:00Z", "1 month ago"],
    ["2024-12-16T12:00:00Z", "12 months ago"],
    ["2024-12-15T12:00:00Z", "1 year ago"],
  ])("returns '%s' → '%s'", (input, expected) => {
    expect(getRelativeTime(new Date(input))).toBe(expected);
  });
});
