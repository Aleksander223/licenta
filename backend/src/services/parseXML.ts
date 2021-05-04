import { parseStringPromise } from "xml2js";
import util from "util";

export async function parseXML(xml: string) {
    const result =  await parseStringPromise(xml);

    console.log(util.inspect(result, false, null, true));

    return result;
}