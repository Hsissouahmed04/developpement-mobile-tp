import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";


type Evenement ={
  Id: string;
  Titre: string;
  Categorie: string;
  Capacite: number;
  Inscrits: number;
};

const evenements: Evenement[]= [
  {Id: 'E01', Titre: 'Atelier React', Categorie: 'Atelier', Capacite: 25, Inscrits: 25},
  {Id: 'E02', Titre: 'Conference IA', Categorie: 'Conference', Capacite: 70, Inscrits: 52},
  {Id: 'E03', Titre: 'Securite mobile', Categorie: 'Atelier', Capacite: 20, Inscrits: 17},
  {Id: 'E04', Titre: 'Design UI', Categorie: 'Atelier', Capacite: 18, Inscrits: 9},
  {Id: 'E05', Titre: 'Forum projets', Categorie: 'Rencontre', Capacite: 50, Inscrits: 49},
  {Id: 'E06', Titre: 'Decouverte Git', Categorie: 'Atelier', Capacite: 24, Inscrits: 24},
];

function placesRestantes(e: Evenement) :number{
  return Math.max(0, e.Capacite-e.Inscrits);
}

const statut = {
  complet: "complet",
  presqueComplet: "presque complet",
  ouvert: "ouvert",
}

function statuEvenement(e: Evenement): string{
  const places= placesRestantes(e);
  if(places==0){return statut.complet ;
  }else if (1<=places && places<=3){return statut.presqueComplet ;
  }else{return statut.ouvert ;
  }
}

const nombreTotale =evenements.length;
const nombreComplets= evenements.filter(
  (e) => statuEvenement(e)==statut.complet).length;

const nombreAvecPlaces =evenements.filter(
  (e) => placesRestantes (e) >0 ).length;

const sommePlacesRestantes= evenements.reduce(
  (total, e) =>total+ placesRestantes(e),0);

const ateliersDisponibles= evenements.filter(
  (e)=> e.Categorie=="Atelier"&& placesRestantes(e)>0 );

function BadgeEtat({etat}:{etat:string}) {
  let couleur;
  if (etat== statut.complet){
    couleur= styles.badgeComplet;
  }else if (etat==statut.presqueComplet){
    couleur= styles.badgePresqueComplet;
  }else if (etat ==statut.ouvert){
    couleur= styles.badgeOuvert;
  }
  return(
    <View style={[styles.badgeEtat, couleur]}>
      <Text style={styles.texteBadge}>
        {etat}
      </Text>
    </View>
  );
}

function CarteEvenement({e}:{e:Evenement}){
  return(
    <View style={styles.carteEvenement}>
      <View style={styles.enteteCarte}>
        <Text style={styles.titreCarte}>{e.Titre}</Text>
        <BadgeEtat etat={statuEvenement(e)}/>
      </View>
      <Text style={styles.informationCarte}>{e.Categorie}</Text>
      <Text style={styles.informationCarte}>Places restantes:{placesRestantes(e)}</Text>
    </View>
  );
}

function BlocStatistique({libelle, nombre}:{
  libelle:string;
  nombre:number;
}){
  return(
    <View style={styles.statistique}>
      <Text style={styles.labelStatistique}>{libelle}</Text>
      <Text style={styles.valeurStatistique}>{nombre}</Text>
    </View>
  );
}


const mode ="tous";
const evenementsAffiches=mode=="tous"
  ? evenements:evenements.filter((e)=> e.Categorie=="Atelier" && placesRestantes(e)>0);


  export default function App(){
  return(
   <View style={styles.page}> 
      <View style={styles.header}>
        <Text style={styles.titre}> CampusAgenda</Text>
        <Text style={styles.sousTitre}>Evenements du campus</Text>
      </View>
 
      <View style={styles.statistiquesContainer}>
        <BlocStatistique libelle="nombre total" nombre={nombreTotale}/>
        <BlocStatistique libelle="evenemts complets" nombre={nombreComplets}/>
        <BlocStatistique libelle="evenements avec places" nombre={nombreAvecPlaces}/>
        <BlocStatistique libelle="places restantes" nombre={sommePlacesRestantes}/>
      </View>

      <Text style={styles.titreSection}>
        Mode actuellement affiché:tous les evenements
      </Text>

      <FlatList
        data ={evenementsAffiches}
        keyExtractor={(item)=> item.Id}
        renderItem={({item})=>( <CarteEvenement e={item}/>)}
        
        ListEmptyComponent={
          <View style={styles.vide}>
            <Text style={styles.texteVide}>
              Aucun evenement disponible
            </Text>
          </View>
        }
        
      />

    </View> 
 );
} 
    
const styles =StyleSheet.create({
  page:{flex: 1,backgroundColor: "#F2F6FC", padding: 16,},
  header:{backgroundColor: "#1E40AF", padding: 20,borderRadius: 15,marginBottom: 20,},
  titre:{fontSize: 27, fontWeight: "bold", color: "#FFFFFF",},
  sousTitre:{fontSize: 14,color: "#DBEAFE",marginTop: 5,},
  statistiquesContainer:{flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between",marginBottom: 15},
  statistique:{width: "48%", backgroundColor: "#FFFFFF",padding: 15,borderRadius: 12,marginBottom: 12,borderWidth: 1,borderColor: "#DBEAFE" },
  valeurStatistique:{fontSize: 25,fontWeight: "bold",color: "#2563EB"},
  labelStatistique:{fontSize: 12,color: "#64748B",marginTop: 5},
  titreSection:{fontSize: 20,fontWeight: "bold",color: "#1E3A8A",marginBottom: 12},
  carteEvenement:{backgroundColor: "#FFFFFF",padding: 16,borderRadius: 12,marginBottom: 12,borderWidth: 1,borderColor: "#DBEAFE"},
  enteteCarte:{flexDirection: "row",justifyContent: "space-between",alignItems: "center"},
  titreCarte:{fontSize: 18,fontWeight: "bold",color: "#1E3A8A",flex: 1, flexShrink: 1,},
  informationCarte:{fontSize: 14,color: "#475569",marginTop: 7},
  badgeEtat:{paddingVertical: 6,paddingHorizontal: 10,borderRadius: 8},
  badgeComplet:{backgroundColor: "#FEE2E2"},
  badgePresqueComplet:{backgroundColor: "#FFEDD5"},
  badgeOuvert:{backgroundColor: "#DCFCE7"},
  texteBadge:{fontSize: 11,fontWeight: "bold",color: "#1E293B"},
  texteVide:{fontSize: 16,color: "#64748B",textAlign: "center",marginTop: 20},
  vide:{padding:25, alignItems:"center",backgroundColor:"#FFFFFF", borderRadius:12, },

})