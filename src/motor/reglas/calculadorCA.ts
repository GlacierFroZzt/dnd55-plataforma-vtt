export interface ParametrosCA {
  destrezaMod: number;
  tipoArmadura: 'sinArmadura' | 'ligera' | 'media' | 'pesada';
  caBaseArmadura: number;
  tieneEscudo: boolean;
  rasgoDefensaSinArmadura?: 'barbaro' | 'monje';
  constitucionMod?: number;
  sabiduriaMod?: number;
  bonificadoresMagicos?: number;
}

export function calcularClaseArmadura(params: ParametrosCA): number {
  let ca = 10;
  const bonifEscudo = params.tieneEscudo ? 2 : 0;
  const magicos = params.bonificadoresMagicos ?? 0;

  switch (params.tipoArmadura) {
    case 'sinArmadura':
      if (params.rasgoDefensaSinArmadura === 'barbaro' && params.constitucionMod !== undefined) {
        ca = 10 + params.destrezaMod + params.constitucionMod;
      } else if (params.rasgoDefensaSinArmadura === 'monje' && params.sabiduriaMod !== undefined) {
        ca = 10 + params.destrezaMod + params.sabiduriaMod;
      } else {
        ca = 10 + params.destrezaMod;
      }
      break;

    case 'ligera':
      ca = params.caBaseArmadura + params.destrezaMod;
      break;

    case 'media':
      // Armadura media suma Destreza hasta un máximo de +2
      ca = params.caBaseArmadura + Math.min(2, Math.max(0, params.destrezaMod));
      break;

    case 'pesada':
      // Armadura pesada no suma Destreza
      ca = params.caBaseArmadura;
      break;
  }

  return ca + bonifEscudo + magicos;
}
