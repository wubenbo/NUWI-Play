/**
 * SCIENTIFIC AND NEUROPSYCHOLOGICAL EVIDENCE FRAMEWORK - NUWI PLAY
 * 
 * Official reference data strictly based on Self-Determination Theory (SDT),
 * Enhanced Cognitive Behavioral Therapy (CBT), and empirical peer-reviewed evidence.
 */

export interface TheoreticalFoundation {
  id: 'sdt' | 'cbt';
  title: string;
  name: string;
  acronym: string;
  principles: {
    title: string;
    description: string;
    clinicalApplication: string;
  }[];
  summary: string;
}

export interface EmpiricalEvidenceItem {
  id: string;
  domain: string;
  finding: string;
  citation: string;
  year: number | string;
  source: string;
  metric?: string;
  clinicalImplication: string;
  iconName: string;
}

export interface ActivityClinicalEvidence {
  activityId: string;
  activityName: string;
  companion: string;
  clinicalFocus: string;
  theoreticalFramework: string;
  primaryTheory: 'sdt' | 'cbt' | 'both';
  mechanismOfAction: string;
  empiricalCitation: string;
  empiricalEvidenceKey: string;
  clinicalBenefits: string[];
}

export const THEORETICAL_FOUNDATIONS: TheoreticalFoundation[] = [
  {
    id: 'sdt',
    title: 'Teoría de la Autodeterminación (SDT)',
    name: 'Self-Determination Theory',
    acronym: 'SDT',
    summary: 'Las mecánicas de progresión (puntos, insignias) satisfacen la necesidad psicológica básica de competencia, dotando de significado a las tareas terapéuticas. Los avatares y narrativas inmersivas satisfacen la vinculación social y el apego, reduciendo significativamente la ansiedad clínica.',
    principles: [
      {
        title: 'Necesidad Básica de Competencia',
        description: 'Mecánicas de progresión estructuradas (puntos, insignias, niveles) satisfacen la necesidad de logro y eficacia del infante, transformando tareas complejas en metas alcanzables y con propósito.',
        clinicalApplication: 'Refuerzo tangible en Baúl de Tesoros y Campamento Base para consolidar la autoeficacia percibida.'
      },
      {
        title: 'Vinculación Social y Apego (Relatedness)',
        description: 'Avatares mediadores (Juku, Quirqui, Pari, Lama, Wayra) y narrativas inmersivas satisfacen la necesidad de conexión y apego seguro, mitigando la amenaza y la ansiedad clínica en consulta.',
        clinicalApplication: 'El infante interactúa a través del avatar como objeto transicional, reduciendo la defensividad emocional.'
      },
      {
        title: 'Motivación Intrínseca Elevada',
        description: 'La gamificación respetuosa promueve la motivación intrínseca sostenida, eliminando la sensación de coerción o deber escolar en la práctica terapéutica.',
        clinicalApplication: 'Mayor disfrute y autorregulación espontánea durante las intervenciones.'
      }
    ]
  },
  {
    id: 'cbt',
    title: 'Terapia Cognitivo-Conductual Mejorada (CBT)',
    name: 'Enhanced Cognitive Behavioral Therapy',
    acronym: 'CBT / TCC',
    summary: 'La gamificación proporciona "entornos seguros simulados" que reducen la percepción de amenaza al procesar emociones complejas. El andamiaje progresivo (scaffolding) incrementa gradualmente la complejidad de la tarea, replicando con exactitud los protocolos de reestructuración cognitiva y exposición gradual de la TCC.',
    principles: [
      {
        title: 'Entornos Seguros Simulados',
        description: 'Espacios interactivos lúdicos donde el infante experimenta estímulos socioemocionales desafiantes bajo un umbral controlado de estrés, reduciendo la respuesta de sobresalto o evitación.',
        clinicalApplication: 'Práctica segura de respuestas asertivas y contacto con distorsiones cognitivas en entornos virtuales.'
      },
      {
        title: 'Andamiaje Gradual (Scaffolding)',
        description: 'Incremento escalonado de la dificultad que acompaña al paciente desde la identificación básica de la emoción hasta la reestructuración y generación de pensamientos alternativos.',
        clinicalApplication: 'Mapeo paso a paso en Valle de los Circuitos y Detective de Pensamientos, guiado por retroalimentación contingente.'
      },
      {
        title: 'Reestructuración Cognitiva Activa',
        description: 'Decodificación interactiva de distorsiones de pensamiento (catastrofismo, pensamiento todo-o-nada) y construcción colaborativa de alternativas funcionales.',
        clinicalApplication: 'Reparación de circuitos mentales corruptos y pruebas de realidad guiadas con diálogo socrático.'
      }
    ]
  }
];

