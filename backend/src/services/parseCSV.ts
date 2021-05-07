import csvParser from "csvtojson";

function transformStringToBoolean(str: string) {
    if (str == '1') {
        return true;
    } else {
        return false;
    }
}

export async function parseCourseCSV(csv: string) {
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
        specializare: 'specialization'
    };

    csv = csv.replace(/\b(?:An|an|Semestru|semestru|AreCurs|areCurs|AreSeminar|areSeminar|AreLaborator|areLaborator|ArePractica|arePractica|Nume|nume|Specializare|specializare)\b/gi, x => dictionary[x]);

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