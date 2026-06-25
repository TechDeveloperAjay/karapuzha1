export interface ActionResult<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export type ThemeType = "light" | "dark";
