async function ez() {
  const objet = ["collier", "bague", "bracelet", "boucle oreille"];
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
  ];

  let i = 0;
  while (i < objet.length) {
    let cpt = 0;
    while (cpt < pierre.length) {
      console.log(objet[i], pierre[cpt]);
      cpt++;
    }

    if ((cpt = pierre.length)) {
      i++;
    }
  }
}

ez();
