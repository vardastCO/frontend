import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'data');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/geolocations.json', 'utf8');
    //Return the content of the data file in json format
    res.status(200).json(fileContents);
}
