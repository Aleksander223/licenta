import { parseString, parseStringPromise } from "xml2js";

export async function parseXML(xml: string) {
    const result =  await parseStringPromise(xml);

    return result;
}