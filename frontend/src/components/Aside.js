import React, {useState, useEffect} from "react";

import { Navigation } from "react-minimal-side-navigation";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";

import { useHistory } from "react-router-dom";

import { FaHome, FaDatabase, FaKey, FaBars } from "react-icons/fa";
import { Container, Col, Row, Card, Button, Collapse  } from "react-bootstrap";

import { useWindowDimensions } from "../services/util";
 
export default function Aside(props) {
    let history = useHistory();

    const {height, width} = useWindowDimensions();
    const [open, setOpen] = useState(false);

    return (
        <>
            {
              width > 576 && 
            <Col className="col-md-3 col-sm-4 col-lg-2">
            <div
                style={{
                    height: "94vh",
                    backgroundColor: "#fcfcfc",
                    marginTop: "-50px",
                    marginLeft: "-12px",
                }}
            >
                <Navigation
                    activeItemId="/admin"
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
