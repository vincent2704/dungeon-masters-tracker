export interface BackendCondition {
  name: string,
  permanent: boolean,
  turnsLeft: number
  exhaustionLevel?: number;
}
