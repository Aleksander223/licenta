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