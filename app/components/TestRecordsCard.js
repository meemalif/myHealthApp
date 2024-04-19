import React from "react";
import { DataTable, Card, Button } from "react-native-paper";

const TestRecordsCard = () => {
  const data = [
    { date: "25 Nov", bloodPressure: "122/77", bloodSugar: "200" },
    { date: "26 Nov", bloodPressure: "188/90", bloodSugar: "204" },
    // ... add all other data rows here
  ];

  return (
    <Card>
      <Card.Title title="Test Records" />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title numeric>Blood Pressure-mmHg</DataTable.Title>
          <DataTable.Title numeric>Blood Sugar-mg/dL</DataTable.Title>
        </DataTable.Header>

        {data.map((row, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>{row.date}</DataTable.Cell>
            <DataTable.Cell numeric>{row.bloodPressure}</DataTable.Cell>
            <DataTable.Cell numeric>{row.bloodSugar}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
      <Card.Actions>
        <Button onPress={() => console.log("Load More")}>Load More</Button>
      </Card.Actions>
    </Card>
  );
};

export default TestRecordsCard;
