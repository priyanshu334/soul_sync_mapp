import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Svg, { Line } from "react-native-svg";

export function KundliDetails() {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <View style={styles.outerContainer}>
      <View style={styles.card}>
        <Text style={styles.headerTitle}>Kundli Details</Text>

        {/* Custom Tabs List */}
        <View style={styles.tabsList}>
          <TouchableOpacity
            onPress={() => setActiveTab("basic")}
            style={[styles.tabTrigger, activeTab === "basic" && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === "basic" && styles.activeTabText]}>
              Basic
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("chart")}
            style={[styles.tabTrigger, activeTab === "chart" && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === "chart" && styles.activeTabText]}>
              Birth Chart
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tabs Content */}
        {activeTab === "basic" ? (
          <View style={styles.contentContainer}>
            <View style={styles.grid}>
              <DetailItem label="Birth Date" value="March 15, 1999" />
              <DetailItem label="Birth Time" value="05:30 AM" />
              <DetailItem label="Birth Place" value="Mumbai, Maharashtra" />
              <DetailItem label="Rashi (Moon Sign)" value="Meen (Pisces)" />
              <DetailItem label="Nakshatra" value="Revati" />
              <DetailItem label="Gotra" value="Kashyap" />
              <DetailItem label="Manglik" value="No" />
              <DetailItem label="Charan" value="4" />
            </View>

            <View style={styles.divider} />
            <Text style={styles.sectionLabel}>Planetary Positions</Text>
            
            <View style={styles.planetList}>
              <PlanetRow planet="Sun (Surya)" sign="Pisces" />
              <PlanetRow planet="Moon (Chandra)" sign="Pisces" />
              <PlanetRow planet="Mars (Mangal)" sign="Taurus" />
              <PlanetRow planet="Mercury (Budh)" sign="Aquarius" />
              <PlanetRow planet="Jupiter (Guru)" sign="Aries" />
              <PlanetRow planet="Venus (Shukra)" sign="Pisces" />
            </View>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.chartContainer}>
              <View style={styles.kundliBox}>
                <Svg height="100%" width="100%" viewBox="0 0 100 100">
                  <Line x1="0" y1="0" x2="100" y2="100" stroke="#444" strokeWidth="0.5" />
                  <Line x1="100" y1="0" x2="0" y2="100" stroke="#444" strokeWidth="0.5" />
                  <Line x1="50" y1="0" x2="0" y2="50" stroke="#444" strokeWidth="0.5" />
                  <Line x1="50" y1="0" x2="100" y2="50" stroke="#444" strokeWidth="0.5" />
                  <Line x1="0" y1="50" x2="50" y2="100" stroke="#444" strokeWidth="0.5" />
                  <Line x1="100" y1="50" x2="50" y2="100" stroke="#444" strokeWidth="0.5" />
                </Svg>
                
                {/* House Labels (Absolute Positioned) */}
                <HouseLabel top="20%" left="45%" title="1st" sub="Asc" />
                <HouseLabel top="5%" right="15%" title="2nd" />
                <HouseLabel top="20%" right="5%" title="3rd" />
                <HouseLabel top="45%" right="10%" title="4th" sub="Mo" />
                <HouseLabel bottom="20%" right="5%" title="5th" />
                <HouseLabel bottom="5%" right="15%" title="6th" />
                <HouseLabel bottom="20%" left="45%" title="7th" />
                <HouseLabel bottom="5%" left="15%" title="8th" />
                <HouseLabel bottom="45%" left="10%" title="9th" sub="Ju" />
                <HouseLabel top="20%" left="5%" title="11th" />
                <HouseLabel top="5%" left="15%" title="12th" sub="Ve Su" />
              </View>
            </View>
            <Text style={styles.chartFooter}>North Indian Style Kundli Chart</Text>
          </View>
        )}
      </View>
    </View>
  );
}

// Helper Components
const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.gridItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const PlanetRow = ({ planet, sign }: { planet: string; sign: string }) => (
  <View style={styles.planetRow}>
    <Text style={styles.planetName}>{planet}</Text>
    <Text style={styles.planetSign}>{sign}</Text>
  </View>
);

const HouseLabel = ({ top, bottom, left, right, title, sub }: any) => (
  <View style={[styles.houseLabelContainer, { top, bottom, left, right }]}>
    <Text style={styles.houseTitle}>{title}</Text>
    {sub && <Text style={styles.houseSub}>{sub}</Text>}
  </View>
);

const styles = StyleSheet.create({
  outerContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#1a1a1a', // Dark theme matching your app
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  headerTitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 16,
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tabTrigger: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#333',
  },
  tabText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
  contentContainer: {
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 11,
    color: '#777',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    color: '#eee',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 12,
  },
  sectionLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  planetList: {
    gap: 8,
  },
  planetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  planetName: {
    fontSize: 12,
    color: '#ccc',
  },
  planetSign: {
    fontSize: 12,
    color: '#888',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  kundliBox: {
    width: 280,
    height: 280,
    borderWidth: 1,
    borderColor: '#444',
    position: 'relative',
  },
  houseLabelContainer: {
    position: 'absolute',
    alignItems: 'center',
    minWidth: 40,
  },
  houseTitle: {
    fontSize: 10,
    color: '#fff',
  },
  houseSub: {
    fontSize: 9,
    color: '#777',
  },
  chartFooter: {
    textAlign: 'center',
    fontSize: 11,
    color: '#666',
    marginTop: 12,
  },
});