export const EMPIRICAL_EVIDENCE_BASE: EmpiricalEvidenceItem[] = [
  {
    id: 'realtime-feedback',
    domain: 'Feedback en Tiempo Real y Control Cognitivo',
    finding: 'Recompensas inmediatas por conductas adaptativas refuerzan los principios de la TCC y optimizan significativamente el control cognitivo y la inhibición de respuestas impulsivas.',
    citation: 'PMC, 2024',
    year: 2024,
    source: 'PubMed Central (PMC) - Peer-Reviewed Neurocognitive Study',
    metric: 'Optimización del control cognitivo',
    clinicalImplication: 'La retroalimentación visual y sonora contingente consolida patrones adaptativos con mayor rapidez que la instrucción verbal aislada.',
    iconName: 'Zap'
  },
  {
    id: 'homework-adherence',
    domain: 'Adherencia a Tareas Terapéuticas Domiciliarias',
    finding: 'Gamificar las tareas terapéuticas e intersesión incrementa drásticamente la adherencia al tratamiento y reduce de manera sustancial las tasas de abandono en población pediátrica.',
    citation: 'JMIR, 2026',
    year: 2026,
    source: 'Journal of Medical Internet Research (JMIR Pediatrics & Mental Health)',
    metric: 'Reducción drástica del abandono clínico',
    clinicalImplication: 'La asignación de misiones breves por Alias + PIN garantiza la continuidad del plan terapéutico en el hogar sin fricción familiar.',
    iconName: 'TrendingUp'
  },
  {
    id: 'executive-functions',
    domain: 'Mejora en Funciones Ejecutivas',
    finding: 'El juego guiado interactivo produce mejoras medibles en memoria de trabajo, velocidad de procesamiento, autorregulación emocional y atención sostenida en la infancia.',
    citation: 'Revistas Ibero, 2023; Primary Education Study, 2025',
    year: '2023-2025',
    source: 'Revistas Científicas Iberoamericanas (2023) & Primary Education Neurocognitive Study (2025)',
    metric: 'Incremento en atención sostenida y memoria de trabajo',
    clinicalImplication: 'Entrenamiento neurocognitivo integrado con ejercicios de respiración rítmica y rastreo sensorial 5-4-3-2-1.',
    iconName: 'Brain'
  },
  {
    id: 'intrinsic-motivation',
    domain: 'Elevación de la Motivación Intrínseca',
    finding: 'Los sistemas de insignias, niveles y puntos estructurados bajo la Teoría de la Autodeterminación elevan significativamente la motivación intrínseca hacia la autoobservación emocional.',
    citation: 'Systematic Review, 2026',
    year: 2026,
    source: 'Systematic Review on Pediatric Digital Interventions and SDT',
    metric: 'Elevación significativa de la motivación intrínseca',
    clinicalImplication: 'El paciente se convierte en agente activo de su proceso terapéutico en vez de receptor pasivo.',
    iconName: 'Award'
  },
  {
    id: 'co-responsibility',
    domain: 'Corresponsabilidad y Aprobación Familiar',
    finding: 'Una intervención digital efectiva exige una corresponsabilidad articulada entre escuela, familia y clínica, sustentada por una alta tasa de aprobación parental del 71%.',
    citation: 'Redalyc, 2022; Academic Study, 2023',
    year: '2022-2023',
    source: 'Red de Revistas Científicas de América Latina y el Caribe (Redalyc, 2022) & Academic Study (2023)',
    metric: '71% de aprobación parental',
    clinicalImplication: 'Plataforma diseñada para mediación tripartita con acceso protegido por Alias y PIN sin almacenar datos sensibles.',
    iconName: 'Users'
  }
];

