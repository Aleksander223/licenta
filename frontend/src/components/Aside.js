import React, {useState, useEffect, useContext} from "react";

import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

import { useHistory } from "react-router-dom";

import { FaHome, FaDatabase, FaKey, FaBars } from "react-icons/fa";
import { Container, Col, Row, Card, Button, Collapse  } from "react-bootstrap";

import { useWindowDimensions } from "../services/util";
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
                        if (itemId != "") {
                            history.push(itemId);
                        }
                    }}
                    items={[
                        {
                            title: "Home",
                            itemId: "/admin",
                            elemBefore: () => <FaHome />,
                        },
                        {
                            title: "Data",
                            itemId: "",
                            elemBefore: () => <FaDatabase />,
                            subNav: [
                                {
                                    title: "Courses",
                                    itemId: "/admin/data/add",
                                },
                                {
                                    title: "Professors",
                                    itemId: "/admin/data/edit",
                                },
                                {
                                    title: "Groups",
                                    itemId: "/admin/data/edit",
                                },
                                {
                                    title: "Timetable",
                                    itemId: "/admin/data/edit",
                                },
                            ],
                        },
                        {
                            title: "Tokens",
                            itemId: "/admin/tokens",
                            elemBefore: () => <FaKey />,
                        },
                    ]}
                />
            </div>
            </Col>
}
        </>
    );
}
