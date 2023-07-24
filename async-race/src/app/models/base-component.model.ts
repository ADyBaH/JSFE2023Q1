export interface BaseComponentModel {
  tag?: keyof HTMLElementTagNameMap
  attribute?: Record<string, string>
  parent?: HTMLElement
}
