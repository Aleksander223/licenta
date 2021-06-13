import React from "react";
import Datatable from "../components/Datatable";
import dateFormat from "dateformat"; 

import {Button} from "react-bootstrap";



export default function Sessions(props) {

    const columns = [
        {
            name: "Nume",
            selector: "name",
            sortable: true,
        },
        {
            name: "Start",
            selector: "startDate",
            sortable: true,
            format: (row, index) => {
                return dateFormat(row.startDate, "dd/mm/yyyy")
            }
        },
        {
            name: "Sfarsit",
            selector: "endDate",
            sortable: true,
            format: (row, index) => {
                return dateFormat(row.endDate, "dd/mm/yyyy")
            }
        },
        {
            name: "Semestru",
            selector: "semester",
            sortable: true
        },
        {
            name: "Activa",
            selector: "active",
            sortable: true,
            format: (row, index) => {
                return row.active ? "Da" : "Nu";
            }
        },
        {
            name: 'An final',
            selector: "finalYear",
            sortable: true,
            format: (row, index) => {
                return row.finalYear ? "Da" : "Nu";
            }
        }
    ];

    if (props.generateReports) {
        columns.push({
            name: "Raport",
            cell: (row) => {
                return <Button className="btn-sm">Generează</Button>
            }
        });
    }

    return <Datatable url={"http://127.0.0.1:5000/sessions/"} columns={columns} selector="sessions" name="Sessions" disableButtons={true} />
}