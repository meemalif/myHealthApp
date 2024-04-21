import React, { useEffect, useState } from "react";
import { DataTable, Card, Button } from "react-native-paper";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import { auth, firestore } from "../../firebase";

const TestRecordsCard = () => {
  const [initialEntries, setInitialEntries] = useState(5);
  const [bpData, setBpData] = useState([]);
  const [bsData, setBsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data here
      const uid = auth.currentUser.uid;
      const userQuery = query(
        collection(firestore, "users"),
        where("userID", "==", uid)
      );
      const userSnapshot = await getDocs(userQuery);
      const userDoc = userSnapshot.docs[0];
      const userID = userDoc.id;
      console.log(userID);
      const bloodPressureRef = collection(
        firestore,
        "users",
        userDoc.id,
        "bloodPressure"
      );
      const bloodSugarRef = collection(
        firestore,
        "users",
        userDoc.id,
        "bloodSugar"
      );
      const bpQuery = query(bloodPressureRef, orderBy("createdAt", "desc"));
      const bsQuery = query(bloodSugarRef, orderBy("createdAt", "desc"));

      const bpSnapshot = await getDocs(bpQuery);
      const bsSnapshot = await getDocs(bsQuery);

      const bpData = bpSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBpData(bpData);

      const bsData = bsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBsData(bsData);
    };
    fetchData();
  }, []);

  return (
    <Card>
      <Card.Title title="Test Records" />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title numeric>Blood Pressure-mmHg</DataTable.Title>
          <DataTable.Title numeric>Blood Sugar-mg/dL</DataTable.Title>
        </DataTable.Header>

        {bpData.slice(0, initialEntries).map((bpRow, index) => {
          // Find the corresponding blood sugar entry by comparing the dates
          const bsEntry = bsData.find((bsRow) => {
            const bpDate = bpRow.createdAt.toDate().setHours(0, 0, 0, 0);
            const bsDate = bsRow.createdAt.toDate().setHours(0, 0, 0, 0);
            return bpDate === bsDate;
          });

          // Format the blood sugar value or provide a default if not found
          const bloodSugarValue = bsEntry ? bsEntry?.bloodSugar : "N/A";

          return (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                {bpRow.createdAt.toDate().toLocaleDateString()}
              </DataTable.Cell>
              <DataTable.Cell
                numeric
              >{`${bpRow.systolic}/${bpRow.diastolic}`}</DataTable.Cell>
              <DataTable.Cell numeric>{bloodSugarValue}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
      <Card.Actions style={{ alignSelf: "center" }}>
        <Button onPress={() => setInitialEntries(initialEntries + 5)}>
          Load More
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default TestRecordsCard;
