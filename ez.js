async function ez() {
  const objet = ["bague", "collier", "bracelet", "boucle oreille"];
  const pierre = [
    "topaze",
    "citrine",
    "sapphir",
    "citrine",
    "lapis lazulli",
    "cornaline",
    "améthyste",
    "quartz",
    "quartz rose",
    "agate",
    "agate noire",
    "agate bleue",
    "calcédoine",
    "calcédoine bleue",
    "calcédoine rose",
    "malachite",
    "ambre",
    "Apatite",
    "cristal",
    "Cyanite",
    "hémimorphite",
    "labradorite",
    "morganite",
    "nacre",
    "oeil de tigre",
    "péristérite",
    "Perle",
    "Quartz framboise",
    "rubis",
    "Spessartite",
  ];

  let i = 0;
  while (i < objet.length) {
    let cpt = 0;
    while (cpt < pierre.length) {
      console.log(objet[i], pierre[cpt].toLowerCase());
      cpt++;
    }

    if ((cpt = pierre.length)) {
      i++;
    }
  }
}

ez();
