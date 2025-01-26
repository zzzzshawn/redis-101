import express from 'express';
import routes from './routes/routes';

const app = express();
app.use(express.json());

app.use('/api/v1', routes)

app.listen(8080, ()=> {
    console.log('8080 running nigga')
})