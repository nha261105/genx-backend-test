import express, { Request, Response} from 'express'

export const app = express()

app.use(express.json())

app.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({message: 'Server is running!'})
});
