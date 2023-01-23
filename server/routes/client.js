import express from 'express';
import { getProducts,getCustomers,getdata,postData, getTransactions} from "../controllers/client.js"

const router = express.Router();
router.get("/products",getProducts)
router.get("/customers", getCustomers);
router.get("/customers/:UserId", getdata);
router.patch("/Updateuser/:UserId",postData)
router.get("/transactions",getTransactions)
export default router;