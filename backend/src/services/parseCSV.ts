import csvParser from "csvtojson";

const dictionary = {
    An: 'year',
    an: 'year',
    Semestru: 'semester',
    semestru: 'semester',
    AreCurs: 'course',
    areCurs: 'course',
    AreSeminar: 'seminar',
    areSeminar: 'seminar',
    AreLaborator: 'laboratory',
    areLaborator: 'laboratory',
    ArePractica: 'practice',
    arePractica: 'practice',
    Nume: 'name',
    nume: 'name',
    Specializare: 'specialization',
    specializare: 'specialization',
    Cod: 'code',
    cod: 'code',
    numarStudenti: 'numberOfStudents',
    NumarStudenti: 'numberOfStudents',
    seria: 'series',
    Seria: 'series',
    cursuri: 'courses',
    Cursuri: 'courses',
    codProfesor: 'professor',
    CodProfesor: 'professor',
    codCurs: 'course',
    CodCurs: 'course',
    curs: 'courses',
    Curs: 'courses',
    seminar: 'seminars',
    Seminar: 'seminars',
    laborator: 'laboratories',
    Laborator: 'laboratories',
    practica: 'practices',
    Practica: 'practices',
    anFinal: 'finalYear',
    AnFinal: 'finalYear'
};

function transformStringToBoolean(str: string) {
    if (str == '1') {
        return true;
    } else {
        return false;
    }
}

function transformStringToArray(str: string) {
    if (str === "") {
        return [];
    }
    else if (str.split(";").length == 0) {
        return [str];
    }
    return str.split(";").map(x => x.trim());
}

export async function parseCourseCSV(csv: string) {
    csv = csv.replace(/\b(?:An|an|Semestru|semestru|AreCurs|areCurs|AreSeminar|areSeminar|AreLaborator|areLaborator|ArePractica|arePractica|Nume|nume|Specializare|specializare|Cod|cod)\b/gi, x => dictionary[x]);

    const result = await csvParser({
        colParser: {
            year: 'number',
            semester: 'number',
            course: transformStringToBoolean,
            seminar: transformStringToBoolean,
            laboratory: transformStringToBoolean,
            practice: transformStringToBoolean
        }
    }).fromString(csv);

    return result;
}

export async function parseGroupCSV(csv: string) {
    csv = csv.replace(/\b(?:anFinal|AnFinal|An|an|numarStudenti|NumarStudenti|seria|Seria|cursuri|Cursuri|nume|Nume)/gi, x => dictionary[x]);

    const result = await csvParser({
        colParser: {
            year: 'number',
            series: 'number',
            numberOfStudents: 'number',
            finalYear: transformStringToBoolean
        }
    }).fromString(csv);

    return result;
}

export async function parseProfessorCSV(csv: string) {
    csv = csv.replace(/\b(?:Nume|nume|Cod|cod)/gi, x => dictionary[x]);

    const result = await csvParser().fromString(csv);

    return result;
}

export async function parseProfessorGroupCSV(csv: string) {
    csv = csv.replace(/\b(?:codProfesor|CodProfesor|codCurs|CodCurs|curs|Curs|seminar|Seminar|laborator|Laborator|practica|Practica)/gi, x => dictionary[x]);

    const result = await csvParser({
        colParser: {
            courses: transformStringToArray,
            seminars: transformStringToArray,
            laboratories: transformStringToArray,
            practices: transformStringToArray
        }
    }).fromString(csv);

    return result;
}