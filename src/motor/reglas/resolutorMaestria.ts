import { MaestriaArmaClave } from '@/esquemas/maestrias';
import { MAESTRIAS_ARMAS_55 } from '@/datos/maestrias';

export interface ContextoAtaqueMaestria {
  maestria: MaestriaArmaClave;
  impacto: boolean;
  modificadorAtaque: number;
  bonificadorCompetencia: number;
  tamanoObjetivo: 'Diminuto' | 'Pequeno' | 'Mediano' | 'Grande' | 'Enorme' | 'Gargantuesco';
}

export interface EfectoMaestriaResuelto {
  maestria: MaestriaArmaClave;
  aplicado: boolean;
  descripcionEfecto: string;
  danoGarantizadoEnFallo?: number;
  empujePies?: number;
  reduceVelocidadPies?: number;
  obligaSalvacionConstitucion?: {
    cd: number;
  };
  otorgaVentajaSiguienteAtaque?: boolean;
  imponeDesventajaSiguienteAtaque?: boolean;
  permiteAtaqueAdicionalAccionAtacar?: boolean;
}

export function resolverEfectoMaestria(contexto: ContextoAtaqueMaestria): EfectoMaestriaResuelto {
  const { maestria, impacto, modificadorAtaque, bonificadorCompetencia, tamanoObjetivo } = contexto;
  const info = MAESTRIAS_ARMAS_55[maestria];

  switch (maestria) {
    case 'roce': // Graze (daño en fallo igual al mod)
      if (!impacto) {
        const dano = Math.max(0, modificadorAtaque);
        return {
          maestria,
          aplicado: true,
          danoGarantizadoEnFallo: dano,
          descripcionEfecto: `Roce: Aunque el ataque falló, el filo roza e inflige ${dano} de daño garantizado.`,
        };
      }
      return { maestria, aplicado: false, descripcionEfecto: 'Roce no se activa en aciertos.' };

    case 'corteRapido': // Nick (ataque con arma ligera en accion de atacar)
      return {
        maestria,
        aplicado: true,
        permiteAtaqueAdicionalAccionAtacar: true,
        descripcionEfecto: 'Corte Rápido (Nick): El ataque con la segunda arma se integra en la Acción de Atacar, liberando tu Acción Adicional.',
      };

    case 'empujon': // Push (empuja 10 pies si es Grande o menor)
      if (impacto) {
        const esValido = ['Diminuto', 'Pequeno', 'Mediano', 'Grande'].includes(tamanoObjetivo);
        if (esValido) {
          return {
            maestria,
            aplicado: true,
            empujePies: 10,
            descripcionEfecto: 'Empujón: El objetivo es desplazado 10 pies en línea recta lejos de ti.',
          };
        }
        return { maestria, aplicado: false, descripcionEfecto: 'Empujón falló: El objetivo es demasiado grande (Enorme o superior).' };
      }
      return { maestria, aplicado: false, descripcionEfecto: 'Empujón solo se activa al impactar.' };

    case 'minar': // Sap (desventaja en siguiente ataque)
      if (impacto) {
        return {
          maestria,
          aplicado: true,
          imponeDesventajaSiguienteAtaque: true,
          descripcionEfecto: 'Minar (Sap): El objetivo sufre desventaja en su siguiente tirada de ataque.',
        };
      }
      return { maestria, aplicado: false, descripcionEfecto: 'Minar solo se activa al impactar.' };

    case 'ralentizar': // Slow (-10 pies de velocidad)
      if (impacto) {
        return {
          maestria,
          aplicado: true,
          reduceVelocidadPies: 10,
          descripcionEfecto: 'Ralentizar: La velocidad del objetivo se reduce en 10 pies hasta el inicio de tu próximo turno.',
        };
      }
      return { maestria, aplicado: false, descripcionEfecto: 'Ralentizar solo se activa al impactar.' };

    case 'derribo': // Topple (CD CON = 8 + mod + prof)
      if (impacto) {
        const cd = 8 + modificadorAtaque + bonificadorCompetencia;
        return {
          maestria,
          aplicado: true,
          obligaSalvacionConstitucion: { cd },
          descripcionEfecto: `Derribo (Topple): El objetivo debe superar una salvación de CON (CD ${cd}) o caer Tumbado.`,
        };
      }
      return { maestria, aplicado: false, descripcionEfecto: 'Derribo solo se activa al impactar.' };

    case 'hostigamiento': // Vex (ventaja en siguiente ataque contra el mismo objetivo)
      if (impacto) {
        return {
          maestria,
          aplicado: true,
          otorgaVentajaSiguienteAtaque: true,
          descripcionEfecto: 'Hostigamiento (Vex): Ganas ventaja en tu siguiente tirada de ataque contra este objetivo.',
        };
      }
      return { maestria, aplicado: false, descripcionEfecto: 'Hostigamiento solo se activa al impactar.' };

    case 'hendidura': // Cleave (ataque adicional a segundo objetivo a 5 pies)
      if (impacto) {
        return {
          maestria,
          aplicado: true,
          descripcionEfecto: 'Hendidura (Cleave): Puedes realizar un ataque cuerpo a cuerpo adicional contra una segunda criatura adyacente a 5 pies.',
        };
      }
      return { maestria, aplicado: false, descripcionEfecto: 'Hendidura solo se activa al impactar.' };
  }
}
