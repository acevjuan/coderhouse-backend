import { Router } from "express";

const router = Router();

router.get('/', (request, response) => {
  response.render('realTimeProducts');
});

export default router;