export const ACTIVITY_CLINICAL_EVIDENCE_MAP: Record<string, ActivityClinicalEvidence> = {
  'salar': {
    activityId: 'salar',
    activityName: 'Salar Espejo',
    companion: 'Quirqui (Respiración y Calma)',
    clinicalFocus: 'Autorregulación Emocional y Control Autonómico (TCC & SDT)',
    theoreticalFramework: 'Entorno Seguro Simulado (TCC) & Necesidad de Competencia (SDT)',
    primaryTheory: 'both',
    mechanismOfAction: 'Marcapasos respiratorio visual en 4 fases dentro de un entorno seguro simulado que reduce la percepción de amenaza fisiológica, optimizando la autorregulación.',
    empiricalCitation: 'PMC, 2024; Primary Education Study, 2025',
    empiricalEvidenceKey: 'realtime-feedback',
    clinicalBenefits: [
      'Calibración guiada de frecuencia respiratoria y tono autonómico',
      'Entorno seguro simulado que desactiva la reactividad ante la ansiedad (CBT)',
      'Retroalimentación contingente inmediata que optimiza el control cognitivo (PMC, 2024)'
    ]
  },
  'madidi': {
    activityId: 'madidi',
    activityName: 'Ciber-Bosque Madidi',
    companion: 'Juku (Calma y Presencia)',
    clinicalFocus: 'Atención Sostenida y Anclaje Sensorial (Funciones Ejecutivas)',
    theoreticalFramework: 'Entrenamiento de Atención Sostenida & Control Cognitivo (TCC)',
    primaryTheory: 'cbt',
    mechanismOfAction: 'Protocolo de grounding 5-4-3-2-1 guiado para modular la sobreactivación sensorial y fortalecer el control atencional en el momento presente.',
    empiricalCitation: 'Revistas Ibero, 2023; PMC, 2024',
    empiricalEvidenceKey: 'executive-functions',
    clinicalBenefits: [
      'Desarrollo de memoria de trabajo y foco selectivo (Revistas Ibero, 2023)',
      'Desactivación de rumiaciones intrusivas mediante anclaje somatosensorial',
      'Reducción de la amenaza afectiva en consulta pediátrica'
    ]
  },
  'valle': {
    activityId: 'valle',
    activityName: 'Valle de los Circuitos',
    companion: 'Pari (Pensamiento Flexible)',
    clinicalFocus: 'Andamiaje para Reestructuración Cognitiva (TCC)',
    theoreticalFramework: 'Andamiaje Gradual (Scaffolding TCC) & Autoeficacia (SDT)',
    primaryTheory: 'cbt',
    mechanismOfAction: 'Descomposición interactiva de distorsiones de pensamiento (catastrofismo, pensamiento todo-o-nada) con andamiaje de dificultad creciente.',
    empiricalCitation: 'PMC, 2024; JMIR, 2026',
    empiricalEvidenceKey: 'homework-adherence',
    clinicalBenefits: [
      'Andamiaje gradual que replica protocolos clínicos de reestructuración TCC',
      'Reducción de distorsiones cognitivas mediante pruebas de realidad lúdicas',
      'Mayor adherencia al tratamiento intersesión (JMIR, 2026)'
    ]
  },
  'traductor': {
    activityId: 'traductor',
    activityName: 'Escáner Ciber-Emocional',
    companion: 'Juku (Calma y Presencia)',
    clinicalFocus: 'Etiquetado Afectivo y Entorno Seguro (TCC & SDT)',
    theoreticalFramework: 'Reducción de Amenaza Afectiva & Apego Seguro con Avatar (SDT)',
    primaryTheory: 'both',
    mechanismOfAction: 'Mapeo somático de señales corporales mediado por avatar protector, promoviendo la vinculación social y disminuyendo la ansiedad de evaluación.',
    empiricalCitation: 'Primary Education Study, 2025; PMC, 2024',
    empiricalEvidenceKey: 'realtime-feedback',
    clinicalBenefits: [
      'Identificación interoceptiva de emociones en el mapa corporal',
      'Normalización de estados afectivos displacenteros sin censura',
      'Satisfacción de la necesidad de apego seguro con el avatar (SDT)'
    ]
  },
  'simulador': {
    activityId: 'simulador',
    activityName: 'Simulador de Escudos',
    companion: 'Lama (Expresión y Límites)',
    clinicalFocus: 'Habilidades Sociales y Asertividad Gradual (TCC & SDT)',
    theoreticalFramework: 'Exposición Gradual Simulada (TCC) & Competencia Social (SDT)',
    primaryTheory: 'both',
    mechanismOfAction: 'Simulador de toma de decisiones interpersonales con exposición escalonada a situaciones de presión social, retroalimentando asertividad.',
    empiricalCitation: 'PMC, 2024; Systematic Review, 2026',
    empiricalEvidenceKey: 'intrinsic-motivation',
    clinicalBenefits: [
      'Entrenamiento seguro en establecimiento de límites personales',
      'Diferenciación entre respuestas pasivas, agresivas y asertivas',
      'Refuerzo de la competencia interpersonal percibida (SDT)'
    ]
  },
  'cuentos': {
    activityId: 'cuentos',
    activityName: 'Holo-Cuentos Interactivos',
    companion: 'Pari & Aliados Andinos',
    clinicalFocus: 'Desensibilización Narrativa y Apego Social (SDT)',
    theoreticalFramework: 'Vinculación Social con Avatar (SDT) & Exposición Narrativa (TCC)',
    primaryTheory: 'sdt',
    mechanismOfAction: 'Narrativa interactiva guiada donde el paciente toma decisiones adaptativas, reforzando la autoeficacia y la resolución de dilemas socioemocionales.',
    empiricalCitation: 'Systematic Review, 2026; Redalyc, 2022',
    empiricalEvidenceKey: 'intrinsic-motivation',
    clinicalBenefits: [
      'Agencia personal y toma activa de decisiones ante dilemas morales',
      'Resolución vicaria de conflictos mediante metáforas lúdicas',
      'Fortalecimiento de la resiliencia y el coraje adaptativo'
    ]
  },
  'santuario': {
    activityId: 'santuario',
    activityName: 'Santuario Holográfico',
    companion: 'Juku (El Operador)',
    clinicalFocus: 'Imaginación Guiada y Autorregulación Emocional (TCC)',
    theoreticalFramework: 'Entorno Seguro Simulado (TCC) & Mindfulness Pediátrico',
    primaryTheory: 'cbt',
    mechanismOfAction: 'Construcción guiada de un refugio interior seguro para consolidar el autocuidado y atenuar la hiperactivación fisiológica.',
    empiricalCitation: 'Primary Education Study, 2025',
    empiricalEvidenceKey: 'executive-functions',
    clinicalBenefits: [
      'Generación de anclajes de serenidad accesibles fuera de sesión',
      'Consolidación del espacio interior seguro en el imaginario infantil',
      'Disminución del estrés percibido y la rumiación ansiosa'
    ]
  },
  'monstruos': {
    activityId: 'monstruos',
    activityName: 'Adivina el Monstruo',
    companion: 'Juku (El Operador)',
    clinicalFocus: 'Psicoeducación Emocional y Control Cognitivo (TCC)',
    theoreticalFramework: 'Feedback Inmediato & Control Cognitivo (TCC)',
    primaryTheory: 'cbt',
    mechanismOfAction: 'Externalización lúdica de emociones difíciles, transformando la sobrecarga afectiva en objetos cognitivos observables y modulables.',
    empiricalCitation: 'PMC, 2024; Revistas Ibero, 2023',
    empiricalEvidenceKey: 'realtime-feedback',
    clinicalBenefits: [
      'Externalización de estados afectivos desreguladores',
      'Reconocimiento de pistas fisiológicas y contextuales',
      'Control inhibitorio frente a reacciones emocionales impulsivas'
    ]
  },
  'memoria': {
    activityId: 'memoria',
    activityName: 'Bloques de Memoria',
    companion: 'Pari (Pensamiento Flexible)',
    clinicalFocus: 'Entrenamiento de Memoria de Trabajo y Velocidad de Procesamiento',
    theoreticalFramework: 'Optimización de Funciones Ejecutivas & Feedback Inmediato',
    primaryTheory: 'cbt',
    mechanismOfAction: 'Estimulación neurocognitiva basada en secuencias de patrones rítmicos que refuerzan la memoria visuoespacial y la atención dividida.',
    empiricalCitation: 'Revistas Ibero, 2023; PMC, 2024',
    empiricalEvidenceKey: 'executive-functions',
    clinicalBenefits: [
      'Entrenamiento directo de memoria de trabajo y foco sostenido (Revistas Ibero, 2023)',
      'Aceleración de velocidad de procesamiento perceptivo',
      'Incremento de tolerancia a la frustración ante el error'
    ]
  },
  'detective': {
    activityId: 'detective',
    activityName: 'Detective de Pensamientos',
    companion: 'Wayra (Claridad y Perspectiva)',
    clinicalFocus: 'Cuestionamiento Socrático y Reencuadre Cognitivo (TCC)',
    theoreticalFramework: 'Reestructuración Cognitiva TCC & Scaffolding',
    primaryTheory: 'cbt',
    mechanismOfAction: 'Examen de evidencias a favor y en contra de pensamientos automáticos negativos, promoviendo flexibilidad metacognitiva.',
    empiricalCitation: 'PMC, 2024; JMIR, 2026',
    empiricalEvidenceKey: 'homework-adherence',
    clinicalBenefits: [
      'Entrenamiento en diálogo socrático accesible para la infancia',
      'Diferenciación entre hechos objetivos y suposiciones subjetivas',
      'Generación autónoma de pensamientos de afrontamiento adaptativo'
    ]
  },
  'respiracion': {
    activityId: 'respiracion',
    activityName: 'Burbuja de Respiración 4-7-8',
    companion: 'Quirqui (Respiración y Calma)',
    clinicalFocus: 'Regulación Autonómica y Activación Parasimpática (TCC)',
    theoreticalFramework: 'Entorno Seguro Simulado & Calibración Autonómica',
    primaryTheory: 'cbt',
    mechanismOfAction: 'Marcapasos visual rítmico para inducir respiración diafragmática pausada, estimulando el freno vagal parasimpático.',
    empiricalCitation: 'PMC, 2024; Primary Education Study, 2025',
    empiricalEvidenceKey: 'realtime-feedback',
    clinicalBenefits: [
      'Desactivación veloz de episodios de agitación psicomotriz',
      'Incremento de la variabilidad de la frecuencia cardíaca (HRV)',
      'Facilitación de un estado basal receptivo para la intervención verbal'
    ]
  },
  'campamento': {
    activityId: 'campamento',
    activityName: 'Campamento Base',
    companion: 'Escuadrón Rescate',
    clinicalFocus: 'Motivación Intrínseca y Refuerzo Positivo (SDT)',
    theoreticalFramework: 'Teoría de la Autodeterminación (SDT) - Necesidad de Competencia',
    primaryTheory: 'sdt',
    mechanismOfAction: 'Personalización de avatares mediante Chispas de Luz ganadas en misiones, reforzando la autoeficacia y la alianza de trabajo terapéutico.',
    empiricalCitation: 'Systematic Review, 2026; JMIR, 2026',
    empiricalEvidenceKey: 'intrinsic-motivation',
    clinicalBenefits: [
      'Satisfacción de la necesidad de competencia y autonomía (SDT)',
      'Aumento sostenido de la adherencia intersesión (JMIR, 2026)',
      'Vinculación afectiva protectora con los guardianes del escuadrón'
    ]
  },
  'tesoros': {
    activityId: 'tesoros',
    activityName: 'Baúl de Tesoros',
    companion: 'Reliquias Andinas',
    clinicalFocus: 'Consolidación de Competencia y Adherencia Terapéutica (SDT)',
    theoreticalFramework: 'Sentido de Logro y Eficacia Percibida (SDT & TCC)',
    primaryTheory: 'sdt',
    mechanismOfAction: 'Galería de logros tangibles que visibiliza el progreso clínico del paciente, validando el esfuerzo y promoviendo el compromiso familiar.',
    empiricalCitation: 'JMIR, 2026; Systematic Review, 2026; Academic Study, 2023',
    empiricalEvidenceKey: 'co-responsibility',
    clinicalBenefits: [
      'Visibilidad del progreso terapéutico alcanzado',
      'Refuerzo de la corresponsabilidad clínica familiar (71% de aprobación, Academic Study 2023)',
      'Consolidación del sentido de maestría y orgullo adaptativo'
    ]
  }
};
