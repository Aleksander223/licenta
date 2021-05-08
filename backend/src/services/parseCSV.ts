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
    Cursuri: 'courses'
};

function transformStringToBoolean(str: string) {
    if (str == '1') {
        return true;
    } else {
        return false;
    }
}

function transformStringToArray(str: string) {
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
    csv = csv.replace(/\b(?:An|an|numarStudenti|NumarStudenti|seria|Seria|cursuri|Cursuri|nume|Nume)/gi, x => dictionary[x]);

    const result = await csvParser({
        colParser: {
            year: 'number',
            series: 'number',
            numberOfStudents: 'number',
            courses: transformStringToArray
        }
    }).fromString(csv);

    return result;
}