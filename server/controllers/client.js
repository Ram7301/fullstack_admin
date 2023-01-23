import Product from "../modles/Product.js";
import ProductStat from "../modles/ProductStat.js";
import User from "../modles/User.js";
import Transaction from "../modles/Transaction.js"


export const getProducts = async (req, res) => {
    try{
      const products = await Product.find();
      
      

      const productsWithStats = await Promise.all(
        products.map( async (product) => {
          const stat =await ProductStat.find({
            productId: Product._id
          });
          return {
            ...product._doc,
            stat
          };
        })
      );
      res.status(200).json(productsWithStats)
    }catch (error){
         
     res.status(404).json({message: error.message})
    }
}

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// export const getDetail = async (req, res) => {
//   try{
//     const { UserId } = req.params;
//     const detail = await User.findById(UserId);
//     res.status(200).json(detail);
//   }catch (error){
       
//    res.status(404).json({message: error.message})
//   }
// }

export const getdata = async(req,res)=>{
  try {
      
      const {UserId} = req.params;

      const userindividual = await User.findById({_id:UserId}).select("-password");;
      // console.log(userindividual);
      res.status(200).json(userindividual)

  } catch (error) {
      res.status(404).json(error);
  }
};

// update user data

export const postData = async(req,res)=>{
  try {
      const {UserId} = req.params;

      const updateduser = await User.findByIdAndUpdate(UserId,req.body,{
          new:true
      });

      console.log(updateduser);
      res.status(200).json(updateduser);

  } catch (error) {
      res.status(404).json(error);
  }
}


// get Transaction


export const getTransactions = async (req, res) => {
  try {
    // sort should look like this: { "field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    

    const total = await Transaction.estimatedDocumentCount({
      name: { $regex: search, $options: "i" },
    })
    // console.log("🚀 ~ file: client.js:117 ~ getTransactions ~ total", total)

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};