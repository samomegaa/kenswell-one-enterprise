import CheckboxControl from './CheckboxControl';
import InputControl from './InputControl';
import ReadOnlyControl from './ReadOnlyControl';
import SelectControl from './SelectControl';
import TextareaControl from './TextareaControl';

const INPUT_CONTROLS = [
  'text',
  'email',
  'telephone',
  'number',
  'date',
  'datetime',
  'currency',
  'percentage',
];

export function resolveControl(control) {
  if (INPUT_CONTROLS.includes(control)) {
    return InputControl;
  }

  if (control === 'select') {
    return SelectControl;
  }

  if (control === 'checkbox') {
    return CheckboxControl;
  }

  if (control === 'textarea') {
    return TextareaControl;
  }

  if (
    control === 'read-only' ||
    control === 'json'
  ) {
    return ReadOnlyControl;
  }

  return ReadOnlyControl;
}

export const SUPPORTED_CONTROLS =
  Object.freeze([
    ...INPUT_CONTROLS,
    'select',
    'checkbox',
    'textarea',
    'read-only',
    'json',
  ]);
