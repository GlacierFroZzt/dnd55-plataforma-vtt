import { DefinicionDote } from '@/esquemas/dote';
import { DOTES_ORIGEN_55 } from './dotesOrigen';
import { DOTES_GENERALES_55 } from './dotesGenerales';
import { ESTILOS_COMBATE_55 } from './estilosCombate';
import { BENDICIONES_EPICAS_55 } from './bendicionesEpicas';

export {
  DOTES_ORIGEN_55,
  DOTES_GENERALES_55,
  ESTILOS_COMBATE_55,
  BENDICIONES_EPICAS_55,
};

export const TODAS_LAS_DOTES_55: DefinicionDote[] = [
  ...Object.values(DOTES_ORIGEN_55),
  ...Object.values(DOTES_GENERALES_55),
  ...Object.values(ESTILOS_COMBATE_55),
  ...Object.values(BENDICIONES_EPICAS_55),
];

export const DICCIONARIO_DOTES_55: Record<string, DefinicionDote> = {
  ...DOTES_ORIGEN_55,
  ...DOTES_GENERALES_55,
  ...ESTILOS_COMBATE_55,
  ...BENDICIONES_EPICAS_55,
};
