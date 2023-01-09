import {putFiles,getFiles} from "estuary-js";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fs from "fs";


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const dir = `./public/uploads/${req.body.id}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            cb(null, dir);
        },
      filename: (req, file, cb) => cb(null, file.originalname),
    }),
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
        id: string;
        key: string;
    };
}

apiRoute.post((req: MulterRequest, res) => {
    let dir = `${process.cwd()}/public/uploads/${req.body.id}`;
    let api_key = req.body.key;
    putFiles(dir,req.body.id,api_key).then((response) => {
        
        //delete the folder req.body.id
        fs.rmSync(dir, {
            recursive: true,
            force: true,
        });
        
        res.status(200).json(response);
    }
    ).catch((error) => {
        fs.rmSync(dir, {
            recursive: true,
            force: true,
        });
        res.status(500).json(error);
    }
    );
});

apiRoute.get((req, res) => {
    let api_key = req.body.key;
    getFiles(req.body.id, api_key).then((response) => {
        res.status(200).json(response);
    }
    ).catch((error) => {
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