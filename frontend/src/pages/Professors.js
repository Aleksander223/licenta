import React from "react";
import Datatable from "../components/Datatable";
 
const columns = [
    {
        name: "Cod",
        selector: "code",
        sortable: true,
    },
    {
        name: "Nume",
        selector: "name",
        sortable: true,
    },
];

export default function Professors() {
    return <Datatable url={"http://127.0.0.1:5000/professors/"} columns={columns} selector="professors" name="Professors" />
}