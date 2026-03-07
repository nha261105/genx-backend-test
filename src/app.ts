import express, { Request, Response} from 'express'

import scheduleRouter from "./routes/ScheduleRoutes.js"
export const app = express()

app.use(express.json())

app.use("/schedule", scheduleRouter);

app.get('/ping', (res: Response) => {
    res.status(200).json({message: 'Server is running!'})
});
