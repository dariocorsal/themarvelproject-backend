import Character from "../models/Character.mjs";

const sampleCharacters = [
  {
    name: "Spider-Man",
    description:
      "Peter Parker, un estudiante mordido por una araña radiactiva que le otorgó habilidades sobrehumanas.",
  },
  {
    name: "Iron Man",
    description:
      "Tony Stark, genio multimillonario que usa una armadura tecnológica avanzada para proteger el mundo.",
  },
  {
    name: "Captain America",
    description:
      "Steve Rogers, un súper soldado mejorado con el suero del súper soldado durante la Segunda Guerra Mundial.",
  },
  {
    name: "Thor",
    description:
      "Dios del trueno de Asgard, empuña el poderoso martillo Mjolnir.",
  },
  {
    name: "Hulk",
    description:
      "Bruce Banner, un científico expuesto a rayos gamma que se transforma en una criatura verde gigante cuando se enfada.",
  },
  {
    name: "Black Widow",
    description:
      "Natasha Romanoff, una espía altamente entrenada y miembro de los Vengadores.",
  },
  {
    name: "Wolverine",
    description:
      "Logan, un mutante con factor de curación acelerada, sentidos mejorados y garras de adamantium.",
  },
  {
    name: "Doctor Strange",
    description:
      "Stephen Strange, un neurocirujano convertido en el Hechicero Supremo que protege la Tierra de amenazas místicas.",
  },
];

export const initializeSampleData = async () => {
  try {
    // Verificar si ya hay datos en la base de datos
    const count = await Character.countDocuments();

    if (count > 0) {
      console.log(
        `Ya existen ${count} personajes en la base de datos. No se insertarán datos de prueba.`
      );
      return;
    }

    // Insertar datos de prueba
    await Character.insertMany(sampleCharacters);
    console.log(
      `✅ Se insertaron ${sampleCharacters.length} personajes de prueba exitosamente.`
    );
  } catch (error) {
    console.error("❌ Error al inicializar datos de prueba:", error.message);
  }
};
