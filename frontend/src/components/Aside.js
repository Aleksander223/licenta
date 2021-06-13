import React, {useState, useEffect, useContext} from "react";

import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

import { useHistory } from "react-router-dom";

import { FaHome, FaDatabase, FaKey, FaBars, FaUpload, FaCalendarCheck } from "react-icons/fa";
import { Container, Col, Row, Card, Button, Collapse  } from "react-bootstrap";

import { useWindowDimensions, typeOfUser } from "../services/util";
import { AppContext } from "../services/context";
 
export default function Aside(props) {
    let history = useHistory();

    const {height, width} = useWindowDimensions();

    const context = useContext(AppContext);

    let asideOpen = null;

    if (width > 576) {
        asideOpen = true;
    } else if (width < 576) {
        asideOpen = context.aside;
    }

    const items = typeOfUser() == 0 ? [
        {
            title: "Acasă",
            itemId: "/admin",
            elemBefore: () => <FaHome />,
        },
        {
            title: "Sesiune",
            itemId: "1",
            elemBefore: () => <FaCalendarCheck />,
            subNav: [
                {
                    title: "Creează",
                    itemId: "/session",
                },
                {
                    title: "Sesiune normală",
                    itemId: "/session/view",
                },
                {
                    title: "Sesiune ani finali",
                    itemId: "/session/view/final",
                },
                {
                    title: "Listă",
                    itemId: "/sessions"
                }
            ]
        },
        {
            title: "Date",
            itemId: "2",
            elemBefore: () => <FaDatabase />,
            subNav: [
                {
                    title: "Cursuri",
                    itemId: "/courses",
                },
                {
                    title: "Profesori",
                    itemId: "/professors",
                },
                {
                    title: "Grupe",
                    itemId: "/groups",
                },
                {
                    title: "Orar",
                    itemId: "/timetable",
                },
            ],
        },
        {
            title: "Tokeni",
            itemId: "/tokens",
            elemBefore: () => <FaKey />,
        },
    ] : [
        {
            title: "Acasă",
            itemId: "/report",
            elemBefore: () => <FaHome />,
        }
    ];

    return (
        <>
            {
               asideOpen && 
            <Col className="col-xs-1 col-sm-1 col-md-3 col-sm-4 col-lg-2">
            <div
                style={{
                    height: "94vh",
                    backgroundColor: "#fcfcfc",
                    marginTop: "-50px",
                    marginLeft: "-12px",
                }}
            >
                <Navigation
                    onSelect={({ itemId }) => {
                        if (itemId[0] == "/") {
                            history.push(itemId);
                        }
                    }}
                    items={items}
                />
            </div>
            </Col>
}
        </>
    );
}
