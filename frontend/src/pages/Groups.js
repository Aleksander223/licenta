import React from "react";
import Datatable from "../components/Datatable";
 
const columns = [
    {
        name: "Grupa",
        selector: "name",
        sortable: true,
    },
    {
        name: "Seria",
        selector: "series",
        sortable: true,
    },
    {
        name: "Anul",
        selector: "year",
        sortable: true
    },
    {
        name: "Numar studenti",
        selector: "numberOfStudents",
        sortable: true,
    }
];

export default function Groups() {
    return <Datatable url={"http://127.0.0.1:5000/groups/"} columns={columns} selector="groups" name="Groups" />
}