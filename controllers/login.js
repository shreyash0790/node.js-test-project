const Oders = require('../models/login');

 
exports.getOder=async (req, res, next) => {
    try {
    const allOders = await Oders.findAll();
    res.status(200).json({Oders: allOders});
        

      } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    
}


exports.addOder=async (req, res, next) => {
    try {
        const Amount= req.body.Amount;
        const Description= req.body.Description;
        const Category= req.body.Category;
        const newOder=await Oders.create({
        Amount: Amount,
        Description:Description,
        Category:Category,
       })
       res.status(201).json({ Oder: newOder });
       
       
      } catch (err) {
        console.error('Error adding Oder:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
exports.deleteOder=async (req, res, next) => {
  try {
    const userId = req.params.id;
    const oder = await Oders.findOne({where:{id:userId}});
      await oder.destroy()
      res.status(200).json({ deleteOder: oder });

    } catch (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  
}
exports.editOder= async (req, res, next) => {
  try {
    const userId = req.params.userId; 
    const updatedAmount = req.body.Amount;
    const updatedDescription = req.body.Description;
    const updatedCategory = req.body.Category;

  
    const oder = await Oders.findByPk(userId);

    if (!oder) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    // Update the expense fields
    oder.Amount = updatedAmount;
   oder.Description = updatedDescription;
    oder.Category = updatedCategory;

    // Save the updated expense to the database
    await oder.save();

    const updatedUser = {
      id: userId,
      Amount: updatedAmount,
      Description: updatedDescription,
      Category: updatedCategory
    };
    res.status(200).json({ updatedUser });

  } catch (err) {
    console.error('Error updating expense:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
