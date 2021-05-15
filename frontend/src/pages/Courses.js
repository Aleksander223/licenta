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
    {
        name: "Specializare",
        selector: "specialization",
        sortable: true
    },
    {
        name: "An",
        selector: "year",
        sortable: true
    },
    {
        name: "Semestru",
        selector: "semester",
        sortable: true
    },
    {
        name: "Are Curs",
        selector: "course",
        sortable: true,
        format: (row, index) => {
            return row.course ? "Da" : "Nu";
        }
    },
    {
        name: "Are Seminar",
        selector: "seminar",
        sortable: true,
        format: (row, index) => {
            return row.seminar ? "Da" : "Nu";
        }
    },
    {
        name: "Are Laborator",
        selector: "laboratory",
        sortable: true,
        format: (row, index) => {
            return row.laboratory ? "Da" : "Nu";
        }
    },
    {
        name: "Are Practica",
        selector: "practice",
        sortable: true,
        format: (row, index) => {
            return row.practice ? "Da" : "Nu";
        }
    },
];

export default function Professors() {
    return <Datatable url={"http://127.0.0.1:5000/courses/"} columns={columns} selector="courses" name="Courses" />
}