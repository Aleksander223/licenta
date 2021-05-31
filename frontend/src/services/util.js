import jwt from "jsonwebtoken";
import { useState, useEffect } from "react";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}

export function transformTypeToName(type) {
    switch (type) {
        case 0:
            return "Curs";
        case 1:
            return "Seminar";
        case 2:
            return "Laborator";
        case 3:
            return "Practica";
        default:
            return "Undefined";
    }
}

export function transformTypeToQuizName(type) {
    switch (type) {
        case 0:
            return "courseQuiz";
        case 1:
            return "seminarQuiz";
        case 2:
            return "laboratoryQuiz";
        case 3:
            return "practiceQuiz";
        default:
            return "Undefined";
    }
}

export function transformQuizNameToType(quiz) {
    switch (quiz) {
        case "courseQuiz":
            return 0;
        case "seminarQuiz":
            return 1;
        case "laboratoryQuiz":
            return 2;
        case "practiceQuiz":
            return 3;
        default:
            return -1;
    }
}

export function isLoggedIn() {
    const token = window.sessionStorage.getItem("auth");

    const tok = jwt.decode(token);

    if (!tok) {
        return 0;
    }

    if (tok.hasOwnProperty("token")) {
        return 1;
    }

    if (tok.hasOwnProperty("role")) {
        return 2;
    }
}

export function typeOfUser() {
    const token = window.sessionStorage.getItem("auth");

    const tok = jwt.decode(token);

    if (tok.hasOwnProperty("role")) {
        return tok.role;
    }
}
