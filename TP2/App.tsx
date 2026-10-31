
import React from "react";
import { View, Text } from "react-native";

export default function CatalogueScreen() {
    const produits = [
        { id: 1, nom: "Clavier", prix: 120, stock: 5 },
        { id: 2, nom: "Souris", prix: 80, stock: 8 },
        { id: 3, nom: "Écran", prix: 900, stock: 0 },
        { id: 4, nom: "Casque", prix: 240, stock: 3 }
    ];

    const disponibles = produits.filter(p => p.stock > 0);

    const valeurStock = produits.reduce(
        (total, p) => total + p.prix * p.stock,
        0
    );

    return (
        <View style={{ padding: 20, marginTop: 40 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                Catalogue de produits
            </Text>

            <Text>
                Nombre de produits disponibles : {disponibles.length}
            </Text>

            <Text>
                Valeur totale du stock : {valeurStock} MAD
            </Text>
        </View>
    );
}
