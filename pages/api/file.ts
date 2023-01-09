import {putFile} from 'estuary-js/dist/EstuaryClient'
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fs, { readFileSync } from "fs";



const upload = multer({
    
});
  
const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.array('files'));

// @ts-ignore
interface MulterRequest extends Request {
    files: any;
    body: {
        key: string;
    };
}

apiRoute.post((req: MulterRequest, res) => {
    let fileObject = {
        buffer: req.files[0].buffer,
        name: req.files[0].originalname,
        size: req.files[0].size,
    }
    let api_key = req.body.key;
    putFile(fileObject, api_key).then((response) => {
        res.status(200).json(response);
    }
    ).catch((error) => {
        console.log(error)
        res.status(500).json(error);
    }
    );
});






export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};