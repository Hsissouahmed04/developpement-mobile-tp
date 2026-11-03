
const produits = [
    { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
    { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
    { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
    { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 }
];


for (let i = 0; i < produits.length; i++) {
    console.log(`${produits[i].nom} - ${produits[i].prix} MAD`);
}

// 2. Produits disponibles
const disponibles = produits.filter(
    produit => produit.stock > 0
);

console.log("\n=== Disponibilité ===");
console.log("Nombre de produits disponibles :", disponibles);

// 3. Valeur totale du stock
const valeurStock = produits.reduce(
    (total, produit) => total + produit.prix * produit.stock,
    0
);

console.log("Valeur totale du stock :", valeurStock, "MAD");

// 4. Produit disponible le moins cher
console.log("\n=== Prix minimal ===");

let moinsCher = null;

for (let i = 0; i < produits.length; i++) {
    if (produits[i].stock > 0) {
        if (moinsCher === null ||
            produits[i].prix < moinsCher.prix) {
            moinsCher = produits[i];
        }
    }
}

if (moinsCher === null) {
    console.log("Aucun produit disponible.");
} else {
    console.log("Produit :", moinsCher.nom);
    console.log("Prix :", moinsCher.prix, "MAD");
}

// 5. Résumé du catalogue
const resume = produits.map(
    produit => `${produit.nom} - ${produit.prix} MAD - ${produit.stock} unités`
);

console.log("\n=== Résumé du catalogue ===");
resume.forEach(ligne => console.log(ligne));

// 6. Défi : validation des données
function estValide(produit) {
    return Number.isFinite(produit.prix) &&
           produit.prix >= 0 &&
           Number.isFinite(produit.stock) &&
           produit.stock >= 0;
}


for (const produit of produits) {
    console.log(produit.nom, ":", estValide(produit) ? "Valide" : "Invalide");
}

// Déstructuration du produit le moins cher
if (moinsCher !== null) {
    const { nom, prix } = moinsCher;
    console.log("\nProduit sélectionné :", nom, "-", prix, "MAD");
}
