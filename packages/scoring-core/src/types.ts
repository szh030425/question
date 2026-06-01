export type AnswerValue = boolean | number | string | null | undefined;

export type AnswerMap = Record<string, AnswerValue>;

export type InputType = 'boolean' | 'number' | 'single';

export type ScaleType = 'additive' | 'tiered' | 'matrix' | 'algorithm' | 'placeholder';

export interface ScaleOption {
  value: string | number;
  label: string;
  patientLabel?: string;
  points: number;
}

export interface VisibleIf {
  itemId: string;
  equals: boolean | number | string;
}

export interface ScaleItem {
  id: string;
  clinicalLabel: string;
  patientPrompt: string;
  helpText?: string;
  inputType: InputType;
  scoreWhenTrue?: number;
  scoreWhenFalse?: number;
  /** For number: multiply value by this (e.g. PESI age = +1 per year) */
  scorePerUnit?: number;
  /** For number: fixed score when answered (ignore value) */
  scoreWhenAnswered?: number;
  options?: ScaleOption[];
  requiresClinician?: boolean;
  visibleIf?: VisibleIf;
  min?: number;
  max?: number;
  unit?: string;
}

export interface ScaleTier {
  id: string;
  label: string;
  minScore?: number;
  maxScore?: number;
  patientSummary: string;
  clinicianNote?: string;
  actionHint?: string;
}

export interface Eligibility {
  gender?: 'female' | 'male';
  notes?: string;
  /** Show warning if condition not met but allow proceed */
  soft?: boolean;
}

export interface ScaleDefinition {
  id: string;
  name: string;
  nameEn?: string;
  category: string;
  categoryLabel: string;
  description: string;
  scenario: string;
  reference: string;
  year?: string;
  type: ScaleType;
  status: 'live' | 'placeholder' | 'pending';
  estimatedItems?: number;
  needsLab?: boolean;
  eligibility?: Eligibility;
  items: ScaleItem[];
  tiers: ScaleTier[];
  /** For additive: inclusive min/max per tier */
  tierMode?: 'range' | 'threshold';
  disclaimers: string[];
  formulaNote?: string;
  /** Algorithm-specific handler id */
  algorithmId?: string;
}

export interface BreakdownLine {
  itemId: string;
  clinicalLabel: string;
  patientPrompt: string;
  answerDisplay: string;
  points: number;
  skipped?: boolean;
}

export interface ScaleResult {
  scaleId: string;
  totalScore: number;
  tierId: string;
  tierLabel: string;
  patientSummary: string;
  actionHint?: string;
  clinicianNote?: string;
  breakdown: BreakdownLine[];
  warnings: string[];
  incomplete: boolean;
  /** For matrix/algorithm non-numeric outcomes */
  outcomeLabel?: string;
}
