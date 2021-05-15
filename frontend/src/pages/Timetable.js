import React from "react";
import Datatable from "../components/Datatable";
 
const columns = [
    {
        name: "Profesor",
        selector: "professor.name",
        sortable: true,
    },
    {
        name: "Curs",
        selector: "course.name",
        sortable: true,
    },
    {
        name: "Grupa",
        selector: "group.name",
        sortable: true
    },
    {
        name: "Tip",
        selector: "type",
        sortable: true,
        format: (row, index) => {
            switch (row.type) {
                case 0:
                    return "Curs"
                case 1:
                    return "Seminar"
                case 2:
                    return "Laborator"
                case 3:
                    return "Practica"
                default:
                    return ""
            }
        }
    }
];

export default function Timetable() {
    return <Datatable url={"http://127.0.0.1:5000/timetable/"} columns={columns} selector="timetable" name="Timetable" />
}