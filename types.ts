
interface TitledDescription {
  title: string;
  description: string;
}

export type Pattern = TitledDescription;
export type Gap = TitledDescription;
export type Hypothesis = TitledDescription;

export interface Experiment {
  title: string;
  description: string;
  methodology: string;
}

export interface AnalysisResult {
  patternsAndTrends: Pattern[];
  researchGaps: Gap[];
  hypotheses: Hypothesis[];
  suggestedExperiments: Experiment[];
}
