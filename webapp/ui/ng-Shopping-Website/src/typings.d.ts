declare interface Confetti {
  render: () => void;
  clear: () => void;
}

declare interface ConfettiSettings {
  target: string;
  max?: number;
  size?: number;
  animate?: boolean;
  clock?: number;
  props?: ['circle', 'square', 'triangle', 'line'];
  colors?: Array<Array<number>>;
  width?: number;
  height?: number;
  rotate?: boolean;
}

declare var ConfettiGenerator: (settings: ConfettiSettings) => void;

declare interface CelebrationDialogData {
  user: string;
}
